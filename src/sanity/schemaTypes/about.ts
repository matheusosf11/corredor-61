import { defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "Sobre Nós",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      initialValue: "Sobre Nós",
    }),
    defineField({
      name: "proposal",
      title: "Proposta",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "objectives",
      title: "Objetivos",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "people",
      title: "Quem faz",
      type: "array",
      of: [
        defineField({
          name: "person",
          title: "Pessoa",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nome", type: "string" }),
            defineField({ name: "role", title: "Função", type: "string" }),
            defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
            defineField({
              name: "photo",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        }),
      ],
    }),
  ],
});
