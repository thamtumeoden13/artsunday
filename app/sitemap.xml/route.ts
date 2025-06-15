import { client } from "@/sanity/lib/client";
import {
  CONSTRUCTION_BY_SLUG_QUERY,
  PROJECT_DETAILS_BY_QUERY,
  PROJECTS_BY_QUERY,
} from "@/sanity/lib/queries";
import { ProjectDetail } from "@/sanity/types";
import MarkdownIt from "markdown-it";
import { getServerSideSitemap } from "next-sitemap";

const baseUrl = "https://artsunday.vn";

// Định nghĩa kiểu cho các đối tượng trả về
type PostType = Pick<
  ProjectDetail,
  "title" | "subtitle" | "slug" | "_updatedAt" | "pitch"
>;

function extractImagesFromMarkdown(markdown: string) {
  const registerImage: { src: string; alt: string }[] = [];

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  // Set the image renderer BEFORE rendering
  const defaultRender =
    md.renderer.rules.image ||
    ((tokens, idx, options, env, self) =>
      self.renderToken(tokens, idx, options));

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const srcIndex = token.attrIndex("src");
    const src = token.attrs?.[srcIndex][1] || "";
    const altIndex = token.attrIndex("alt");
    const alt = token.attrs?.[altIndex]?.[1];
    const finalAlt =
      !alt || alt.trim().toLowerCase() === "image" ? token.content : alt;

    registerImage.push({ src, alt: finalAlt });

    // Render the image with the default renderer
    const defaultHtml = defaultRender(tokens, idx, options, env, self);
    return `<div class="inline-block cursor-pointer" data-gallery-image="${src}">${defaultHtml}</div>`;
  };

  // Now render the markdown (after setting renderer)
  if (markdown) {
    md.render(markdown);
  } else {
    return [];
  }

  // Remove duplicate images (optional)
  const uniqueImages = Array.from(
    new Map(registerImage.map((img) => [img.src, img])).values()
  );

  return uniqueImages;
}

async function fetchPosts() {
  const [construction, design] = await Promise.all([
    client.fetch(CONSTRUCTION_BY_SLUG_QUERY, { slug: "thi-cong" }),
    client.fetch(CONSTRUCTION_BY_SLUG_QUERY, { slug: "thiet-ke" }),
  ]);

  console.log({ construction, design });

  const [
    // searchForConstructions,
    // searchForDesigns,
    searchForProjects,
    searchForProjectDetails,
  ] = await Promise.all([
    // client.fetch(PROJECTS_BY_CONSTRUCTION_ID_QUERY, { id: construction._id }),
    // client.fetch(PROJECTS_BY_CONSTRUCTION_ID_QUERY, { id: design._id }),
    client.fetch(PROJECTS_BY_QUERY, { search: null }),
    client.fetch(PROJECT_DETAILS_BY_QUERY, { search: null }),
  ]);

  console.log({ searchForProjects, searchForProjectDetails });

  const sitemapProjects =
    searchForProjects?.map((post: PostType) => ({
      loc: `${baseUrl}/du-an/${post.slug?.current}`,
      lastmod: new Date(post._updatedAt).toISOString(),
    })) || [];

  const sitemapProjectDetails =
    searchForProjectDetails?.map((post: PostType) => {
      const images = extractImagesFromMarkdown(post?.pitch || "") || [];
      const imageEntry = images.map((image) => ({
        loc: new URL( image?.src),
        caption: image?.alt || post.title,
        title: post.title,
        license: new URL(`${baseUrl}/bai-viet/${post.slug?.current}`),
      }));
      return {
        loc: `${baseUrl}/bai-viet/${post.slug?.current}`,
        lastmod: new Date(post._updatedAt).toISOString(),
        images: imageEntry,
      };
    }) || [];

  return [...sitemapProjects, ...sitemapProjectDetails];
}

export async function GET() {
  const dynamicRoutes = await fetchPosts();
  const staticRoutes = [
    { loc: `${baseUrl}/`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/thi-cong`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/thiet-ke`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/du-an`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/bai-viet`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/thong-tin`, lastmod: new Date().toISOString() },
  ];

  console.log("Dynamic Routes:", dynamicRoutes.map((route) => route.images));

  return getServerSideSitemap([
    {
      loc: `${baseUrl}`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    ...staticRoutes,
    ...dynamicRoutes,
  ]);
}
