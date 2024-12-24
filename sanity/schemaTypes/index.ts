import { type SchemaTypeDefinition } from 'sanity'
import { author } from "@/sanity/schemaTypes/author";
import { startup } from "@/sanity/schemaTypes/startup";
import { playlist } from "@/sanity/schemaTypes/playlist";
import { category } from "@/sanity/schemaTypes/category";
import { construction } from "@/sanity/schemaTypes/construction";
import { project } from "@/sanity/schemaTypes/project";
import { projectDetail } from "@/sanity/schemaTypes/projectDetail";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    author, startup, playlist, category,
    construction, project, projectDetail],
}
