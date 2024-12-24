import { GalleryThumbnailsIcon, ListIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categories",
  type: "document",
  icon: GalleryThumbnailsIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "select",
      type: "array",
      of: [
        // { type: "reference", to: [{ type: "construction" }] },
        { type: "reference", to: [{ type: "project" }] }
      ],
    }),
  ],
});