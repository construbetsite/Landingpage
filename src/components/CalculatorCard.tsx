import type { ReactNode } from "react";

interface CalculatorCardProps {
  children: ReactNode;
  className?: string;
}

export default function CalculatorCard({
  children,
  className = "",
}: CalculatorCardProps) {
  return (
    <div
      className={`rounded-[24px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}
