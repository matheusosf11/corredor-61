import type { ReactNode } from "react";

function tokenize(text: string) {
  return text.split(/(\s+)/).filter((token) => token.length > 0);
}

export function RevealHeading({
  as: Tag = "h1",
  children,
  className,
  prefix,
}: {
  as?: "h1" | "h2";
  children: string;
  className?: string;
  prefix?: ReactNode;
}) {
  const tokens = tokenize(children);
  const label = prefix ? `${children}` : children;
  return (
    <Tag className={className} aria-label={label}>
      {prefix}
      {tokens.map((token, index) =>
        /^\s+$/.test(token) ? (
          <span key={`s-${index}`}>{token}</span>
        ) : (
          <span key={`w-${index}`} className="t-construct-word">
            <span className="t-construct-word-inner">{token}</span>
          </span>
        ),
      )}
    </Tag>
  );
}
