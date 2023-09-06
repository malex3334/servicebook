import React from "react";
import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="loader">
      <RotatingLines
        strokeColor="orangered"
        strokeWidth="5"
        animationDuration="0.75"
        width="48"
        visible={true}
      />
    </div>
  );
}
