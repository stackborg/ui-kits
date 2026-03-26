import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button variant definitions using CVA.
 * All colors use CSS custom properties — consumer overrides theme via --ui-* variables.
 */
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] cursor-pointer whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[hsl(var(--ui-primary))] text-[hsl(var(--ui-primary-foreground))] hover:opacity-90 focus-visible:ring-[hsl(var(--ui-ring))]",
        secondary:
          "bg-[hsl(var(--ui-secondary))] text-[hsl(var(--ui-secondary-foreground))] hover:opacity-80 border border-[hsl(var(--ui-border))] focus-visible:ring-[hsl(var(--ui-ring))]",
        destructive:
          "bg-[hsl(var(--ui-destructive))] text-[hsl(var(--ui-destructive-foreground))] hover:opacity-90 focus-visible:ring-[hsl(var(--ui-destructive))]",
        outline:
          "bg-transparent border border-[hsl(var(--ui-border))] text-[hsl(var(--ui-foreground))] hover:bg-[hsl(var(--ui-accent))] focus-visible:ring-[hsl(var(--ui-ring))]",
        ghost:
          "bg-transparent text-[hsl(var(--ui-muted-foreground))] hover:bg-[hsl(var(--ui-accent))] hover:text-[hsl(var(--ui-foreground))] focus-visible:ring-[hsl(var(--ui-ring))]",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-md",
        md: "h-10 px-4 text-sm rounded-lg",
        lg: "h-11 px-6 text-base rounded-lg",
        xl: "h-12 px-8 text-base font-bold rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ── Types ────────────────────────────────────────────────────

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** Show loading spinner and disable interaction */
    loading?: boolean;
    /** Icon element to render alongside text */
    icon?: React.ReactNode;
    /** Position of the icon relative to text */
    iconPosition?: "left" | "right";
    /** Expand to fill parent width */
    fullWidth?: boolean;
  };

// ── Component ────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          isDisabled && "cursor-not-allowed opacity-50 pointer-events-none",
          className
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>{children}</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            <span>{children}</span>
            {icon && iconPosition === "right" && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
