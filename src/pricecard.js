import React from "react";
import "./PriceCard.css";

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
    </div>
  );
};

export default PriceCard;
