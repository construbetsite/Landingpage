import type { ReactNode } from "react";

interface ResultItem {
  label: string;
  value: string;
}

interface ResultCardProps {
  title: string;
  items: ResultItem[];
  actions?: ReactNode;
}

export default function ResultCard({ title, items, actions }: ResultCardProps) {
  return (
    <div className="rounded-[24px] border border-sky-100 bg-sky-50/80 p-5 shadow-[0_16px_40px_rgba(2,132,199,0.08)]">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <dl className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3">
            <dt className="text-sm text-slate-600">{item.label}</dt>
            <dd className="text-sm font-semibold text-slate-900">{item.value}</dd>
          </div>
        ))}
      </dl>
      {actions ? <div className="mt-5 flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
