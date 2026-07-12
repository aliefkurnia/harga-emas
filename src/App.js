import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LinkIcon from "@mui/icons-material/Link";
import "./App.css";
import PriceCard from "./pricecard";
import KursCard from "./KursCard";
import AntamTable from "./AntamTable";
import GradientCircularProgress from "./GradientCircularProgress";
import PurchasePopup from "./PurchasePopup";

function App({ mode, toggleColorMode }) {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [currency, setCurrency] = React.useState("USD");
  const [grams, setGrams] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState(null);
  const [formError, setFormError] = React.useState("");

  const fetchData = React.useCallback(() => {
    fetch("https://update-emas.vercel.app")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setError(null);
      })
      .catch((err) => setError(err));
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCalculate = () => {
    if (!grams || isNaN(grams) || grams <= 0) {
      setFormError("Masukkan jumlah gram yang valid");
      return;
    }
    if (!data) return;

    let pricePerGram;
    if (currency === "USD") {
      pricePerGram = parseFloat(data.usd.gr.replace(/\./g, "").replace(",", "."));
    } else {
      pricePerGram = parseFloat(data.idr.gr.replace(/\./g, "").replace(",", "."));
    }

    setTotalPrice(pricePerGram * parseFloat(grams));
    setFormError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCalculate();
  };

  const formatResult = (value) => {
    if (currency === "USD") {
      return `$ ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `Rp ${value.toLocaleString("id-ID", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="App" data-theme={mode}>
      <header className="App-header">
        <div className="header-brand">
          <div className="gold-icon">
            <span>Au</span>
          </div>
          <h1>Gold Price</h1>
        </div>
        <button className="theme-toggle" onClick={toggleColorMode} aria-label="Toggle theme">
          {mode === "dark" ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
        </button>
      </header>

      <main className="App-content">
        {error && (
          <div className="error-message">
            Gagal mengambil data: {error.message}
          </div>
        )}

        {data ? (
          <>
            <div className="info-bar">
              <div className="info-details">
                <span className="info-item">
                  <AccessTimeIcon className="icon" sx={{ fontSize: 16 }} />
                  Update: {data.update_gold_price}
                </span>
                <span className="info-item">
                  <CurrencyExchangeIcon className="icon" sx={{ fontSize: 16 }} />
                  {data.update_kurs_bi}
                </span>
                <span className="info-item">
                  <LinkIcon className="icon" sx={{ fontSize: 16 }} />
                  <a href={data.source} target="_blank" rel="noopener noreferrer">
                    Sumber data
                  </a>
                </span>
              </div>
              <button className="refresh-btn" onClick={fetchData}>
                <RefreshIcon sx={{ fontSize: 16 }} />
                Refresh
              </button>
            </div>

            <section className="cards-section">
              <h2>Harga Emas Dunia</h2>
              <div className="card-container">
                <PriceCard
                  title="USD"
                  subtitle="US Dollar"
                  data={data.usd}
                  symbol="$"
                />
                <PriceCard
                  title="IDR"
                  subtitle="Rupiah"
                  data={data.idr}
                  symbol="Rp"
                />
                <KursCard data={data.kurs_bi} />
              </div>
            </section>

            {data.antam && Object.keys(data.antam).length > 0 && (
              <section className="cards-section">
                <h2>Harga Emas Antam (UBS)</h2>
                <AntamTable data={data.antam} />
              </section>
            )}

            <section className="calculator-section">
              <h2>Kalkulator Emas</h2>
              <div className="calculator-card">
                <div className="calc-form">
                  <div className="form-group">
                    <label>Mata Uang</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                      <option value="USD">USD - US Dollar</option>
                      <option value="IDR">IDR - Rupiah</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Berat (gram)</label>
                    <input
                      type="number"
                      value={grams}
                      onChange={(e) => {
                        if (e.target.value.length <= 20) setGrams(e.target.value);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Masukkan gram"
                    />
                    {formError && <p className="form-error">{formError}</p>}
                  </div>
                  <button className="calc-btn" onClick={handleCalculate}>
                    Hitung
                  </button>
                </div>
                {totalPrice !== null && (
                  <div className="calc-result">
                    <p className="result-label">
                      Total harga {grams} gram emas
                    </p>
                    <p className="result-value">{formatResult(totalPrice)}</p>
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          <div className="loading-container">
            <GradientCircularProgress />
            <p>Memuat harga emas...</p>
          </div>
        )}

        <PurchasePopup />
      </main>

      <footer className="App-footer">
        <p>&copy; 2024 Muchammad Alief Kurnia</p>
      </footer>
    </div>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("dark");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <App mode={mode} toggleColorMode={toggleColorMode} />
    </ThemeProvider>
  );
}
