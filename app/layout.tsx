import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CN March Event",
  description: "Coding Ninjas Event Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} bg-white`}>
        <Navbar />

        {/* Removed overflow-hidden for proper scrolling */}
        <div className="flex min-h-[calc(100vh-44px)]">
          <Sidebar />
          <main className="flex-1 overflow-hidden min-w-0">
            {children}
          </main>
        </div>

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />

      </body>
    </html>
  );
}
