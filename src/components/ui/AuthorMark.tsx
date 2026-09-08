type Props = {
  initials: string;
  size?: number;
  onDark?: boolean;
  className?: string;
};

/** Avatar circular com iniciais — placeholder de foto de autor. */
export function AuthorMark({
  initials,
  size = 40,
  onDark = false,
  className = "",
}: Props) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.32) }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-sans font-bold ${
        onDark
          ? "border border-gold/40 bg-navy text-gold"
          : "bg-navy text-gold"
      } ${className}`}
    >
      {initials}
    </span>
  );
}
