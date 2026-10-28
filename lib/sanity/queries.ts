import { defineQuery } from "next-sanity";

// Images are projected to { url, fileId, alt } so the existing components
// keep the same shape they had with Webflow.
const imageProjection = /* groq */ `{
  "url": asset->url,
  "fileId": asset._ref,
  alt
}`;

export const GALLERY_IMAGES_QUERY = defineQuery(`
  *[_type == "galleryAlbum"] | order(_createdAt asc).images[]{
    "id": _key,
    ...${imageProjection}
  }
`);

export const DAM_EDITIONS_QUERY = defineQuery(`
  *[_type == "damEdition"] | order(year desc){
    _id,
    year,
    "slug": slug.current,
    "images": winnerPhotos[]{
      "id": _key,
      ...${imageProjection}
    }
  }
`);

export const JUDGES_QUERY = defineQuery(`
  *[_type == "judge"] | order(year desc, name asc){
    _id,
    name,
    year,
    "category": select(
      category == "dance" => "Dance",
      category == "music" => "Music",
      category == "art" => "Art"
    ),
    "image": photo${imageProjection}
  }
`);

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(orderRank asc, fullName asc){
    "name": fullName,
    ...photo${imageProjection}
  }
`);

export const SPONSOR_LOGOS_QUERY = defineQuery(`
  *[_type == "sponsor"] | order(orderRank asc, name asc){
    "url": logo.asset->url,
    "fileId": logo.asset._ref,
    "alt": coalesce(logo.alt, name)
  }
`);

export const PATRONS_QUERY = defineQuery(`
  *[_type == "patron"] | order(_createdAt asc){
    name,
    "slug": slug.current,
    "about": coalesce(about, []),
    "patreonImage": photo${imageProjection}
  }
`);
