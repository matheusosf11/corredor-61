import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "corredor-61",
  title: "Corredor 61",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: "news-by-place",
        title: "Notícia nesta editoria",
        schemaType: "news",
        parameters: [{ name: "place", type: "string" }],
        value: (params: { place?: string }) => ({ place: params.place }),
      },
    ],
  },
});
