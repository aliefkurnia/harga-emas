import React from "react";

const purchaseLinks = [
  { href: "https://www.logammulia.com/id/purchase/gold", text: "Logam Mulia" },
  { href: "https://www.antam.com/id/precious-metal-price", text: "Antam" },
  { href: "https://www.indogold.id/harga-emas-hari-ini", text: "IndoGold" },
  { href: "https://www.lakuemas.com/", text: "Laku Emas" },
  { href: "https://www.anekalogam.co.id/id", text: "Aneka Logam" },
  { href: "https://www.tokopedia.com/emas-antam-id", text: "Tokopedia Emas" },
  { href: "https://rajaemasindonesia.co.id/", text: "Raja Emas Indonesia" },
];

function PurchasePopup() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="purchase-fab" ref={ref}>
      <div className={`purchase-dropdown ${open ? "open" : ""}`}>
        <h3>Beli Emas</h3>
        {purchaseLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="purchase-link"
          >
            {link.text}
          </a>
        ))}
      </div>
      <button className="fab-btn" onClick={() => setOpen(!open)}>
        <span role="img" aria-label="gold">🪙</span>
        Beli Emas
      </button>
    </div>
  );
}

export default PurchasePopup;
