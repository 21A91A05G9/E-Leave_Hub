import React from "react";
import "./piechart.css";
export default function piechart(props) {
  return (
    <div className="pie">
      <div className="html">{props.pre}% Present Rate</div>
      <div className="css">{props.abs}% Absent Rate</div>
    </div>
  );
}
