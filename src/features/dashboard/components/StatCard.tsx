import type { DashboardCard } from '../hooks/useDashboardCards';

export const StatCard = ({ card }: { card: DashboardCard }) => (
  <article className="rounded-lg border border-line bg-white p-4 shadow-panel">
    <div className="text-sm font-medium text-slate-500">{card.label}</div>
    <div className="mt-2 text-3xl font-semibold text-ink">{card.value}</div>
    <div className="mt-1 text-sm text-slate-600">{card.helper}</div>
  </article>
);
