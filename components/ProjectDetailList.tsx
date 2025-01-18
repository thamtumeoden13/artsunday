import React from 'react'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Author, Startup } from "@/sanity/types";
import { PROJECT_DETAILS_BY_PROJECT_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import SimpleCard, { SimpleCardType } from './SimpleCard';

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const ProjectDetailList = async ({ post, className }: { post: StartupCardType, className?: string }) => {

  const { _id: id, title, slug } = post

  const params = { id }

  const { data: searchForProjectDetails } = await sanityFetch({ query: PROJECT_DETAILS_BY_PROJECT_QUERY, params });

  if (!searchForProjectDetails?.length) return null

  return (
    <section className={cn("section_container !justify-items-center !px-2", className)}>
      <Link href={`/du-an/${slug?.current}`} className='flex lg:w-[65rem] md:w-[43rem] w-full'>
        <h1 className="heading-half hover:underline w-full" style={{ textAlign: 'left' }}>
          Dự Án: {'  '}
          <span className="text-purple">{title}</span>
        </h1>
      </Link>
      <ul className={"mt-7 card_grid max-7-xl w-full"}>
        {searchForProjectDetails?.length > 0 && (
          searchForProjectDetails.map((post: SimpleCardType) => (
            <SimpleCard key={post?._id} post={post} path='chi-tiet-du-an' className='xs:w-full justify-items-center' />
          ))
        )}
      </ul>
    </section>
  )
}
export default ProjectDetailList
