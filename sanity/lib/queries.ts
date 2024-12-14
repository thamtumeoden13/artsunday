import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author->{
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  pitch,
}`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
*[_type == "startup" && _id == $id][0]{
  _id,
  views
  }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author->{
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);

export const CONSTRUCTIONS_QUERY =
  defineQuery(`*[_type == "construction"] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author->{
    _id, name, image, bio
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);

export const CONSTRUCTION_BY_ID_QUERY =
  defineQuery(`*[_type == "construction" && _id == $id][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);

export const CONSTRUCTION_BY_SLUG_QUERY =
  defineQuery(`*[_type == "construction" && slug.current == $slug][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);

export const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && !defined($search) || title match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, image, bio
  }, 
  construction->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);

export const PROJECT_BY_ID_QUERY =
  defineQuery(`*[_type == "project" && _id == $id][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  }, 
  construction->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);

export const PROJECT_BY_SLUG_QUERY =
  defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  }, 
  construction->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);

export const PROJECTS_BY_CONSTRUCTION_ID_QUERY =
  defineQuery(`*[_type == "project" && construction._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, image, bio
  }, 
  construction->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);

export const PROJECT_DETAILS_BY_QUERY =
  defineQuery(`*[_type == "projectDetail" && !defined($search) || title match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, image, bio
  }, 
  project->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);

export const PROJECT_DETAIL_BY_ID_QUERY =
  defineQuery(`*[_type == "projectDetail" && _id == $id][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  },
  project->{
    _id, title, subtitle, description, image, thumbnail, slug
  },
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);

export const PROJECT_DETAILS_BY_PROJECT_QUERY =
  defineQuery(`*[_type == "projectDetail" && project._ref == $id]| order(_createdAt desc){
  _id,
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  },
  project->{
    _id, title, subtitle, description, image, thumbnail, slug
  }, 
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);

export const PROJECT_DETAIL_BY_SLUG_QUERY =
  defineQuery(`*[_type == "projectDetail" && slug.current == $slug][0]{
  _id, 
  title,
  subtitle,
  slug,
  _createdAt,
  author->{
    _id, name, username, image, bio
  },
  project->{
    _id, title, subtitle, description, image, thumbnail, slug
  },
  views,
  description,
  image,
  thumbnail,
  pitch,
}`);
