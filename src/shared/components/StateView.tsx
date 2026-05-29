import type { ReactNode } from 'react';

interface StateViewProps {
  title: string;
  message: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, message, action }: StateViewProps) => (
  <div className="grid place-items-center rounded-lg border border-dashed border-line bg-slate-50 px-4 py-10 text-center">
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{message}</p>
      {action !== undefined ? <div className="mt-4">{action}</div> : null}
    </div>
  </div>
);

export const LoadingState = () => (
  <div className="rounded-lg border border-line bg-white p-6 text-sm text-slate-600 shadow-panel">Đang tải dữ liệu...</div>
);

export const ErrorState = ({ title, message }: Pick<StateViewProps, 'title' | 'message'>) => (
  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
    <strong>{title}</strong>
    <p className="mt-1">{message}</p>
  </div>
);
