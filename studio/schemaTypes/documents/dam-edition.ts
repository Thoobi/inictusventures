import { defineArrayMember, defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { webflowIdField } from "../shared/webflow-id-field";

export const damEdition = defineType({
  name: "damEdition",
  title: "DAM edition",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "year",
      type: "string",
      description: 'Label shown on the gallery, e.g. "2025".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "year" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "winnerPhotos",
      title: "Winner photos",
      type: "array",
      of: [defineArrayMember({ type: "altImage" })],
      options: { layout: "grid" },
    }),
    webflowIdField,
  ],
  orderings: [
    {
      title: "Year, newest first",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "year", media: "winnerPhotos.0" },
  },
});
