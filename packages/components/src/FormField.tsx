interface FormFieldProps {
  label?: string;
  labelFor?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  labelFor,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={labelFor}
          className="text-xs font-medium text-[var(--ui-text-muted)]"
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-[var(--ui-danger-text)]">{error}</p>}
      {hint && !error && (
        <p className="text-xs text-[var(--ui-text-subtle)]">{hint}</p>
      )}
    </div>
  );
}
