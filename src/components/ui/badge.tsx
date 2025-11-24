import * as React from "react";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const badgeVariants = {
  default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
  destructive: "border-transparent bg-destructive text-white hover:bg-destructive/90",
  outline: "text-foreground hover:bg-accent hover:text-accent-foreground",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

function Badge({
  className = "",
  variant = "default",
  ...props
}: BadgeProps) {
  const variantClass = badgeVariants[variant];
  
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap transition-colors ${variantClass} ${className}`}
      {...props}
    />
  );
}

export { Badge };
