import React from "react";

export default function ECGBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute w-full h-[300px] top-1/3 left-0 opacity-[0.12] animate-ecg-sweep">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,50 
               L 200,50 
               L 210,35 
               L 220,65 
               L 230,20 
               L 245,90 
               L 255,45 
               L 265,55 
               L 275,50 
               L 550,50 
               L 560,35 
               L 570,65 
               L 580,20 
               L 595,90 
               L 605,45 
               L 615,55 
               L 625,50 
               L 800,50 
               L 810,35 
               L 820,65 
               L 830,20 
               L 845,90 
               L 855,45 
               L 865,55 
               L 875,50 
               L 1000,50"
            fill="none"
            stroke="#888888"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
