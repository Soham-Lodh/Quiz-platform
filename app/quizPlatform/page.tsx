"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  questionText: string;
  options: string[];
};

export default function QuizPlatform() {
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const TOTAL_TIME_MINUTES = 20;
  const TOTAL_SECONDS = TOTAL_TIME_MINUTES * 60;

  const QUESTIONS_PER_USER = 20;

  const STORAGE_KEY = "round2_quiz_progress";
  const COMPLETED_KEY = "round2_quiz_completed";
  const TAB_COUNT_KEY = "round2_tab_switch_count";
  const SELECTED_QUESTIONS_KEY = "round2_selected_questions";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [cheated, setCheated] = useState(false);

  const [tabChangeCount, setTabChangeCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem(TAB_COUNT_KEY) || 0);
  });

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  function getToken() {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (!cookie) return null;
    return cookie.split("=")[1];
  }

  function getRandomQuestions(all: Question[]) {
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, QUESTIONS_PER_USER);
  }

  async function reportCheating() {
    const token = getToken();
    if (!token) return;

    try {
      await fetch(`${BACKEND_URL}/round2/cheat`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  }

  /*
  AUTH CHECK
  */

  useEffect(() => {
    const token = getToken();

    if (!token) {
      toast.error("Login required");
      router.replace("/login");
      return;
    }

    const completed = localStorage.getItem(COMPLETED_KEY);

    if (completed === "true") {
      setQuizCompleted(true);
      return;
    }

    checkQualification(token);
  }, []);

  async function checkQualification(token: string) {
    try {
      const res = await fetch(`${BACKEND_URL}/round1/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to check qualification");
        router.replace("/");
        return;
      }

      if (!data.qualified) {
        toast.error("You arent allowed to enter quiz platform");
        router.replace("/");
        return;
      }

      fetchQuestions(token);
    } catch {
      toast.error("Server error");
      router.replace("/");
    }
  }

  /*
  LOAD QUESTIONS
  */

  async function fetchQuestions(token: string) {
    try {
      const res = await fetch(`${BACKEND_URL}/round2/questions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Access denied");
        router.replace("/");
        return;
      }

      let selectedQuestions: Question[] = [];

      const savedQuestions = localStorage.getItem(SELECTED_QUESTIONS_KEY);

      if (savedQuestions) {
        selectedQuestions = JSON.parse(savedQuestions);
      } else {
        selectedQuestions = getRandomQuestions(data);

        localStorage.setItem(
          SELECTED_QUESTIONS_KEY,
          JSON.stringify(selectedQuestions)
        );
      }

      setQuestions(selectedQuestions);

      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        setCurrentIndex(parsed.currentIndex ?? 0);
        setSelected(parsed.selected ?? null);
        setTimeLeft(parsed.timeLeft ?? TOTAL_SECONDS);
      }
    } catch {
      toast.error("Failed to load questions");
      router.replace("/");
    }
  }

  /*
  SAVE PROGRESS
  */

  useEffect(() => {
    if (questions.length === 0) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentIndex,
        selected,
        timeLeft,
      })
    );
  }, [currentIndex, selected, timeLeft, questions]);

  /*
  TAB SWITCH DETECTION
  */

  useEffect(() => {
    if(quizCompleted) return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabChangeCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem(TAB_COUNT_KEY, newCount.toString());
          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  /*
  HANDLE CHEATING
  */

  useEffect(() => {
    if(quizCompleted) return;
    if (tabChangeCount === 0) return;

    toast.warning(`Tab switched ${tabChangeCount} time(s)`);

    if (tabChangeCount >= 3) {
      localStorage.removeItem(STORAGE_KEY);

      toast.error("Cheating detected. Quiz terminated.");

      reportCheating();

      setCheated(true);
      setQuizCompleted(true);

      setTimeout(() => {
        router.replace("/");
      }, 2000);
    }
  }, [tabChangeCount]);

  /*
  DEVTOOLS DETECTION
  */

  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 160;

      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        toast.error("Developer tools detected. Quiz terminated.");

        reportCheating();

        setCheated(true);
        setQuizCompleted(true);

        router.replace("/");
      }
    };

    const interval = setInterval(detectDevTools, 1000);

    return () => clearInterval(interval);
  }, []);

  /*
  BLOCK INSPECT SHORTCUTS
  */

  useEffect(() => {
    const blockKeys = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", blockKeys);

    return () => window.removeEventListener("keydown", blockKeys);
  }, []);

  /*
  TIMER
  */

  useEffect(() => {
    if (quizCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          localStorage.setItem(COMPLETED_KEY, "true");
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(TAB_COUNT_KEY);
          localStorage.removeItem(SELECTED_QUESTIONS_KEY);

          toast.info("Time is up. Quiz submitted automatically.");

          setQuizCompleted(true);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizCompleted]);

  /*
  SUBMIT ANSWER
  */

  async function submitAnswer(answer: string) {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    await fetch(`${BACKEND_URL}/round2/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        questionId: currentQuestion.id,
        answer,
      }),
    });
  }

  const handleContinue = async () => {
    if (selected === null) {
      toast.error("Select an option first");
      return;
    }

    try {
      await submitAnswer(currentQuestion.options[selected]);

      if (isLastQuestion) {
        localStorage.setItem(COMPLETED_KEY, "true");
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TAB_COUNT_KEY);
        localStorage.removeItem(SELECTED_QUESTIONS_KEY);

        toast.success("Quiz submitted");

        setQuizCompleted(true);
        return;
      }

      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
    } catch {
      toast.error("Failed to submit answer");
    }
  };

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;

    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  }

  /*
  UI STATES
  */

  if (quizCompleted) {
    if (cheated) {
      return (
        <div className="h-[calc(100vh-44px)] flex items-center justify-center bg-white font-sans">
          <div className="w-[600px] border-[4px] border-black bg-[#FF6B8B] p-10 text-center shadow-[10px_10px_0px_rgba(0,0,0,1)]">
            <h1 className="text-3xl font-black mb-4 uppercase text-black tracking-widest">QUIZ TERMINATED</h1>
            <p className="text-xl font-bold text-black">
              Tab switching detected. You are disqualified.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-[calc(100vh-44px)] flex items-center justify-center bg-white font-sans">
        <div className="w-[600px] border-[4px] border-black bg-[#00FFA3] p-10 text-center shadow-[10px_10px_0px_rgba(0,0,0,1)]">
          <h1 className="text-3xl font-black mb-4 uppercase text-black tracking-widest">QUIZ COMPLETED</h1>
          <p className="text-xl font-bold text-black">Thank you for giving the quiz.</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="h-[calc(100vh-44px)] flex items-center justify-center bg-white text-black font-black text-2xl uppercase tracking-widest">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-44px)] flex items-center justify-center bg-white text-black font-sans">
      <div className="w-[800px] px-8 py-6">

        <h2 className="font-black text-xl mb-4 uppercase tracking-widest text-black">
          QUESTION {currentIndex + 1}
        </h2>

        <p className="text-xl font-medium mb-6 text-black">
          {currentQuestion.questionText}
        </p>

        <div className="space-y-4">
          {currentQuestion.options.map((opt, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={`border-[3px] border-black p-4 cursor-pointer text-black font-medium transition-colors duration-150 ${
                selected === i
                  ? "bg-[#00FFA3]"
                  : "bg-[#e5e5e5] hover:bg-[#d4d4d4]"
              }`}
            >
              <span className="font-bold mr-2">Option {i + 1}</span> — {opt}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center flex justify-center">
          <button
            onClick={handleContinue}
            className="bg-[#FFF000] px-12 py-3 border-[3px] border-black font-black text-lg uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD700] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            {isLastQuestion ? "Submit" : "Continue"}
          </button>
        </div>

        <div className="mt-12 flex flex-col items-center">
          <div className="bg-black text-white px-6 py-2 inline-block font-bold tracking-widest uppercase text-sm -mb-2 z-10 relative border-2 border-black">
            TIME IS RUNNING OUT!!
          </div>

          <div className="bg-[#B517FF] text-[#00FFA3] text-5xl font-black px-10 py-3 border-[4px] border-black inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-0">
            {formatTime(timeLeft)}
          </div>
        </div>

      </div>
    </div>
  );
}