import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-accent bg-accent text-white hover:bg-teal-800',
  secondary: 'border-line bg-white text-ink hover:bg-slate-50',
  danger: 'border-danger bg-danger text-white hover:bg-red-800',
  ghost: 'border-transparent bg-transparent text-slate-700 hover:bg-slate-100',
};

export const Button = ({ variant = 'primary', className = '', children, ...props }: ButtonProps) => (
  <button
    className={`inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);
