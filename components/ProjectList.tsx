import React from 'react'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Author, Startup } from "@/sanity/types";
import { PROJECTS_BY_CONSTRUCTION_ID_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import SimpleCard, { SimpleCardType } from './SimpleCard';

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const ProjectList = async ({ post, className }: { post: StartupCardType, className?: string }) => {

  const { _id: id, title, slug } = post

  const params = { id }

  const { data: searchForProjects } = await sanityFetch({ query: PROJECTS_BY_CONSTRUCTION_ID_QUERY, params });

  if (!searchForProjects?.length) return null;

  return (
    <section className={cn("section_container !justify-items-center  !px-2", className)}>
      <Link href={`/hang-muc/${slug?.current}`} className='flex lg:w-[65rem] md:w-[43rem] w-full'>
        <h1 className="heading-half">
          Thiết kế{'  '}
          <span className="text-purple">{title}</span>
        </h1>
      </Link>
      <ul className={"mt-7 card_grid max-7-xl w-full"}>
        {searchForProjects.map((post: SimpleCardType) => (
          <SimpleCard key={post?._id} post={post} path='du-an' className='xs:w-full justify-items-center' />
        ))}
      </ul>
    </section>
  )
}
export default ProjectList
