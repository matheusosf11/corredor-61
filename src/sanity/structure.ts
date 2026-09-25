import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { cities } from "../lib/places";

const citySlugs = cities.map((city) => city.slug);

function newsInPlace(S: StructureBuilder, place: string, title: string) {
  return S.documentList()
    .title(title)
    .schemaType("news")
    .filter("_type == \"news\" && place == $place")
    .params({ place })
    .child(S.document().schemaType("news"))
    .initialValueTemplates([
      S.initialValueTemplateItem("news-by-place", { place }),
    ]);
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Sobre Nós")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.divider(),
      S.documentTypeListItem("news").title("Todas as notícias"),
      S.listItem()
        .title("Editorias")
        .id("editorias")
        .child(
          S.list()
            .title("Editorias")
            .items([
              S.listItem()
                .title("Mundo")
                .id("place-mundo")
                .child(newsInPlace(S, "mundo", "Mundo")),
              S.listItem()
                .title("Brasil")
                .id("place-brasil")
                .child(newsInPlace(S, "brasil", "Brasil")),
              S.listItem()
                .title("Bastidores")
                .id("place-bastidores")
                .child(newsInPlace(S, "bastidores", "Bastidores")),
              S.listItem()
                .title("Cidades")
                .id("place-cidades")
                .child(
                  S.list()
                    .title("Cidades")
                    .items([
                      S.listItem()
                        .title("Todas")
                        .id("place-cidades-todas")
                        .child(
                          S.documentList()
                            .title("Cidades")
                            .schemaType("news")
                            .filter("_type == \"news\" && place in $places")
                            .params({ places: citySlugs }),
                        ),
                      ...cities.map((city) =>
                        S.listItem()
                          .title(city.name)
                          .id(`place-${city.slug}`)
                          .child(newsInPlace(S, city.slug, city.name)),
                      ),
                    ]),
                ),
            ]),
        ),
      S.documentTypeListItem("article").title("Artigos"),
      S.documentTypeListItem("category").title("Categorias"),
      S.documentTypeListItem("author").title("Autores"),
      S.documentTypeListItem("video").title("Vídeos"),
      S.documentTypeListItem("supporter").title("Apoiadores"),
    ]);
