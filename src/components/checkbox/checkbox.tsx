import React from "react";
import { cn } from "@/lib/utils";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Error state */
  error?: boolean;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, disabled, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${React.useId()}`;

    return (
      <div className="inline-flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          className={cn(
            "h-4 w-4 rounded border transition-colors cursor-pointer accent-[hsl(var(--ui-primary))]",
            "border-[hsl(var(--ui-border))]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ui-ring)/0.3)] focus-visible:ring-offset-1",
            error && "border-[hsl(var(--ui-destructive))]",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              "text-sm select-none cursor-pointer text-[hsl(var(--ui-foreground))]",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
