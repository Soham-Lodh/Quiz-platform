"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import GuidelinesButton from "../../components/GuidelinesButton";
import GuidelinesHeader from "../../components/GuidelinesHeader";
import GuidelinesInfo from "../../components/GuidelinesInfo";

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

    document.body.style.overflow = "hidden"; // scrool hide kar diya 

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
        <GuidelinesInfo />
      </div>

      <div className="flex justify-center mt-6">
        <GuidelinesButton />
      </div>
    </div>
  );
}