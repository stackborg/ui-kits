import React from "react";
import { cn } from "@/lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  /** Show a red asterisk to indicate required field */
  required?: boolean;
};

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium text-[hsl(var(--ui-foreground))] select-none",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-0.5 text-[hsl(var(--ui-destructive))]" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };
