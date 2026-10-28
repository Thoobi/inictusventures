import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons/User";
import { webflowIdField } from "../shared/webflow-id-field";

export const JUDGE_CATEGORIES = [
  { title: "Dance", value: "dance" },
  { title: "Music", value: "music" },
  { title: "Art", value: "art" },
];

export const judge = defineType({
  name: "judge",
  title: "Judge",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      type: "string",
      description: "The DAM year this person judged.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: { list: JUDGE_CATEGORIES, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      type: "altImage",
      validation: (rule) => rule.required(),
    }),
    webflowIdField,
  ],
  preview: {
    select: { title: "name", year: "year", category: "category", media: "photo" },
    prepare: ({ title, year, category, media }) => ({
      title,
      subtitle: [year, category].filter(Boolean).join(" · "),
      media,
    }),
  },
});
