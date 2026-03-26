import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const selectVariants = cva(
  "w-full px-3 border rounded-lg text-sm transition-all duration-200 bg-transparent text-[hsl(var(--ui-foreground))] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[hsl(var(--ui-background))] appearance-none cursor-pointer",
  {
    variants: {
      selectSize: {
        sm: "h-9 text-xs",
        md: "h-10",
        lg: "h-12 text-base",
      },
      state: {
        default:
          "border-[hsl(var(--ui-border))] hover:border-[hsl(var(--ui-ring))] focus:border-[hsl(var(--ui-ring))] focus:ring-[hsl(var(--ui-ring)/0.2)]",
        error:
          "border-[hsl(var(--ui-destructive))] focus:border-[hsl(var(--ui-destructive))] focus:ring-[hsl(var(--ui-destructive)/0.2)]",
        disabled:
          "border-[hsl(var(--ui-border)/0.5)] bg-[hsl(var(--ui-muted)/0.3)] text-[hsl(var(--ui-muted-foreground))] cursor-not-allowed",
      },
    },
    defaultVariants: {
      selectSize: "md",
      state: "default",
    },
  }
);

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> &
  VariantProps<typeof selectVariants> & {
    /** Error state */
    error?: boolean;
    /** Select options */
    options: SelectOption[];
    /** Placeholder text when no value selected */
    placeholder?: string;
  };

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      selectSize,
      state,
      error,
      disabled,
      options,
      placeholder,
      ...props
    },
    ref
  ) => {
    const resolvedState = disabled
      ? "disabled"
      : error
        ? "error"
        : state ?? "default";

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            selectVariants({ selectSize, state: resolvedState }),
            "pr-10",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[hsl(var(--ui-muted-foreground))]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, selectVariants };
