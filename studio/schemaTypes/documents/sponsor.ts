import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons/Star";
import { webflowIdField } from "../shared/webflow-id-field";

// Webflow stored every sponsor logo in a single item's multi-image field.
// Here each sponsor is its own document so logos can be named, reordered
// and retired individually.
export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      type: "altImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "website",
      type: "url",
    }),
    defineField({
      name: "orderRank",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
    webflowIdField,
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderRankAsc",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
