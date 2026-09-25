import { defineField, defineType } from "sanity";

export const videoType = defineType({
  name: "video",
  title: "Vídeo (Instagram)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link do Instagram",
      description: "O player abre no Instagram. Cole o endereço do reel ou do post.",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "cover",
      title: "Capa",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Ordem",
      description: "Menor número aparece primeiro na home e em Vídeos.",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "publishedAt",
      title: "Data",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    { title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "cover" },
  },
});
