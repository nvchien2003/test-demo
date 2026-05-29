import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FieldWrapperProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export const FieldWrapper = ({ label, error, children }: FieldWrapperProps) => (
  <label className="grid gap-1.5 text-sm font-medium text-slate-700">
    <span>{label}</span>
    {children}
    {error !== undefined ? <span className="text-xs font-medium text-danger">{error}</span> : null}
  </label>
);

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextField = ({ label, error, className = '', ...props }: TextFieldProps) => (
  <FieldWrapper label={label} error={error}>
    <input
      className={`min-h-10 rounded-md border border-line bg-white px-3 py-2 text-sm text-ink shadow-sm ${className}`}
      {...props}
    />
  </FieldWrapper>
);

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextareaField = ({ label, error, className = '', ...props }: TextareaFieldProps) => (
  <FieldWrapper label={label} error={error}>
    <textarea
      className={`min-h-24 rounded-md border border-line bg-white px-3 py-2 text-sm text-ink shadow-sm ${className}`}
      {...props}
    />
  </FieldWrapper>
);

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const SelectField = ({ label, error, className = '', children, ...props }: SelectFieldProps) => (
  <FieldWrapper label={label} error={error}>
    <select
      className={`min-h-10 rounded-md border border-line bg-white px-3 py-2 text-sm text-ink shadow-sm ${className}`}
      {...props}
    >
      {children}
    </select>
  </FieldWrapper>
);
