"use client";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/judge/team-display": "TEAM CARDS",
    "/round1/judge/teamDetails": "TEAM DETAILS",
    "/round1/judge/leaderboard": "LEADERBOARD",
    "/round1/judge/login": "QUIZ TIME",
    "/round1/judge/teamDisplay": "TEAM CARDS",
    "/round1/audience/votingPanel": "VOTE 4 UR FAVS",
    "/round1/audience/votingPanel/scores": "TEAM DETAILS",
    "/round1/audience/leaderboard": "LEADERBOARD",
    "/round1/player/leaderboard": "LEADERBOARD",
    "/round1/player/login": "QUIZ TIME",
    "/round1/player/panel": "QUIZ TIME",
    "/round1/player/register": "QUIZ TIME",
    "/round1/player/results/failure": "RESULTS",
    "/round1/player/results/success": "RESULTS",
    "/round2/login": "VOLUME 2.0",
    "/round2/quizGuidelines": "QUIZ TIME",
    "/round2/quizPlatform": "QUIZ TIME",
    "/": "QUIZ TIME"
  };

 
  const title = titles[pathname] || "QUIZ TIME";

  return (
    <aside className="w-60 min-h-[calc(100vh-44px)] flex flex-col shrink-0">

      <div className="flex h-40">

        <div className="flex flex-col w-1/2">
          <div className="bg-pink-500 flex-1 flex items-center justify-center">
            <img src="/graphic2.png" alt="shape" className="w-12" />
          </div>
          <div className="bg-purple-400 flex-1"></div>
        </div>

        <div className="w-1/2 relative overflow-hidden">
          <img
            src="/bwdots.png"
            alt="dots"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </div>

      <div className="relative flex-1 bg-[#4B63E6] text-white flex flex-col items-center pt-6 overflow-hidden">

        <div className="leading-none text-3xl font-bold text-center">
          <p>{title}</p>
          <p>{title}</p>
          <p>{title}</p>
          <p>{title}</p>
        </div>

        <img
          src="/graphic1.png"
          alt="flower"
          className="mt-5 w-40 z-10"
        />

        <div className="absolute bottom-0 bg-white h-22 w-full">
          <div className="absolute bottom-11 left-0 w-1/2 h-22 bg-[#4B63E6] rounded-full"></div>
          <div className="absolute bottom-11 right-0 w-1/2 h-22 bg-[#4B63E6] rounded-full"></div>
          <div className="absolute -bottom-11 left-0 w-1/2 h-22 bg-[#4B63E6] rounded-full"></div>
          <div className="absolute -bottom-11 right-0 w-1/2 h-22 bg-[#4B63E6] rounded-full"></div>
        </div>

      </div>

    </aside>
  );
}