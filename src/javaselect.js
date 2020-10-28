import React from "react";
import "./App.css";
import { versionJson } from "./javaVersions.js";

export const Stocks = () => {
        let varTemp = versionJson.map(data => (
        <option value={data.version}>{data.version}</option>
         ));
  return (
    <>
      <div>
            <select className="selectStyle" value={varTemp}>{varTemp}
         		</select>
       </div>
    </>
    );
}
