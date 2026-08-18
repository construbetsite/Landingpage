import { motion } from "framer-motion";
import type { SocialLink } from "../../types/socialLink";

interface SocialCardProps {
  link: SocialLink;
}

export default function SocialCard({ link }: SocialCardProps) {
  const Icon = link.icon;

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="group flex min-w-[78%] flex-col items-start rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(7,27,70,0.05)] transition duration-300 hover:border-[#071B46] sm:min-w-[calc(50%-0.75rem)] md:min-w-0"
      aria-label={`Seguir a Construbet no ${link.name}`}
      title={`Seguir a Construbet no ${link.name}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#071B46] transition duration-300 group-hover:scale-110 group-hover:bg-[#071B46] group-hover:text-white">
        <Icon size={20} aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{link.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{link.description}</p>
    </motion.a>
  );
}
