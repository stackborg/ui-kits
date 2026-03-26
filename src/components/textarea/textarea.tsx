import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 bg-transparent text-[hsl(var(--ui-foreground))] placeholder:text-[hsl(var(--ui-muted-foreground))] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[hsl(var(--ui-background))] resize-y min-h-20",
  {
    variants: {
      state: {
        default:
          "border-[hsl(var(--ui-border))] hover:border-[hsl(var(--ui-ring))] focus:border-[hsl(var(--ui-ring))] focus:ring-[hsl(var(--ui-ring)/0.2)]",
        error:
          "border-[hsl(var(--ui-destructive))] focus:border-[hsl(var(--ui-destructive))] focus:ring-[hsl(var(--ui-destructive)/0.2)]",
        disabled:
          "border-[hsl(var(--ui-border)/0.5)] bg-[hsl(var(--ui-muted)/0.3)] text-[hsl(var(--ui-muted-foreground))] cursor-not-allowed resize-none",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants> & {
    /** Error state */
    error?: boolean;
  };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state, error, disabled, ...props }, ref) => {
    const resolvedState = disabled ? "disabled" : error ? "error" : state ?? "default";

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(textareaVariants({ state: resolvedState }), className)}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
