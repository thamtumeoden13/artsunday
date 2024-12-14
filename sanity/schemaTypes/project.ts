import { defineField, defineType } from "sanity";
import { ProjectorIcon } from "lucide-react";

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectorIcon,
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
      name: 'description',
      type: 'text'
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' }
    }),
    defineField({
      name: 'construction',
      type: 'reference',
      to: { type: 'construction' }
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
      name: 'tags',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(20).error("Please" +
        " enter a tags")
    }),
    defineField({
      name: 'orderIndex',
      type: 'number'
    }),
    defineField({
      name: 'pitch',
      type: 'markdown',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'onlyShowRouter',
      type: 'boolean'
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