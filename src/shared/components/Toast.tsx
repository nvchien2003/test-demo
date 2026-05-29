import { useAppStore } from '../../app/store/appStore';

export const ToastViewport = () => {
  const toasts = useAppStore((state) => state.toasts);
  const dismissToast = useAppStore((state) => state.dismissToast);

  return (
    <div className="fixed bottom-4 right-4 z-50 grid w-[calc(100vw-2rem)] max-w-sm gap-2">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => dismissToast(toast.id)}
          className={`rounded-md border p-3 text-left text-sm shadow-lg ${
            toast.type === 'error'
              ? 'border-red-200 bg-red-50 text-red-900'
              : 'border-emerald-200 bg-emerald-50 text-emerald-950'
          }`}
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
};
