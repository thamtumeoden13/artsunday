import React, { Suspense } from 'react'
import {
  PROJECT_DETAIL_BY_SLUG_QUERY,
  PROJECT_DETAIL_VIEWS_QUERY,
  PROJECT_DETAILS_BY_PROJECT_QUERY,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";


import SimpleCard, { SimpleCardType } from '@/components/SimpleCard';
import { sanityFetch } from '@/sanity/lib/live';
import MarkupSchema from '@/components/shared/MarkupSchema';
import { CloudinaryImage } from '@/components/shared/CloudinaryImage';
const md = markdownit();

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const { data: post } = await sanityFetch({ query: PROJECT_DETAIL_BY_SLUG_QUERY, params: { slug } })

  const releatedPosts = await client.fetch(PROJECT_DETAILS_BY_PROJECT_QUERY, { id: post.project._id },)

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '');

  return (
    <>
      <MarkupSchema path={`chi-tiet-du-an/${slug}`} post={post} />

      <section className={"pink_container !min-h-[320px] !mt-18 md:mt-24"}>
        <p className={"tag"}>{formatDate(post?._createdAt)}</p>

        <h1 className={"heading"}>{post.title}</h1>
        <p className={"sub-heading !max-w-5xl"}>{post.description}</p>
      </section>

      {/* <section className={"section_container !py-0 !px-2 !min-h-[230px] !max-w-screen-xl"}>
        <div className="h-[48rem] max-w-screen-xl">
          <ProjectAlbum />
        </div>
      </section> */}

      <section className="section_container">
        {/* <ProjectGeneral post={post} /> */}
        <CloudinaryImage
          src={post.thumbnail}
          alt={post.subtitle || "Art Sunday"}
          width={760}
          height={540}
          className="max-h-[44rem] rounded-lg w-full mb-10 object-cover"
        />

        <div className="flex justify-between items-start gap-1">

          <div className={"space-y-5 mt-10 max-w-4xl mx-auto"}>
            <h3 className={"text-30-bold"}>Bài Viết Chi Tiết</h3>
            {parsedContent ? (
              <article
                className={"prose max-w-7xl font-ibm-plex text-justify"}
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className={"no-result"}>Không tìm thấy thông tin phù hợp</p>
            )}
          </div>

          <div className='hidden lg:flex flex-col w-[36rem]'>
            {releatedPosts?.length > 0 && (
              <div className={"flex flex-col items-center"}>
                <p className={"heading-half !leading-[16px] !text-left w-[330px] !bg-black-100 rounded-tl-2xl"}>Quan Tâm</p>

                <ul className={"mt-2 card_grid-xs  !justify-start"}>
                  {releatedPosts.map((post: SimpleCardType) => (
                    <SimpleCard key={post._id} post={post} path='chi-tiet-du-an' className='xs:w-full justify-items-center' />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <hr className={"divider !max-w-full"} />

        <Suspense fallback={<Skeleton className={"view_skeleton"} />}>
          <View query={PROJECT_DETAIL_VIEWS_QUERY} id={post._id} />
        </Suspense>
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
    title: `${data.title} - Art Sunday`,
    description: `${data.description}`,
    openGraph: {
      title: `${data.title} - Art Sunday`,
      description: `${data.description}`,
      url: `http://artsunday.vn/chi-tiet-du-an/${slug}`,
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
      title: `${data.name} - Art Sunday`,
      description: `${data.description}`,
      images: [data.image],
    },
  };
}