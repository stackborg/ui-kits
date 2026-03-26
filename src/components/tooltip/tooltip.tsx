import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export type TooltipProps = {
  /** Tooltip text content */
  content: string;
  /** Position relative to trigger */
  position?: "top" | "bottom" | "left" | "right";
  /** Delay before showing (ms) */
  delay?: number;
  children: React.ReactElement;
};

function Tooltip({
  content,
  position = "top",
  delay = 200,
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-2.5 py-1.5 text-xs font-medium rounded-md shadow-md whitespace-nowrap pointer-events-none",
            "bg-[hsl(var(--ui-foreground))] text-[hsl(var(--ui-background))]",
            "animate-in fade-in zoom-in-95 duration-150",
            positionClasses[position]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

Tooltip.displayName = "Tooltip";

export { Tooltip };
