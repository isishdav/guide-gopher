import { useEffect, useState } from "react";
import { WifiOff, ArrowRight } from "lucide-react";

interface OfflinePageProps {
  onRetry?: () => void;
}

const OfflinePage = ({ onRetry }: OfflinePageProps) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleRetry = () => {
    setIsChecking(true);

    setTimeout(() => {
      if (navigator.onLine) {
        onRetry?.();
      }

      setIsChecking(false);
    }, 800);
  };

  useEffect(() => {
    const handleOnline = () => {
      onRetry?.();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [onRetry]);

  return (
    <main className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 text-black">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 border-r border-black/[0.04]" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2" />

      {/* Curtain-inspired background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[18%] opacity-[0.035]">
        <div className="h-full w-full bg-gradient-to-r from-black to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] opacity-[0.035]">
        <div className="h-full w-full bg-gradient-to-l from-black to-transparent" />
      </div>

      <section className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        {/* Brand */}
        <div className="mb-14">
          <p className="text-[11px] font-medium uppercase tracking-[0.45em] text-black/45">
            Curtains Hub
          </p>
        </div>

        {/* Icon */}
        <div className="mb-9 flex h-20 w-20 items-center justify-center rounded-full border border-black/10">
          <WifiOff
            strokeWidth={1.2}
            className="h-7 w-7 text-black/70"
          />
        </div>

        {/* Heading */}
        <div className="space-y-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-black/40">
            Connection Interrupted
          </p>

          <h1 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl md:text-6xl">
            Even beautiful spaces
            <br />
            need a connection.
          </h1>

          <p className="mx-auto max-w-lg text-sm leading-7 text-black/55 sm:text-base">
            It looks like you've lost your internet connection.
            Check your connection and we'll bring you right back
            to the Curtains Hub experience.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={handleRetry}
            disabled={isChecking}
            className="group flex min-w-[170px] items-center justify-center gap-3 bg-black px-7 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-black/80 disabled:cursor-wait disabled:opacity-60"
          >
            {isChecking ? "Checking..." : "Try Again"}

            {!isChecking && (
              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </button>

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="min-w-[170px] border border-black/15 px-7 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:border-black/40"
          >
            Return Home
          </button>
        </div>

        {/* Bottom message */}
        <div className="mt-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30">
            Your Confidence Begins Here.
          </p>
        </div>
      </section>
    </main>
  );
};

export default OfflinePage;