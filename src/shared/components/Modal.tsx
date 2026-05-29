import type { ReactNode } from 'react';
import { Button } from './Button';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({
  title,
  message,
  confirmLabel = 'Xóa',
  isOpen,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4" role="presentation">
      <div className="w-full max-w-md rounded-lg border border-line bg-white p-5 shadow-xl" role="dialog" aria-modal="true">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
        <div className="mt-5 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Hủy
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

interface DialogModalProps {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const DialogModal = ({ title, isOpen, children, onClose }: DialogModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4" role="presentation">
      <div
        className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-lg border border-line bg-white p-5 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="dialog-title" className="text-lg font-semibold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-ink"
            aria-label="Đóng hộp thoại"
          >
            Đóng
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

interface PanelProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const Panel = ({ title, actions, children }: PanelProps) => (
  <section className="rounded-lg border border-line bg-white p-4 shadow-panel sm:p-5">
    {title !== undefined || actions !== undefined ? (
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {title !== undefined ? <h2 className="text-base font-semibold text-ink">{title}</h2> : null}
        {actions}
      </div>
    ) : null}
    {children}
  </section>
);
