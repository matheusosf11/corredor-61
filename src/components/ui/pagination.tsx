"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const paginationVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "gap-1",
      compact: "gap-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const paginationItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default:
          "rounded-ele h-9 w-9 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        outline:
          "rounded-ele h-9 w-9 border border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        ghost:
          "rounded-ele h-9 w-9 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
      },
      size: {
        default: "h-9 w-9",
        sm: "h-8 w-8 text-xs",
        lg: "h-10 w-10",
      },
      state: {
        default: "",
        active:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus-visible:ring-ring",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

const paginationNavVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-ele px-3 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
  {
    variants: {
      size: {
        default: "h-9",
        sm: "h-8 text-xs px-2",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {}

export interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationItemVariants> {
  isActive?: boolean;
}

export interface PaginationNavProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationNavVariants> {}

export type PaginationEllipsisProps = React.HTMLAttributes<HTMLSpanElement>;

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, variant, ...props }, ref) => (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(paginationVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  )
);
Pagination.displayName = "Pagination";

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, variant, size, state, isActive, ...props }, ref) => (
    <button
      className={cn(
        paginationItemVariants({
          variant,
          size,
          state: isActive ? "active" : state,
          className,
        })
      )}
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      {...props}
    />
  )
);
PaginationItem.displayName = "PaginationItem";

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationNavProps
>(({ className, size, children, ...props }, ref) => (
  <button
    className={cn(paginationNavVariants({ size, className }))}
    ref={ref}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    {children || "Previous"}
  </button>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNavProps>(
  ({ className, size, children, ...props }, ref) => (
    <button
      className={cn(paginationNavVariants({ size, className }))}
      ref={ref}
      {...props}
    >
      {children || "Next"}
      <ChevronRight className="h-4 w-4" />
    </button>
  )
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    className={cn(
      "inline-flex items-center justify-center h-9 w-9 text-muted-foreground",
      className
    )}
    ref={ref}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">Mais páginas</span>
  </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

/* ---------- Versões em link (navegação por URL) ---------- */

type LinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  /** Sem href, o controle é renderizado desabilitado. */
  href?: string;
};

export type PaginationLinkProps = LinkProps &
  VariantProps<typeof paginationItemVariants> & {
    isActive?: boolean;
  };

export type PaginationNavLinkProps = LinkProps &
  VariantProps<typeof paginationNavVariants>;

const disabledLink = "pointer-events-none opacity-50";

function PaginationLink({
  className,
  variant,
  size,
  state,
  isActive,
  href,
  ...props
}: PaginationLinkProps) {
  const classes = cn(
    paginationItemVariants({
      variant,
      size,
      state: isActive ? "active" : state,
      className,
    })
  );
  if (isActive || !href) {
    return (
      <span
        className={classes}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={isActive ? undefined : true}
      >
        {props.children}
      </span>
    );
  }
  return <Link href={href} className={classes} {...props} />;
}

function PaginationPreviousLink({
  className,
  size,
  href,
  children,
  ...props
}: PaginationNavLinkProps) {
  const content = (
    <>
      <ChevronLeft className="h-4 w-4" />
      {children || "Previous"}
    </>
  );
  const classes = cn(paginationNavVariants({ size, className }));
  if (!href) {
    return (
      <span className={cn(classes, disabledLink)} aria-disabled>
        {content}
      </span>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}

function PaginationNextLink({
  className,
  size,
  href,
  children,
  ...props
}: PaginationNavLinkProps) {
  const content = (
    <>
      {children || "Next"}
      <ChevronRight className="h-4 w-4" />
    </>
  );
  const classes = cn(paginationNavVariants({ size, className }));
  if (!href) {
    return (
      <span className={cn(classes, disabledLink)} aria-disabled>
        {content}
      </span>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}

export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
  PaginationPreviousLink,
  PaginationNextLink,
  paginationVariants,
  paginationItemVariants,
  paginationNavVariants,
};
