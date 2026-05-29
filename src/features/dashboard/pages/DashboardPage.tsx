import { selectDashboardStats, useAppStore } from '../store';
import { FillRateChart } from '../components/FillRateChart';
import { StatCard } from '../components/StatCard';
import { useDashboardCards } from '../hooks/useDashboardCards';

export const DashboardPage = () => {
  const stats = useAppStore(selectDashboardStats);
  const cards = useDashboardCards(stats);

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Live operational snapshot from the browser data store.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <StatCard key={card.label} card={card} />
        ))}
      </div>
      <FillRateChart fillRate={stats.fillRate} />
    </div>
  );
};
