import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      description: "Como aparece no menu, nas abas de /noticias e nos cards.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Endereço",
      description: "Gera /noticias?categoria=... Gerado a partir do nome.",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      description: "Menor número aparece primeiro nas abas.",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "active",
      title: "Ativa",
      description: "Desmarque para esconder do site sem apagar as matérias.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
});
