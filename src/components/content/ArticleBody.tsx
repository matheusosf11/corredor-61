import type { PortableTextBlock, PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/image";
import type { BodyBlock, ContentBody } from "@/lib/types";

function isSeedBody(blocks: ContentBody): blocks is BodyBlock[] {
  const first = blocks[0];
  return Boolean(
    first &&
      typeof first === "object" &&
      "type" in first &&
      !("_type" in first),
  );
}

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      if (!href) return <>{children}</>;
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const alt = typeof value.alt === "string" ? value.alt : "";
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={urlFor(value).width(1400).url()} alt={alt} />
          {alt ? <figcaption>{alt}</figcaption> : null}
        </figure>
      );
    },
  },
};

export function ArticleBody({ blocks }: { blocks: ContentBody }) {
  if (!blocks?.length) return null;

  if (isSeedBody(blocks)) {
    return (
      <div className="article-prose">
        {blocks.map((block, index) => {
          if (block.type === "h2") {
            return <h2 key={index}>{block.text}</h2>;
          }
          if (block.type === "ul") {
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return <p key={index}>{block.text}</p>;
        })}
      </div>
    );
  }

  return (
    <div className="article-prose">
      <PortableText
        value={blocks as PortableTextBlock[]}
        components={portableComponents}
      />
    </div>
  );
}
