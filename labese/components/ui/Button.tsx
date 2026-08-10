import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "on-dark";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-forest text-white hover:bg-forest-dark border border-forest",
  secondary:
    "bg-white text-navy border border-navy/20 hover:border-navy hover:bg-navy/5",
  ghost: "bg-transparent text-forest border border-forest/30 hover:bg-forest-light",
  "on-dark":
    "bg-sand text-navy border border-sand hover:bg-sand-dark hover:border-sand-dark",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  showArrow?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className, showArrow = true } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-150",
    variantClasses[variant],
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
        {showArrow && <ArrowRight size={16} aria-hidden="true" />}
      </Link>
    );
  }

  return (
    <button
      type={(props as ButtonAsButton).type ?? "button"}
      onClick={(props as ButtonAsButton).onClick}
      className={classes}
    >
      {children}
      {showArrow && <ArrowRight size={16} aria-hidden="true" />}
    </button>
  );
}
