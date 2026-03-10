const sizeClasses = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-4",
  lg: "h-12 w-12 border-4",
} as const;

export interface SpinnerProps {
  size?: keyof typeof sizeClasses;
}

export function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-[var(--ui-border)] border-t-[var(--ui-btn-primary-bg)] ${sizeClasses[size]}`}
    />
  );
}
