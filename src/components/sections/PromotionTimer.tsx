import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const targetDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 25 * 60 * 1000);

function getTimeLeft(): TimeLeft {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function PromotionTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const items = useMemo(
    () => [
      { label: "Dias", value: timeLeft.days.toString().padStart(2, "0") },
      { label: "Horas", value: timeLeft.hours.toString().padStart(2, "0") },
      { label: "Minutos", value: timeLeft.minutes.toString().padStart(2, "0") },
      { label: "Segundos", value: timeLeft.seconds.toString().padStart(2, "0") },
    ],
    [timeLeft]
  );

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {items.map((item) => (
        <motion.div
          key={item.label}
          className="min-w-[52px] flex-1 rounded-lg bg-white/10 px-2 py-2 text-center backdrop-blur-sm sm:min-w-[60px] sm:px-3 sm:py-3"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.p
            key={item.value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg font-bold text-white sm:text-2xl"
          >
            {item.value}
          </motion.p>
          <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.2em] text-slate-300 sm:mt-1 sm:text-[10px]">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
