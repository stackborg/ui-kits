import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Context ──────────────────────────────────────────────

type DrawerContextValue = {
  isOpen: boolean;
  onClose: () => void;
  side: "left" | "right";
};

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) throw new Error("Drawer sub-components must be used within <Drawer>");
  return ctx;
}

// ── Animation Variants ───────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  right: {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
    exit: { x: "100%", transition: { type: "tween" as const, duration: 0.2, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
  },
  left: {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
    exit: { x: "-100%", transition: { type: "tween" as const, duration: 0.2, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
  },
};

// ── Drawer Root ──────────────────────────────────────────

export type DrawerProps = {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Called when drawer should close */
  onClose: () => void;
  /** Which side the drawer slides from */
  side?: "left" | "right";
  /** Close on backdrop click (default: true) */
  closeOnBackdrop?: boolean;
  /** Close on Escape key (default: true) */
  closeOnEscape?: boolean;
  children: React.ReactNode;
};

/**
 * DrawerRoot uses framer-motion AnimatePresence for smooth
 * enter AND exit transitions. No jarring mount/unmount.
 */
function DrawerRoot({
  isOpen,
  onClose,
  side = "right",
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
}: DrawerProps) {
  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") onClose();
    },
    [closeOnEscape, onClose]
  );

  // Attach/detach escape handler and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <DrawerContext.Provider value={{ isOpen, onClose, side }}>
          <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
            {/* Backdrop — smooth fade with subtle blur */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              onClick={closeOnBackdrop ? onClose : undefined}
              aria-hidden="true"
            />
            {children}
          </div>
        </DrawerContext.Provider>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ── Drawer Content ───────────────────────────────────────

export type DrawerContentProps = {
  /** Additional CSS classes */
  className?: string;
  /** Width of the drawer panel */
  width?: string;
  children?: React.ReactNode;
};

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, width = "24rem", children }, ref) => {
    const { side } = useDrawerContext();
    const variants = panelVariants[side];

    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          "absolute inset-y-0 z-50 flex flex-col bg-[hsl(var(--ui-card))] text-[hsl(var(--ui-card-foreground))] border-[hsl(var(--ui-border))] shadow-2xl",
          side === "right"
            ? "right-0 border-l"
            : "left-0 border-r",
          className
        )}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    );
  }
);
DrawerContent.displayName = "DrawerContent";

// ── Drawer Header ────────────────────────────────────────

export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 py-4 border-b border-[hsl(var(--ui-border))] shrink-0",
        className
      )}
      {...props}
    />
  )
);
DrawerHeader.displayName = "DrawerHeader";

// ── Drawer Title ─────────────────────────────────────────

export type DrawerTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
);
DrawerTitle.displayName = "DrawerTitle";

// ── Drawer Description ───────────────────────────────────

export type DrawerDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[hsl(var(--ui-muted-foreground))] mt-1", className)}
      {...props}
    />
  )
);
DrawerDescription.displayName = "DrawerDescription";

// ── Drawer Body ──────────────────────────────────────────

export type DrawerBodyProps = React.HTMLAttributes<HTMLDivElement>;

const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
      {...props}
    />
  )
);
DrawerBody.displayName = "DrawerBody";

// ── Drawer Footer ────────────────────────────────────────

export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 py-4 border-t border-[hsl(var(--ui-border))] shrink-0 flex items-center justify-end gap-2",
        className
      )}
      {...props}
    />
  )
);
DrawerFooter.displayName = "DrawerFooter";

// ── Drawer Close ─────────────────────────────────────────

export type DrawerCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, ...props }, ref) => {
    const { onClose } = useDrawerContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClose}
        className={cn(
          "absolute top-4 right-4 rounded-md p-1.5 text-[hsl(var(--ui-muted-foreground))] hover:bg-[hsl(var(--ui-accent))] hover:text-[hsl(var(--ui-foreground))] transition-colors cursor-pointer",
          className
        )}
        aria-label="Close"
        {...props}
      >
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
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    );
  }
);
DrawerClose.displayName = "DrawerClose";

// ── Compound Export ──────────────────────────────────────

/**
 * Drawer compound component — slides in from left or right.
 *
 * Features:
 * - Smooth enter AND exit transitions via framer-motion AnimatePresence
 * - Spring-based open, tween-based close
 * - Backdrop fade with subtle blur
 * - Escape key and backdrop click to close
 * - Body scroll lock while open
 *
 * Usage:
 *   <Drawer isOpen={open} onClose={close} side="right">
 *     <Drawer.Content>
 *       <Drawer.Close />
 *       <Drawer.Header>
 *         <Drawer.Title>Title</Drawer.Title>
 *       </Drawer.Header>
 *       <Drawer.Body>Content</Drawer.Body>
 *       <Drawer.Footer>Actions</Drawer.Footer>
 *     </Drawer.Content>
 *   </Drawer>
 */
const Drawer = Object.assign(DrawerRoot, {
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Close: DrawerClose,
});

export { Drawer, useDrawerContext };
