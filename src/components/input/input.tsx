import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full px-3 border rounded-lg text-sm transition-all duration-200 bg-transparent text-[hsl(var(--ui-foreground))] placeholder:text-[hsl(var(--ui-muted-foreground))] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[hsl(var(--ui-background))]",
  {
    variants: {
      inputSize: {
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
      inputSize: "md",
      state: "default",
    },
  }
);

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> &
  VariantProps<typeof inputVariants> & {
    /** Error state — applies red border */
    error?: boolean;
    /** Icon on the left side */
    leftIcon?: React.ReactNode;
    /** Icon on the right side */
    rightIcon?: React.ReactNode;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputSize,
      state,
      error,
      disabled,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    // Derive state from props if not explicitly set
    const resolvedState = disabled
      ? "disabled"
      : error
        ? "error"
        : state ?? "default";

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--ui-muted-foreground))] pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            inputVariants({ inputSize, state: resolvedState }),
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--ui-muted-foreground))] pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
