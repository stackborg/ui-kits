import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ui-ring)/0.3)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--ui-background))]",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none inline-block rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type SwitchProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "role" | "aria-checked"
> &
  VariantProps<typeof switchVariants> & {
    /** Controlled checked state */
    checked?: boolean;
    /** Default checked for uncontrolled mode */
    defaultChecked?: boolean;
    /** Called when toggle changes */
    onCheckedChange?: (checked: boolean) => void;
    /** Label text */
    label?: string;
  };

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      label,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const handleToggle = () => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) setInternalChecked(next);
      onCheckedChange?.(next);
    };

    const translateX = size === "sm" ? "translate-x-4" : "translate-x-5";

    return (
      <div className="inline-flex items-center gap-2">
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            switchVariants({ size }),
            isChecked
              ? "bg-[hsl(var(--ui-primary))]"
              : "bg-[hsl(var(--ui-muted))]",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          {...props}
        >
          <span
            className={cn(
              thumbVariants({ size }),
              isChecked ? translateX : "translate-x-0"
            )}
          />
        </button>
        {label && (
          <span
            className={cn(
              "text-sm select-none cursor-pointer text-[hsl(var(--ui-foreground))]",
              disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={handleToggle}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchVariants };
