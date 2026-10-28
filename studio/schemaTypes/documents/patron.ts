import { defineArrayMember, defineField, defineType } from "sanity";
import { HeartIcon } from "@sanity/icons/Heart";
import { webflowIdField } from "../shared/webflow-id-field";

export const patron = defineType({
  name: "patron",
  title: "Patron",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      type: "altImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "about",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "phone",
      type: "string",
    }),
    webflowIdField,
  ],
  preview: {
    select: { title: "name", media: "photo" },
  },
});
