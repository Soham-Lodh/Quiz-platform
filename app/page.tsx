"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex-1 w-full h-full bg-white relative flex flex-col items-center justify-center p-8 overflow-hidden z-10">
      
      
      <div className="bg-[#00FFA3] border-4 border-black px-8 py-6 md:px-16 md:py-8 mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center transform -rotate-2 hover:rotate-0 transition-transform">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-2">
          WELCOME SHINOBI!!!
        </h1>
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-black">
          To The Quiz Platform
        </h2>
      </div>

      {/* Subtext */}
      <p className="text-lg md:text-xl font-semibold text-center max-w-xl mb-12 text-black leading-relaxed">
        Make sure your mind is clear and you are ready for the challenge. Read the guidelines in detail for a happy quizzing time!
      </p>

      
      <button
        onClick={() => router.push('/quizGuidelines')}
        className="bg-[#3B5BFF] text-white px-10 py-4 rounded-full border-4 border-black font-black text-xl md:text-2xl uppercase tracking-widest hover:bg-[#FFF000] hover:text-black transition-colors duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1"
      >
        Guidelines
      </button>
      
    </div>
  );
}