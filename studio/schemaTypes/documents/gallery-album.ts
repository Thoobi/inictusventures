import { defineArrayMember, defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons/Images";
import { webflowIdField } from "../shared/webflow-id-field";

export const galleryAlbum = defineType({
  name: "galleryAlbum",
  title: "Gallery album",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      type: "array",
      of: [defineArrayMember({ type: "altImage" })],
      options: { layout: "grid" },
    }),
    webflowIdField,
  ],
  preview: {
    select: { title: "title", media: "images.0" },
  },
});
