import React, { useState } from "react";
import { cn } from "@/lib/utils";

// ── Context ──────────────────────────────────────────────

type TabsContextValue = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs sub-components must be used within <Tabs>");
  return ctx;
}

// ── Tabs Root ────────────────────────────────────────────

export type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Default active tab value (uncontrolled) */
  defaultValue: string;
  /** Controlled active tab */
  value?: string;
  /** Called when active tab changes */
  onValueChange?: (value: string) => void;
};

function TabsRoot({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeTab = isControlled ? controlledValue : internalValue;

  const setActiveTab = (v: string) => {
    if (!isControlled) setInternalValue(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ── Tab List ─────────────────────────────────────────────

export type TabListProps = React.HTMLAttributes<HTMLDivElement>;

const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        "flex border-b border-[hsl(var(--ui-border))]",
        className
      )}
      {...props}
    />
  )
);
TabList.displayName = "TabList";

// ── Tab Trigger ──────────────────────────────────────────

export type TabTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Unique value identifying this tab */
  value: string;
};

const TabTrigger = React.forwardRef<HTMLButtonElement, TabTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        onClick={() => setActiveTab(value)}
        className={cn(
          "px-4 py-2.5 text-sm font-medium transition-all -mb-px cursor-pointer",
          "border-b-2 border-transparent",
          isActive
            ? "border-[hsl(var(--ui-primary))] text-[hsl(var(--ui-foreground))]"
            : "text-[hsl(var(--ui-muted-foreground))] hover:text-[hsl(var(--ui-foreground))] hover:border-[hsl(var(--ui-border))]",
          className
        )}
        {...props}
      />
    );
  }
);
TabTrigger.displayName = "TabTrigger";

// ── Tab Content ──────────────────────────────────────────

export type TabContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Must match a TabTrigger value */
  value: string;
};

const TabContent = React.forwardRef<HTMLDivElement, TabContentProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    if (activeTab !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn("pt-4 animate-in fade-in duration-200", className)}
        {...props}
      />
    );
  }
);
TabContent.displayName = "TabContent";

// ── Compound Export ──────────────────────────────────────

const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Trigger: TabTrigger,
  Content: TabContent,
});

export { Tabs };
