// src/AdUnit.js
import React from "react";
import "./AdUnit.css";

const AdUnit = () => {
  const aAdsCode = {
    __html: `
    <iframe data-aa='2212934' src='//ad.a-ads.com/2212934?size=728x90' style='width:728px; height:90px; border:0px; padding:0; overflow:hidden; background-color: transparent;'></iframe>
    `,
  };

  return <div className="ad-container" dangerouslySetInnerHTML={aAdsCode} />;
};

export default AdUnit;
