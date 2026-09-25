import { defineArrayMember, defineField } from "sanity";

export const portableBody = {
  type: "array" as const,
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Subtítulo", value: "h2" },
        { title: "Citação", value: "blockquote" },
      ],
      lists: [
        { title: "Lista", value: "bullet" },
        { title: "Lista numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrito", value: "strong" },
          { title: "Itálico", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
};
