import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// ── Context ──────────────────────────────────────────────

type DropdownContextValue = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) throw new Error("Dropdown sub-components must be used within <Dropdown>");
  return ctx;
}

// ── Dropdown Root ────────────────────────────────────────

export type DropdownProps = {
  children: React.ReactNode;
};

function DropdownRoot({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, close]);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={rootRef} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// ── Dropdown Trigger ─────────────────────────────────────

export type DropdownTriggerProps = {
  children: React.ReactElement;
};

function DropdownTrigger({ children }: DropdownTriggerProps) {
  const { toggle } = useDropdownContext();
  return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, { onClick: toggle });
}

// ── Dropdown Menu ────────────────────────────────────────

export type DropdownMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Alignment of the dropdown */
  align?: "start" | "end";
};

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, align = "start", ...props }, ref) => {
    const { isOpen } = useDropdownContext();
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 mt-1 min-w-44 rounded-lg border border-[hsl(var(--ui-border))] bg-[hsl(var(--ui-card))] p-1 shadow-lg",
          "animate-in fade-in slide-in-from-top-1 duration-150",
          align === "end" ? "right-0" : "left-0",
          className
        )}
        role="menu"
        {...props}
      />
    );
  }
);
DropdownMenu.displayName = "DropdownMenu";

// ── Dropdown Item ────────────────────────────────────────

export type DropdownItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Show destructive styling */
  destructive?: boolean;
};

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, destructive, onClick, ...props }, ref) => {
    const { close } = useDropdownContext();

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        className={cn(
          "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer text-left",
          destructive
            ? "text-[hsl(var(--ui-destructive))] hover:bg-[hsl(var(--ui-destructive)/0.1)]"
            : "text-[hsl(var(--ui-foreground))] hover:bg-[hsl(var(--ui-accent))]",
          className
        )}
        onClick={(e) => {
          onClick?.(e);
          close();
        }}
        {...props}
      />
    );
  }
);
DropdownItem.displayName = "DropdownItem";

// ── Dropdown Separator ───────────────────────────────────

function DropdownSeparator() {
  return <div className="h-px my-1 bg-[hsl(var(--ui-border))]" role="separator" />;
}

// ── Compound Export ──────────────────────────────────────

const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
  Separator: DropdownSeparator,
});

export { Dropdown };
