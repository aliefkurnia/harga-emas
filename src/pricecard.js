import React from "react";

const PriceCard = ({ title, subtitle, data, symbol }) => {
  if (!data) return null;

  return (
    <div className="price-card">
      <div className="price-card-header">
        <div>
          <h3 className="price-card-title">{title}</h3>
          <span className="price-card-subtitle">{subtitle}</span>
        </div>
        <span className="price-card-symbol">{symbol || title}</span>
      </div>
      <div className="price-card-body">
        <div className="price-row">
          <span className="price-label">Per Gram</span>
          <span className="price-value">{data?.gr}</span>
        </div>
        <div className="price-row">
          <span className="price-label">Per Ounce</span>
          <span className="price-value">{data?.oz}</span>
        </div>
        <div className="price-row">
          <span className="price-label">Per Kilogram</span>
          <span className="price-value">{data?.kg}</span>
        </div>
      </div>

      <style>{`
        .price-card {
          background: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius);
          padding: 1.5rem;
          transition: all var(--transition);
        }
        .price-card:hover {
          border-color: rgba(212, 168, 83, 0.35);
          box-shadow: var(--shadow-gold);
          transform: translateY(-4px);
        }
        .price-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--surface-border);
        }
        .price-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .price-card-subtitle {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .price-card-symbol {
          font-size: 0.85rem;
          font-weight: 700;
          background: var(--gradient-gold);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding: 0.3rem 0.75rem;
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 100px;
        }
        .price-card-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .price-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .price-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text);
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </div>
  );
};

export default PriceCard;
