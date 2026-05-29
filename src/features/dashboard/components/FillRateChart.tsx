interface FillRateChartProps {
  fillRate: number;
}

export const FillRateChart = ({ fillRate }: FillRateChartProps) => (
  <div className="rounded-lg border border-line bg-white p-5 shadow-panel">
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold text-ink">Tỷ lệ lấp đầy toàn hệ thống</h2>
        <p className="mt-1 text-sm text-slate-600">Mức sử dụng chỗ học trên tổng sức chứa của tất cả khóa học.</p>
      </div>
      <span className="text-2xl font-semibold text-accent">{fillRate}%</span>
    </div>
    <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${fillRate}%` }} />
    </div>
  </div>
);
