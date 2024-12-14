import { defineField, defineType } from "sanity";
import { ConstructionIcon } from "lucide-react";

export const construction = defineType({
  name: 'construction',
  title: 'Construction',
  type: 'document',
  icon: ConstructionIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' }
    }),
    defineField({
      name: 'thumbnail',
      type: 'url',
      validation: (Rule) => Rule.required().uri({
        allowRelative: true,
        scheme: ['http', 'https'],
      }),
    }),
    defineField({
      name: 'image',
      type: 'url',
      validation: (Rule) => Rule.required().uri({
        allowRelative: true,
        scheme: ['http', 'https'],
      }),
    }),
    defineField({
      name: 'description',
      type: 'text'
    }),
    defineField({
      name: 'tags',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(20).error("Please" +
        " enter a tags")
    }),
    defineField({
      name: 'pitch',
      type: 'markdown',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActived',
      type: 'boolean'
    }),
    defineField({
      name: 'isDeleted',
      type: 'boolean'
    }),
    defineField({
      name: 'createdAt',
      type: 'date',
    }),
  ],
})