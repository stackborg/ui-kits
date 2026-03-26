import React from "react";
import { cn } from "@/lib/utils";

// ── Card Root ────────────────────────────────────────────

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Add hover elevation effect */
  hoverable?: boolean;
  /** Make the card clickable */
  clickable?: boolean;
};

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable, clickable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-[hsl(var(--ui-border))] bg-[hsl(var(--ui-card))] text-[hsl(var(--ui-card-foreground))] shadow-sm transition-all duration-200",
          hoverable && "hover:shadow-md hover:-translate-y-0.5",
          clickable && "cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);
CardRoot.displayName = "Card";

// ── Card Header ──────────────────────────────────────────

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pt-6 pb-2", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// ── Card Title ───────────────────────────────────────────

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// ── Card Description ─────────────────────────────────────

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[hsl(var(--ui-muted-foreground))] mt-1", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

// ── Card Body ────────────────────────────────────────────

export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    />
  )
);
CardBody.displayName = "CardBody";

// ── Card Footer ──────────────────────────────────────────

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 pb-6 pt-2 flex items-center gap-2",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// ── Compound Export ──────────────────────────────────────

/**
 * Card compound component.
 *
 * Usage:
 *   <Card>
 *     <Card.Header>
 *       <Card.Title>Title</Card.Title>
 *       <Card.Description>Description</Card.Description>
 *     </Card.Header>
 *     <Card.Body>Content</Card.Body>
 *     <Card.Footer>Actions</Card.Footer>
 *   </Card>
 */
const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});

export { Card };
