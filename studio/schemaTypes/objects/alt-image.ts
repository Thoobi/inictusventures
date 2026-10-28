import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";

export const altImage = defineType({
  name: "altImage",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for screen readers and search engines.",
      validation: (rule) => rule.warning().required(),
    }),
  ],
});
