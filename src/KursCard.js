import React from "react";
import "./KursCard.css";

const KursCard = ({ data }) => {
  if (!data || !data.beli) return null;

  return (
    <div className="kurs-card">
      <div className="kurs-card-header">
        <div>
          <h3 className="kurs-card-title">Kurs BI</h3>
          <span className="kurs-card-subtitle">Bank Indonesia</span>
        </div>
        <span className="kurs-card-symbol">USD/IDR</span>
      </div>
      <div className="kurs-card-body">
        <div className="kurs-row">
          <span className="kurs-label">Beli</span>
          <span className="kurs-value">Rp {data.beli}</span>
        </div>
        <div className="kurs-row">
          <span className="kurs-label">Jual</span>
          <span className="kurs-value">Rp {data.jual}</span>
        </div>
      </div>
    </div>
  );
};

export default KursCard;
