import { defineField, defineType } from "sanity";
import { AxeIcon } from "lucide-react";

export const projectDetail = defineType({
  name: 'projectDetail',
  title: 'ProjectDetail',
  type: 'document',
  icon: AxeIcon,
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
      name: 'views',
      type: 'number'
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' }
    }),
    defineField({
      name: 'project',
      type: 'reference',
      to: { type: 'project' }
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
      name: 'overview',
      type: 'object',
      fields: [
        { name: 'investor', type: 'string', title: 'Chủ Đầu Tư' },
        { name: 'address', type: 'string', title: 'Địa Điểm' },
        { name: 'scale', type: 'string', title: 'Diện Tích' },
        { name: 'function', type: 'string', title: 'Quy Mô Dự Án' },
        { name: 'expense', type: 'string', title: 'Kinh Phí' },
        { name: 'designTeam', type: 'string', title: 'Nhóm Thiết Kế' },
        { name: 'designYear', type: 'string', title: 'Năm Thiết Kế' },
        { name: 'estimatedTime', type: 'string', title: 'Thời Gian Hoàn Thiện' },
      ]
    }),
    defineField({
      name: 'tags',
      type: 'string',
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