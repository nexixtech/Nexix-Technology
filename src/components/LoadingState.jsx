import React from "react";

export default function LoadingState({ message = "Loading content..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 w-full text-center">
      {/* Premium ECG-like loading animation */}
      <div className="relative w-16 h-10 mb-6">
        <svg className="w-full h-full" viewBox="0 0 50 30" fill="none">
          <path
            d="M0,15 L15,15 L18,5 L22,25 L25,10 L28,20 L31,13 L34,17 L37,15 L50,15"
            stroke="#0A0A0A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />
        </svg>
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-[#888888] animate-pulse">
        {message}
      </p>
    </div>
  );
}
