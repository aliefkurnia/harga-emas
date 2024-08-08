import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./App.css";
import PriceCard from "./pricecard";
import dollar from "./images/dollar.png";
import rupiah from "./images/indonesian-rupiah.png";
import bi from "./images/BI.png";
import GradientCircularProgress from "./GradientCircularProgress"; // Import the GradientCircularProgress component

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [currency, setCurrency] = React.useState("USD");
  const [grams, setGrams] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState(null);
  const [formError, setFormError] = React.useState(""); // State for form errors

  const fetchData = () => {
    fetch("https://update-emas.vercel.app")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => setError(error));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleCalculate = () => {
    if (!grams || isNaN(grams) || grams <= 0) {
      setFormError("Please enter a valid number of grams");
      return;
    }

    if (!data) return; // Ensure data is loaded before proceeding

    let pricePerGram;
    if (currency === "USD") {
      pricePerGram = parseFloat(data.usd.gr.replace(",", ""));
    } else if (currency === "IDR") {
      pricePerGram = parseFloat(data.idr.gr.replace(".", "").replace(",", "."));
    }

    setTotalPrice(pricePerGram * grams);
    setFormError(""); // Clear any previous errors
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <header
        className="App-header"
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <h1>Gold Price Calculator</h1>
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </header>

      <main className="App-content">
        {error && <p className="error">Error fetching data: {error.message}</p>}
        {data ? (
          <>
            <section className="info">
              <p>Gold Price Updated: {data.update_gold_price}</p>
              <p>Kurs BI Updated: {data.update_kurs_bi}</p>
              <p>
                Source:{" "}
                <a href={data.source} target="_blank" rel="noopener noreferrer">
                  {data.source}
                </a>
              </p>
              <button
                className="refresh-button"
                onClick={handleRefresh}
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Refresh Data
              </button>
            </section>
            <section className="card-container">
              <PriceCard title="USD" data={data.usd} imageUrl={dollar} />
              <PriceCard title="IDR" data={data.idr} imageUrl={rupiah} />
              <PriceCard title="Kurs BI" data={data.kurs_bi} imageUrl={bi} />
            </section>
            <section className="calculator">
              <div
                className="calculator-container"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  boxShadow: theme.shadows[5],
                  borderRadius: "8px",
                  padding: "20px",
                }}
              >
                <article className="calculator-form">
                  <h2>Calculate Gold Price</h2>
                  <div className="form-group">
                    <label>
                      Currency:
                      <select
                        value={currency}
                        onChange={(e) => {
                          setCurrency(e.target.value);
                        }}
                        style={{
                          backgroundColor: theme.palette.background.default,
                          color: theme.palette.text.primary,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <option value="USD">USD</option>
                        <option value="IDR">IDR</option>
                      </select>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Grams of gold:
                      <input
                        type="number"
                        value={grams}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 20) {
                            // Limit to 12 digits
                            setGrams(value);
                          }
                        }}
                        style={{
                          backgroundColor: theme.palette.background.default,
                          color: theme.palette.text.primary,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      />
                    </label>
                    {formError && <p className="form-error">{formError}</p>}
                  </div>
                  <button
                    className="calculate-button"
                    onClick={handleCalculate}
                    style={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    Calculate
                  </button>
                  {totalPrice !== null && (
                    <div className="result">
                      <h3>
                        Total Price: {currency} {totalPrice.toLocaleString()}
                      </h3>
                    </div>
                  )}
                </article>
              </div>
            </section>
          </>
        ) : (
          <div className="loading-container">
            <GradientCircularProgress />
          </div>
        )}
      </main>
      <footer
        className="App-footer"
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <p>&copy; 2024 Muchammad Alief Kurnia. For Portofolio Only.</p>
      </footer>
    </div>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                primary: {
                  main: "#884a39", // dark brown for header/footer in dark mode
                },
                background: {
                  default: "#292929",
                  paper: "#333333",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#aaaaaa",
                },
                secondary: {
                  main: "#c38154", // medium brown for buttons in dark mode
                  contrastText: "#ffffff",
                },
              }
            : {
                primary: {
                  main: "#cc6b53", // dark brown for header/footer in light mode
                },
                background: {
                  default: "#f9e0bb",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#000000",
                  secondary: "#4f4f4f",
                },
                secondary: {
                  main: "#ffc26f", // light orange for buttons in light mode
                  contrastText: "#884a39",
                },
              }),
        },
        typography: {
          fontFamily: "Arial, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
