import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#050505] relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none hidden dark:block" />

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Pure CSS Loader */}
        <span className="loader"></span>

        {/* Brand Text */}
        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight animate-pulse">
          Biblio<span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Drop</span>
        </h2>
      </div>

      {/* Injecting the custom CSS animations directly into the component */}
      <style>{`
        .loader {
          width: 48px;
          height: 48px;
          display: inline-block;
          position: relative;
          transform: rotate(45deg);
        }
        .loader::before {
          content: '';
          box-sizing: border-box;
          width: 24px;
          height: 24px;
          position: absolute;
          left: 0;
          top: -24px;
          animation: animloader 4s ease infinite;
        }
        .loader::after {
          content: '';
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 0;
          width: 24px;
          height: 24px;
          background: rgba(16, 185, 129, 0.85); /* Emerald 500 */
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
          animation: animloader2 2s ease infinite;
        }

        @keyframes animloader {
          0% { box-shadow: 0 24px rgba(16, 185, 129, 0), 24px 24px rgba(16, 185, 129, 0), 24px 48px rgba(16, 185, 129, 0), 0px 48px rgba(16, 185, 129, 0); }
          12% { box-shadow: 0 24px #10b981, 24px 24px rgba(16, 185, 129, 0), 24px 48px rgba(16, 185, 129, 0), 0px 48px rgba(16, 185, 129, 0); }
          25% { box-shadow: 0 24px #10b981, 24px 24px #10b981, 24px 48px rgba(16, 185, 129, 0), 0px 48px rgba(16, 185, 129, 0); }
          37% { box-shadow: 0 24px #10b981, 24px 24px #10b981, 24px 48px #10b981, 0px 48px rgba(16, 185, 129, 0); }
          50% { box-shadow: 0 24px #10b981, 24px 24px #10b981, 24px 48px #10b981, 0px 48px #10b981; }
          62% { box-shadow: 0 24px rgba(16, 185, 129, 0), 24px 24px #10b981, 24px 48px #10b981, 0px 48px #10b981; }
          75% { box-shadow: 0 24px rgba(16, 185, 129, 0), 24px 24px rgba(16, 185, 129, 0), 24px 48px #10b981, 0px 48px #10b981; }
          87% { box-shadow: 0 24px rgba(16, 185, 129, 0), 24px 24px rgba(16, 185, 129, 0), 24px 48px rgba(16, 185, 129, 0), 0px 48px #10b981; }
          100% { box-shadow: 0 24px rgba(16, 185, 129, 0), 24px 24px rgba(16, 185, 129, 0), 24px 48px rgba(16, 185, 129, 0), 0px 48px rgba(16, 185, 129, 0); }
        }

        @keyframes animloader2 {
          0% { transform: translate(0, 0) rotateX(0) rotateY(0); }
          25% { transform: translate(100%, 0) rotateX(0) rotateY(180deg); }
          50% { transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg); }
          75% { transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg); }
          100% { transform: translate(0, 0) rotateX(0) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}