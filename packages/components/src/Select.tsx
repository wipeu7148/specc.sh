import React from "react";
import { FormField } from "./FormField";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Select({
  label,
  error,
  hint,
  size = "md",
  className = "",
  id,
  children,
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const sizeClass =
    size === "sm" ? "h-7 pl-2.5 pr-7 text-xs" : "h-8 pl-3 pr-7 text-sm";

  return (
    <FormField label={label} labelFor={selectId} error={error} hint={hint}>
      <select
        id={selectId}
        {...props}
        className={[
          "w-full rounded-md border outline-none transition-colors appearance-none",
          "bg-[var(--ui-input-bg)] text-[var(--ui-input-text)]",
          error
            ? "border-[var(--ui-danger-text)]"
            : "border-[var(--ui-input-border)] focus:border-[var(--ui-focus)]",
          "focus:ring-1 focus:ring-[var(--ui-focus)]",
          "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </select>
    </FormField>
  );
}
