type Props = {
  initials: string;
  size?: number;
  onDark?: boolean;
  className?: string;
  photoUrl?: string;
  name?: string;
};

/** Avatar circular — foto do CMS, ou iniciais como fallback. */
export function AuthorMark({
  initials,
  size = 40,
  onDark = false,
  className = "",
  photoUrl,
  name,
}: Props) {
  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={name ? `Foto de ${name}` : ""}
        width={size}
        height={size}
        className={`inline-block shrink-0 rounded-full object-cover object-top ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.32) }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-sans font-bold ${
        onDark ? "border border-gold/40 bg-navy text-gold" : "bg-navy text-gold"
      } ${className}`}
    >
      {initials}
    </span>
  );
}
