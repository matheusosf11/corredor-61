import type { Metadata } from "next";
import { metadata as studioMetadata, viewport } from "next-sanity/studio";
import Studio from "./Studio";

export const dynamic = "force-static";

export { viewport };

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Estúdio · Corredor 61",
};

export default function StudioPage() {
  return <Studio />;
}
