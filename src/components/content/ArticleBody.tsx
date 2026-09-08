import type { BodyBlock } from "@/lib/types";

export function ArticleBody({ blocks }: { blocks: BodyBlock[] }) {
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
