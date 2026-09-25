import { defineField, defineType } from "sanity";
import { about } from "../../lib/data";

export const aboutType = defineType({
  name: "about",
  title: "Sobre Nós",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      initialValue: about.title,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "proposal",
      title: "Proposta",
      description: "Primeiro parágrafo, logo abaixo do título em /sobre.",
      type: "text",
      rows: 6,
      initialValue: about.proposal,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introdução",
      description: "Parágrafos seguintes, antes de Objetivos.",
      type: "array",
      of: [{ type: "text" }],
      initialValue: about.intro,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "objectives",
      title: "Objetivos",
      description: 'Use "Rótulo: texto" para o título em negrito (Informar, Analisar…).',
      type: "array",
      of: [{ type: "text" }],
      initialValue: about.objectives,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "whoMakes",
      title: "Quem faz",
      description: "Parágrafos da seção Quem faz, antes das fotos da equipe.",
      type: "array",
      of: [{ type: "text" }],
      initialValue: about.whoMakes,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "people",
      title: "Equipe",
      type: "array",
      of: [
        defineField({
          name: "person",
          title: "Pessoa",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nome",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "role", title: "Função", type: "string" }),
            defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
            defineField({
              name: "photo",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "photo" },
          },
        }),
      ],
    }),
  ],
});
