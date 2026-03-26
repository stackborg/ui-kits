import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[hsl(var(--ui-muted))] text-[hsl(var(--ui-muted-foreground))] font-medium select-none shrink-0",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof avatarVariants> & {
    /** Image URL */
    src?: string;
    /** Alt text for image */
    alt?: string;
    /** Initials to show when no image (max 2 chars) */
    initials?: string;
    /** Fallback icon when no image and no initials */
    fallback?: React.ReactNode;
  };

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, initials, fallback, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;

    // Extract max 2 chars for initials
    const displayInitials = initials?.slice(0, 2).toUpperCase();

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || ""}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : displayInitials ? (
          <span aria-label={alt || displayInitials}>{displayInitials}</span>
        ) : fallback ? (
          fallback
        ) : (
          // Default user icon fallback
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60%"
            height="60%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
