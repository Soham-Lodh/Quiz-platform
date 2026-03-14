"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import GuidelinesButton from "../../components/GuidelinesButton";
import GuidelinesHeader from "../../components/GuidelinesHeader";

export default function QuizGuideLines() {
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  function getToken() {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (!cookie) return null;

    return cookie.split("=")[1];
  }

  async function checkAccess() {
    const token = getToken();

    if (!token) {
      toast.error("Login required");
      router.replace("/login");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/round1/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Authentication failed");
        router.replace("/login");
        return;
      }

      if (!data.qualified) {
        toast.error("You are not allowed to access the quiz");
        router.replace("/login");
        return;
      }
    } catch {
      toast.error("Backend server not reachable");
      router.replace("/login");
    }
  }

  useEffect(() => {
    checkAccess();

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="h-[100vh] w-full overflow-hidden bg-[#dcdcdc] flex flex-col items-center text-black">

      <div className="flex justify-center mt-6">
        <GuidelinesHeader />
      </div>

      <div className="flex justify-center mt-6 max-w-5xl px-8">

        <div className="bg-white border-[4px] border-black p-8 shadow-[10px_10px_0px_rgba(0,0,0,1)] max-h-[60vh] overflow-y-auto">

          {/* Quiz Structure */}
          <div className="mb-6">
            <h2 className="text-xl font-black mb-3 uppercase tracking-widest">
              Quiz Structure
            </h2>

            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li>The quiz contains <b>20 multiple choice questions</b>.</li>
              <li>Questions are randomly selected from a larger question pool.</li>
              <li>Each participant receives a <b>unique random set</b> of questions.</li>
              <li>The quiz can be attempted <b>only once</b>.</li>
            </ul>
          </div>

          {/* Scoring */}
          <div className="mb-6">
            <h2 className="text-xl font-black mb-3 uppercase tracking-widest">
              Scoring System
            </h2>

            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li>Correct answer: <b>+1 mark</b></li>
              <li>Incorrect answer: <b>-1 mark</b></li>
              <li>The final score is calculated automatically by the system.</li>
            </ul>
          </div>

          {/* Question Rules */}
          <div className="mb-6">
            <h2 className="text-xl font-black mb-3 uppercase tracking-widest">
              Question Navigation
            </h2>

            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li>You must select an answer before moving forward.</li>
              <li>You <b>cannot skip questions</b>.</li>
              <li>You <b>cannot return to previous questions</b>.</li>
              <li>Each question allows only <b>one answer submission</b>.</li>
            </ul>
          </div>

          {/* Timer */}
          <div className="mb-6">
            <h2 className="text-xl font-black mb-3 uppercase tracking-widest">
              Timer Rules
            </h2>

            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li>Total quiz duration is <b>20 minutes</b>.</li>
              <li>The timer starts immediately when the quiz begins.</li>
              <li>If the timer reaches zero, the quiz will be <b>automatically submitted</b>.</li>
              <li>Refreshing the page will <b>not reset the timer</b>.</li>
              <li>Your progress is automatically saved.</li>
            </ul>
          </div>

          {/* Tab Switching */}
          <div className="mb-6">
            <h2 className="text-xl font-black mb-3 uppercase tracking-widest">
              Tab Switching Policy
            </h2>

            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li>The system monitors tab switching.</li>
              <li>You are allowed a maximum of <b>3 tab switches</b>.</li>
              <li>After the third tab switch, the quiz will be <b>terminated automatically</b>.</li>
              <li>Termination due to tab switching leads to <b>disqualification</b>.</li>
            </ul>
          </div>


          {/* Technical */}
          <div>
            <h2 className="text-xl font-black mb-3 uppercase tracking-widest">
              Technical Requirements
            </h2>

            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li>Use a stable internet connection.</li>
              <li>Use a modern browser such as Chrome or Edge.</li>
              <li>Avoid opening multiple tabs during the quiz.</li>
              <li>Do not refresh or close the quiz page intentionally.</li>
            </ul>
          </div>

        </div>
      </div>

      <div className="flex justify-center mt-6">
        <GuidelinesButton />
      </div>

    </div>
  );
}