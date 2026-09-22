import { defineArrayMember, defineField, defineType } from "sanity";
import { placeOptions } from "../../lib/places";
import { categoryOptions } from "./categoryOptions";

export const newsType = defineType({
  name: "news",
  title: "Notícia",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dek",
      title: "Linha fina / chamada",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Imagem de capa",
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
      name: "authorName",
      title: "Autor interno",
      type: "string",
      initialValue: "Equipe Corredor 61",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: categoryOptions, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "place",
      title: "Onde aparece",
      description:
        "Mundo, Brasil ou uma cidade. É essa escolha que coloca a notícia na aba correspondente do menu.",
      type: "string",
      options: { list: [...placeOptions] },
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Destaque na home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Corpo",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Subtítulo", value: "h2" },
            { title: "Citação", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
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
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "cover",
    },
  },
});
