import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium transition-colors whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--ui-primary))] text-[hsl(var(--ui-primary-foreground))]",
        secondary:
          "bg-[hsl(var(--ui-secondary))] text-[hsl(var(--ui-secondary-foreground))] border border-[hsl(var(--ui-border))]",
        success:
          "bg-[hsl(var(--ui-success))] text-[hsl(var(--ui-success-foreground))]",
        warning:
          "bg-[hsl(var(--ui-warning))] text-[hsl(var(--ui-warning-foreground))]",
        destructive:
          "bg-[hsl(var(--ui-destructive))] text-[hsl(var(--ui-destructive-foreground))]",
        outline:
          "bg-transparent border border-[hsl(var(--ui-border))] text-[hsl(var(--ui-foreground))]",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-md",
        md: "px-2.5 py-0.5 text-xs rounded-md",
        lg: "px-3 py-1 text-sm rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    /** Show a remove/close button */
    removable?: boolean;
    /** Called when remove button is clicked */
    onRemove?: () => void;
  };

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, variant, size, removable, onRemove, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="ml-0.5 -mr-1 inline-flex items-center justify-center rounded-full p-0.5 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Remove"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
