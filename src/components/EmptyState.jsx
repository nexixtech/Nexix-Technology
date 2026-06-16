import React from "react";
import { Sparkles } from "lucide-react";

export default function EmptyState({ 
  message = "No records found.", 
  desc = "We are updating our assets and content. Check back shortly." 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 border border-[#EBEBEB] rounded-[16px] bg-white shadow-sm max-w-lg mx-auto text-center my-8">
      <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center text-[#0A0A0A] mb-4">
        <Sparkles className="w-5 h-5 text-[#888888]" />
      </div>
      <h4 className="font-display font-bold text-lg text-[#0A0A0A] mb-2">{message}</h4>
      <p className="text-[#666666] text-xs max-w-sm leading-relaxed">{desc}</p>
    </div>
  );
}
