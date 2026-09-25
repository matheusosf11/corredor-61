import { defineField, defineType } from "sanity";
import { portableBody } from "./portableBody";

export const articleType = defineType({
  name: "article",
  title: "Artigo",
  type: "document",
  groups: [
    { name: "conteudo", title: "Conteúdo", default: true },
    { name: "publicacao", title: "Publicação" },
    { name: "midia", title: "Capa" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "conteudo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Endereço",
      description: "Gera o link /artigos/...",
      type: "slug",
      group: "conteudo",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dek",
      title: "Linha fina / chamada",
      type: "text",
      group: "conteudo",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Corpo",
      group: "conteudo",
      validation: (rule) => rule.required().min(1),
      ...portableBody,
    }),
    defineField({
      name: "author",
      title: "Autor / colunista",
      description: "Obrigatório. Aparece no hero, em Ver perfil e na coluna da home.",
      type: "reference",
      group: "publicacao",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      description:
        "Opcional. Se vazia, o site mostra Opinião. Crie nomes novos em Categorias.",
      type: "reference",
      group: "publicacao",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      group: "publicacao",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Imagem de capa",
      description: "Usada nos cards, no artigo e no preview do WhatsApp.",
      type: "image",
      group: "midia",
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author.name",
      media: "cover",
    },
  },
});
