import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// ── Context ──────────────────────────────────────────────

type ModalContextValue = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalContext = React.createContext<ModalContextValue | null>(null);

function useModalContext() {
  const ctx = React.useContext(ModalContext);
  if (!ctx) throw new Error("Modal sub-components must be used within <Modal>");
  return ctx;
}

// ── Modal Root ───────────────────────────────────────────

export type ModalProps = {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when modal should close */
  onClose: () => void;
  /** Close on backdrop click (default: true) */
  closeOnBackdrop?: boolean;
  /** Close on Escape key (default: true) */
  closeOnEscape?: boolean;
  children: React.ReactNode;
};

function ModalRoot({
  isOpen,
  onClose,
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnBackdrop && e.target === overlayRef.current) {
        onClose();
      }
    },
    [closeOnBackdrop, onClose]
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

  if (!isOpen) return null;

  return createPortal(
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div
        ref={overlayRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

// ── Modal Content ────────────────────────────────────────

export type ModalContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Max width class */
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
};

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, size = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-full mx-4 rounded-xl border border-[hsl(var(--ui-border))] bg-[hsl(var(--ui-card))] text-[hsl(var(--ui-card-foreground))] shadow-xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-200",
        sizeMap[size],
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  )
);
ModalContent.displayName = "ModalContent";

// ── Modal Header ─────────────────────────────────────────

export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pt-6 pb-2", className)}
      {...props}
    />
  )
);
ModalHeader.displayName = "ModalHeader";

// ── Modal Title ──────────────────────────────────────────

export type ModalTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
);
ModalTitle.displayName = "ModalTitle";

// ── Modal Description ────────────────────────────────────

export type ModalDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[hsl(var(--ui-muted-foreground))] mt-1", className)}
      {...props}
    />
  )
);
ModalDescription.displayName = "ModalDescription";

// ── Modal Body ───────────────────────────────────────────

export type ModalBodyProps = React.HTMLAttributes<HTMLDivElement>;

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    />
  )
);
ModalBody.displayName = "ModalBody";

// ── Modal Footer ─────────────────────────────────────────

export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>;

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pb-6 pt-2 flex items-center justify-end gap-2", className)}
      {...props}
    />
  )
);
ModalFooter.displayName = "ModalFooter";

// ── Modal Close ──────────────────────────────────────────

export type ModalCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ModalClose = React.forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, ...props }, ref) => {
    const { onClose } = useModalContext();

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
ModalClose.displayName = "ModalClose";

// ── Compound Export ──────────────────────────────────────

const Modal = Object.assign(ModalRoot, {
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
});

export { Modal, useModalContext };
