import { cn } from "@/lib/utils";
import { useReveal, type RevealOptions } from "@/hooks/use-reveal";
import type { ElementType, ReactNode } from "react";

interface RevealProps extends RevealOptions {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Mark this element as a staggered child of a parent <Reveal>. */
  item?: boolean;
  id?: string;
  "aria-labelledby"?: string;
}

/**
 * Declarative wrapper around the shared reveal system.
 * <Reveal variant="blur" stagger={0.1}> with <Reveal item> children
 * gives a coordinated, staggered entrance.
 */
export const Reveal = ({
  children,
  className,
  as: Tag = "div",
  item = false,
  variant,
  delay,
  stagger,
  start,
  once,
  immediate,
  enabled,
  ...rest
}: RevealProps) => {
  const ref = useReveal<HTMLElement>({
    variant,
    delay,
    stagger,
    start,
    once,
    immediate,
    // A child item is driven by its parent timeline, not its own trigger.
    enabled: item ? false : enabled,
  });

  return (
    <Tag
      ref={ref as never}
      className={cn("will-change-transform", className)}
      {...(item ? { "data-reveal-item": "" } : {})}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/** Overflow-hidden wrapper for mask reveals (text lines, media edges). */
export const MaskFrame = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("block overflow-hidden", className)}>{children}</span>
);
