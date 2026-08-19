export function BrandlyMark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="7" fill="var(--accent-terracotta)" />
      <path
        d="M7 17c-.6-5.5 3-9.5 9.5-10 .6 5.7-3 9.6-9.5 10Z"
        fill="none"
        stroke="#FBF3EE"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7.3 16.7 13.5 10.5" stroke="#FBF3EE" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
