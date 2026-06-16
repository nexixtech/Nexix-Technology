import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorState({ 
  message = "Failed to load database content.", 
  onRetry 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 border border-red-100 rounded-[16px] bg-red-50/20 max-w-lg mx-auto text-center my-8">
      <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h4 className="font-display font-bold text-lg text-red-950 mb-2">{message}</h4>
      <p className="text-red-700/75 text-xs max-w-sm leading-relaxed mb-6">
        Please check your internet connection or verify your environment configuration settings.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 border border-[#0A0A0A] bg-[#0A0A0A] hover:bg-[#E0E0E0] hover:text-black text-white rounded-[8px] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Retry Request
        </button>
      )}
    </div>
  );
}
