import { defineField, defineType } from "sanity";
import { placeName, placeOptions } from "../../lib/places";
import { portableBody } from "./portableBody";

export const newsType = defineType({
  name: "news",
  title: "Notícia",
  type: "document",
  groups: [
    { name: "conteudo", title: "Conteúdo", default: true },
    { name: "publicacao", title: "Onde aparece" },
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
      description: "Gera o link /noticias/...",
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
      description:
        "Texto da matéria. Use o botão de imagem para inserir e posicionar as fotos no meio do texto.",
      group: "conteudo",
      validation: (rule) => rule.required().min(1),
      ...portableBody,
    }),
    defineField({
      name: "category",
      title: "Categoria",
      description:
        "Escolha uma categoria cadastrada. Crie nomes novos em Conteúdo → Categorias.",
      type: "reference",
      group: "publicacao",
      to: [{ type: "category" }],
      options: { disableNew: false },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "place",
      title: "Página / editoria",
      description:
        "Define a página da matéria: /mundo, /brasil, /bastidores ou a cidade em /cidades. A listagem Cidades junta Brasília, São Paulo e Rio.",
      type: "string",
      group: "publicacao",
      options: { list: [...placeOptions], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Autor interno",
      type: "string",
      group: "publicacao",
      initialValue: "Equipe Corredor 61",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      description: "Data no futuro agenda a matéria. Rascunho fica no botão Rascunho.",
      type: "datetime",
      group: "publicacao",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Destaque na home",
      description: "Coloca a notícia no carrossel principal da página inicial.",
      type: "boolean",
      group: "publicacao",
      initialValue: false,
    }),
    defineField({
      name: "cover",
      title: "Imagem de capa",
      description:
        "Só no hero da matéria, nos cards e no preview do WhatsApp. Não se repete no texto. Fotos do corpo entram no campo Corpo.",
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
      category: "category.name",
      place: "place",
      media: "cover",
    },
    prepare({ title, category, place, media }) {
      const bits = [category, placeName(place)].filter(Boolean);
      return { title, subtitle: bits.join(" · "), media };
    },
  },
});
