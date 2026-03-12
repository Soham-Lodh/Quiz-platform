"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="w-full h-screen overflow-hidden bg-[#1a1a1a] flex items-center justify-center font-sans">
      
      <div className="w-full h-full bg-white flex flex-col relative border-4 border-[#1a1a1a]">
        
        {/* Top Banner (Header) */}
        <div className="flex h-10 w-full border-b-4 border-black font-extrabold text-sm md:text-base uppercase tracking-wider">
          <div className="bg-[#FFF000] flex items-center px-4 md:px-6 border-r-4 border-black">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2 border-2 border-black"></span>
            CN KIIT
          </div>
          <div className="bg-[#FFF000] hidden md:flex flex-1 items-center justify-center border-r-4 border-black">
            NINJA'S GOT TALENT
          </div>
          <div className="bg-[#00FFA3] hidden md:flex flex-1 items-center justify-center border-r-4 border-black text-black">
            <span className="mr-2 text-xl">✸</span> NINJA'S GOT TALENT
          </div>
          <div className="bg-black text-white flex-1 flex items-center justify-center">
            <span className="text-[#FFF000] mr-2 text-xl">✦</span> NINJA'S GOT TALENT
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-1 overflow-hidden">
          
          
          <div className="hidden md:flex flex-col w-72 border-r-4 border-black h-full">
            
            {/* Top Section: Pink Box & Polka Dots */}
            <div className="flex h-1/3 border-b-4 border-black">
              <div className="w-16 bg-[#E4A0F7] border-r-4 border-black flex flex-col items-center justify-center gap-4 py-4">
                <div className="w-6 h-6 bg-white rotate-45 border-2 border-black"></div>
                <div className="w-6 h-6 bg-white rotate-45 border-2 border-black"></div>
              </div>
              <div 
                className="flex-1 bg-white" 
                style={{ 
                  backgroundImage: "radial-gradient(black 30%, transparent 30%)", 
                  backgroundSize: "24px 24px",
                  backgroundPosition: "0 0, 12px 12px"
                }}
              ></div>
            </div>
            
            
            <div className="flex-1 bg-[#3B5BFF] flex flex-col items-center py-8 relative overflow-hidden">
              <div className="text-white text-3xl font-black uppercase leading-tight tracking-widest text-center mt-4">
                <div className="mb-1">QUIZ TIME</div>
                <div className="mb-1">QUIZ TIME</div>
                <div className="mb-1">QUIZ TIME</div>
                <div className="mb-1">QUIZ TIME</div>
              </div>
              
              
              <div className="absolute bottom-24 w-32 h-32 flex items-center justify-center text-[#00FFA3]">
                {[0, 30, 60, 90, 120, 150].map((deg) => (
                  <div 
                    key={deg} 
                    className="absolute w-full h-4 bg-current rounded-full" 
                    style={{ transform: `rotate(${deg}deg)` }}
                  ></div>
                ))}
              </div>
              
              {/* Bottom decorative white scallops matching the theme */}
              <div className="absolute bottom-0 w-full flex justify-around translate-y-1/2">
                <div className="w-24 h-24 bg-white rounded-full"></div>
                <div className="w-24 h-24 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

         
          <div className="flex-1 bg-white relative flex flex-col items-center justify-center p-8 overflow-hidden z-10">
            
            {/* Pop-art Greeting Box */}
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

            {/* Call to Action Button */}
            <button
              onClick={() => router.push('/quizGuidelines')}
              className="bg-[#3B5BFF] text-white px-10 py-4 rounded-full border-4 border-black font-black text-xl md:text-2xl uppercase tracking-widest hover:bg-[#FFF000] hover:text-black transition-colors duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1"
            >
              Guidelines
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}