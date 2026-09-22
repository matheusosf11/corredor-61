const live = `defined(publishedAt) && publishedAt <= now()`;

const cover = `
  "cover": {
    "alt": coalesce(cover.alt, title),
    "motif": coalesce(category, "institucional"),
    "image": cover.asset->url
  }
`;

export const newsQuery = `*[_type == "news" && defined(slug.current) && ${live}] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  dek,
  body,
  ${cover},
  authorName,
  category,
  place,
  publishedAt,
  "status": "published",
  featured
}`;

export const newsBySlugQuery = `*[_type == "news" && slug.current == $slug && ${live}][0] {
  "slug": slug.current,
  title,
  dek,
  body,
  ${cover},
  authorName,
  category,
  place,
  publishedAt,
  "status": "published",
  featured
}`;

export const articlesQuery = `*[_type == "article" && defined(slug.current) && defined(author) && ${live}] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  dek,
  body,
  ${cover},
  "authorSlug": author->slug.current,
  category,
  publishedAt,
  "status": "published"
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug && defined(author) && ${live}][0] {
  "slug": slug.current,
  title,
  dek,
  body,
  ${cover},
  "authorSlug": author->slug.current,
  category,
  publishedAt,
  "status": "published"
}`;

export const authorsQuery = `*[_type == "author" && defined(slug.current)] | order(name asc) {
  "slug": slug.current,
  name,
  role,
  bio,
  active,
  "photoUrl": photo.asset->url
}`;

export const supportersQuery = `*[_type == "supporter" && active == true] | order(order asc) {
  "slug": _id,
  name,
  shortName,
  url,
  order,
  active,
  "logoUrl": logo.asset->url
}`;

export const aboutQuery = `*[_type == "about" && _id == "about"][0] {
  title,
  proposal,
  objectives,
  people[] {
    name,
    role,
    bio,
    "photoUrl": photo.asset->url
  }
}`;

export const searchQuery = `*[_type in ["news", "article"] && defined(slug.current) && ${live} && (
  title match $term ||
  dek match $term ||
  pt::text(body) match $term
)] | order(publishedAt desc) {
  _type,
  "slug": slug.current,
  title,
  dek
}`;
