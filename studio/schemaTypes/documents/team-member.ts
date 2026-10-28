import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons/Users";
import { webflowIdField } from "../shared/webflow-id-field";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "fullName",
      title: "Full name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      type: "altImage",
      validation: (rule) => rule.required(),
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
    select: { title: "fullName", media: "photo" },
  },
});
