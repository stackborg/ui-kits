import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "bg-[hsl(var(--ui-muted))]",
  {
    variants: {
      variant: {
        text: "h-4 w-full rounded-md",
        circle: "rounded-full",
        rectangle: "rounded-lg",
      },
      animate: {
        pulse: "animate-pulse",
        none: "",
      },
    },
    defaultVariants: {
      variant: "text",
      animate: "pulse",
    },
  }
);

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof skeletonVariants> & {
    /** Width — accepts any CSS value */
    width?: string | number;
    /** Height — accepts any CSS value */
    height?: string | number;
  };

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, animate, width, height, style, ...props }, ref) => {
    const sizeStyle: React.CSSProperties = {
      ...style,
      ...(width !== undefined && { width: typeof width === "number" ? `${width}px` : width }),
      ...(height !== undefined && { height: typeof height === "number" ? `${height}px` : height }),
    };

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, animate }), className)}
        style={sizeStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
