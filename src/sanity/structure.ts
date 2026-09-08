import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Sobre Nós")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.divider(),
      S.documentTypeListItem("news").title("Notícias"),
      S.documentTypeListItem("article").title("Artigos"),
      S.documentTypeListItem("author").title("Autores"),
      S.documentTypeListItem("supporter").title("Apoiadores"),
    ]);
