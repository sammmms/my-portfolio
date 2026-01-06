import { ButtonHTMLAttributes, forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { MoveRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string; // Add target prop
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      href,
      variant = "solid",
      size = "md",
      children,
      target,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-transform active:scale-95 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      solid:
        "bg-black text-white hover:scale-105 dark:bg-white dark:text-black",
      outline:
        "border border-neutral-200 bg-transparent hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-white",
      ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-12 px-8 text-lg",
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          target={target} // Pass target
          ref={ref as any}
        >
          {children}
        </Link>
      );
    }

    return (
      <button className={combinedClassName} ref={ref as any} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
