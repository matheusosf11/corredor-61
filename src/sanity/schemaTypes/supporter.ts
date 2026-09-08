import { defineField, defineType } from "sanity";

export const supporterType = defineType({
  name: "supporter",
  title: "Apoiador institucional",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Sigla",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      title: "Site (opcional)",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "active",
      title: "Ativo",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "shortName", media: "logo" },
  },
});
