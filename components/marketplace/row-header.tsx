import Link from "next/link";

interface Props {
  title: string;
  subtitle?: string;
  href?: string;
  action?: string;
  className?: string;
}

export function RowHeader({ title, subtitle, href, action = "See all", className = "" }: Props) {
  return (
    <div className={`flex justify-between items-baseline px-4 mb-3 ${className}`}>
      <div>
        <div className="text-lg font-extrabold tracking-tightest">{title}</div>
        {subtitle && <div className="text-xs text-muted mt-0.5">{subtitle}</div>}
      </div>
      {href ? (
        <Link href={href} className="text-[13px] font-semibold text-ink">
          {action}
        </Link>
      ) : action ? (
        <span className="text-[13px] font-semibold text-ink">{action}</span>
      ) : null}
    </div>
  );
}
