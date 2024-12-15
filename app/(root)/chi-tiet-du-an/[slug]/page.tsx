import React, { Suspense } from 'react'
import {
  PLAYLIST_BY_SLUG_QUERY,
  PROJECT_DETAIL_BY_ID_QUERY,
  PROJECT_DETAIL_BY_SLUG_QUERY,
  PROJECT_DETAILS_BY_PROJECT_QUERY,
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


import ProjectAlbum from "@/components/ProjectAlbum"
import ProjectGeneral from "@/components/ProjectGeneral"
import SimpleCard from '@/components/SimpleCard';
import { AppleCardsCarousel } from '@/components/AppleCardsCarousel';
import { sanityFetch } from '@/sanity/lib/live';
import MarkupSchema from '@/components/shared/MarkupSchema';
// import BreadcrumbComponent from "@/components/shared/Breadcrumb"
// import Header from "@/components/shared/Header"
const md = markdownit();

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const { data: post } = await sanityFetch({ query: PROJECT_DETAIL_BY_SLUG_QUERY, params: { slug } })

  const releatedPosts = await client.fetch(PROJECT_DETAILS_BY_PROJECT_QUERY, { id: post.project._id },)

  if (!post) return notFound();

  return (
    <>
      <MarkupSchema path={`chi-tiet-du-an/${slug}`} post={post} />

      <section className={"pink_container !min-h-[230px] mt-32"}>
        <p className={"tag"}>{formatDate(post?._createdAt)}</p>

        <h1 className={"heading"}>{post.title}</h1>
        <p className={"sub-heading !max-w-5xl"}>{post.description}</p>
      </section>

      {/* <section className={"section_container !py-0 !px-2 !min-h-[230px] !max-w-screen-xl"}>
        <div className="h-[48rem] max-w-screen-xl">
          <ProjectAlbum />
        </div>
      </section> */}

      <section className="section_container !max-w-screen-xl">
        <div className="flex justify-between items-start gap-1">
          <ProjectGeneral post={post} />

          <div className='hidden lg:flex flex-col w-[36rem]'>
            {releatedPosts?.length > 0 && (
              <div className={"flex flex-col"}>
                <p className={"heading-half !leading-[16px] !text-left w-[330px] !bg-black-100 rounded-tl-2xl"}>Quan Tâm</p>

                <ul className={"mt-2 card_grid-xs "}>
                  {releatedPosts.map((post: StartupCardType, index: number) => (
                    <SimpleCard key={index} post={post} path='chi-tiet-du-an' />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <hr className={"divider !max-w-full"} />

      </section>

    </>
  )
}

export default Page


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  // Fetch dữ liệu sản phẩm từ API hoặc database
  const data = await client.fetch(PROJECT_DETAIL_BY_SLUG_QUERY, { slug })

  return {
    title: `${data.title} - Cốc Cốc Studio`,
    description: `${data.description}`,
    openGraph: {
      title: `${data.title} - Cốc Cốc Studio`,
      description: `${data.description}`,
      url: `http://cococstudio.com/chi-tiet-du-an/${slug}`,
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