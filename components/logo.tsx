/** A coffee bean inside a round roaster's stamp, used beside the business name. Decorative. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg className={`size-9 flex-none ${className}`} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="18.5" fill="var(--accent)" />
      <circle cx="20" cy="20" r="15.2" fill="none" stroke="var(--on-accent)" strokeWidth="1" strokeDasharray="2 2.2" opacity=".7" />
      <ellipse cx="20" cy="20" rx="7" ry="10" transform="rotate(30 20 20)" fill="var(--on-accent)" />
      <path d="M16.6 12.6c4.6 3.6.2 10.4 6.8 14.8" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
