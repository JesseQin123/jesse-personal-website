import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ProfileActionLinkProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly external?: boolean;
  readonly href: string;
  readonly variant?: "primary" | "secondary" | "text";
};

const actionClasses = {
  primary:
    "border border-[hsl(var(--profile-ink))] bg-[hsl(var(--profile-ink))] text-[hsl(var(--profile-ink-inverse))] hover:border-[hsl(var(--profile-accent))] hover:bg-[hsl(var(--profile-accent))] hover:text-[hsl(var(--profile-ink))] [&>svg]:text-[hsl(var(--profile-accent))] hover:[&>svg]:text-[hsl(var(--profile-ink))]",
  secondary:
    "border border-[hsl(var(--profile-border-control))] bg-[hsl(var(--profile-surface-elevated))] text-[hsl(var(--profile-ink))] hover:border-[hsl(var(--profile-accent))] hover:text-[hsl(var(--profile-accent-hover))]",
  text: "px-0 text-[hsl(var(--profile-teal))] hover:text-[hsl(var(--profile-ink))]",
} as const;

export const ProfileActionLink = ({
  children,
  className,
  external = false,
  href,
  variant = "primary",
}: ProfileActionLinkProps) => (
  <a
    className={cn(
      "inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-5 py-3 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--profile-accent))] focus-visible:ring-offset-2",
      actionClasses[variant],
      className,
    )}
    href={href}
    rel={external ? "noopener noreferrer" : undefined}
    target={external ? "_blank" : undefined}
  >
    {children}
    {external ? <ArrowUpRight aria-hidden="true" className="h-4 w-4" /> : <ArrowRight aria-hidden="true" className="h-4 w-4" />}
  </a>
);

type SectionIntroProps = {
  readonly body: string;
  readonly eyebrow: string;
  readonly title: string;
};

export const SectionIntro = ({ body, eyebrow, title }: SectionIntroProps) => (
  <div className="max-w-3xl">
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[hsl(var(--profile-teal))]">{eyebrow}</p>
    <h2 className="profile-serif mt-4 text-balance text-4xl leading-[1.05] tracking-[-0.025em] text-[hsl(var(--profile-ink))] lg:text-6xl">
      {title}
    </h2>
    <p className="mt-5 max-w-[68ch] text-pretty text-base leading-7 text-[hsl(var(--profile-ink-muted))] lg:text-lg lg:leading-8">
      {body}
    </p>
  </div>
);
