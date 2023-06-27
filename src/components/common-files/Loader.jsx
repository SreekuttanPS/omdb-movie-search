import React from "react";
import "../assets/css/loader.css";

export default function Loader() {
  return (
    <div className="spinner-container loader-class">
      <div className="container">
        <div className="container">
          <div className="container">
            <div className="d-flex justify-content-center">
              <div className="">
                {/* <div className="loading-spinner"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
