import React from "react";
import "./AntamTable.css";

const AntamTable = ({ data }) => {
  if (!data) return null;

  const sortedKeys = Object.keys(data).sort((a, b) => parseFloat(a) - parseFloat(b));

  return (
    <div className="antam-table-wrapper">
      <table className="antam-table">
        <thead>
          <tr>
            <th>Gram</th>
            <th>Jual (Rp)</th>
            <th>Beli (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {sortedKeys.map((gram) => (
            <tr key={gram}>
              <td className="antam-gram">{gram}g</td>
              <td className="antam-price">{data[gram].jual}</td>
              <td className="antam-price">{data[gram].beli}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AntamTable;
