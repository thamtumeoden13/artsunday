import React, { Suspense } from 'react'
import {
  PLAYLIST_BY_SLUG_QUERY,
  PROJECT_BY_ID_QUERY,
  PROJECT_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import ProjectList from '@/components/ProjectList';
import ProjectDetailList from '@/components/ProjectDetailList';
import { sanityFetch } from '@/sanity/lib/live';
import MarkupSchema from '@/components/shared/MarkupSchema';

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const { data } = await sanityFetch({ query: PROJECT_BY_SLUG_QUERY, params: { slug } })

  if (!data) return notFound();

  const parsedContent = md.render(data?.pitch || '');

  return (
    <>
      <MarkupSchema  path={`du-an/${slug}`} post={data} />
      
      <section className={"pink_container !min-h-[230px] mt-32"}>
        <p className={"tag"}>{formatDate(data?._createdAt)}</p>

        <h1 className={"heading"}>{data.title}</h1>
        <p className={"sub-heading !max-w-5xl"}>{data.description}</p>
      </section>

      <section className={"section_container"}>
        <Image
          src={data.image}
          alt="thumbnail"
          height={1000}
          width={1000}
          className={"h-[44rem] w-full rounded-xl"}
        />

        <ProjectDetailList key={data?._id} post={data} />

        <div className={"space-y-5 mt-10 max-w-7xl mx-auto"}>
          <h3 className={"text-30-bold"}>Pitch Details</h3>
          {parsedContent ? (
            <article
              className={"prose max-w-4xl font-work-sans break-all"}
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className={"no-result"}>No details provided</p>
          )}
        </div>

        <hr className={"divider"} />

      </section>
    </>
  )
}
export default Page

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  // Fetch dữ liệu sản phẩm từ API hoặc database
  const data = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })

  return {
    title: `${data.title} - Cốc Cốc Studio`,
    description: `${data.description}`,
    openGraph: {
      title: `${data.title} - Cốc Cốc Studio`,
      description: `${data.description}`,
      url: `http://cococstudio.com/du-an/${slug}`,
      images: [
        {
          url: data.image,
          width: 800,
          height: 600,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} - Cốc Cốc Studio`,
      description: `${data.description}`,
      images: [data.image],
    },
  };
}