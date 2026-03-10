import React from "react";
import { FormField } from "./FormField";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  /** visual size — default "md" */
  size?: "sm" | "md";
}

export function Input({
  label,
  error,
  hint,
  size = "md",
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const sizeClass = size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3 text-sm";

  return (
    <FormField label={label} labelFor={inputId} error={error} hint={hint}>
      <input
        id={inputId}
        {...props}
        className={[
          "w-full rounded-md border outline-none transition-colors",
          "bg-[var(--ui-input-bg)] text-[var(--ui-input-text)]",
          "placeholder:text-[var(--ui-input-placeholder)]",
          error
            ? "border-[var(--ui-danger-text)]"
            : "border-[var(--ui-input-border)] focus:border-[var(--ui-focus)]",
          "focus:ring-1 focus:ring-[var(--ui-focus)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </FormField>
  );
}
