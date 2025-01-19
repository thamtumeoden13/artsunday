import React from 'react'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Author, Startup } from "@/sanity/types";
import { PROJECTS_BY_CONSTRUCTION_ID_QUERY, PROJECTS_BY_DESIGN_ID_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import SimpleCard, { SimpleCardType } from './SimpleCard';

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const ProjectList = async ({ post, parentPath = 'thi-cong', className, }: { post: StartupCardType, parentPath?: 'thi-cong' | 'thiet-ke', className?: string, }) => {

  const { _id: id, title, slug } = post

  const params = { id }

  const { data: searchForProjects } = await sanityFetch({
    query: parentPath === "thi-cong" ? PROJECTS_BY_CONSTRUCTION_ID_QUERY : PROJECTS_BY_DESIGN_ID_QUERY,
    params
  });

  if (!searchForProjects?.length) return null;

  return (
    <section className={cn("section_container !justify-items-center !px-2", className)}>
      <Link href={`/${parentPath}/${slug?.current}`} className='flex lg:w-[65rem] md:w-[43rem] w-full'>
        <h1 className="heading-half hover:text-p1 ">
          <span className="">{title}</span>
        </h1>
      </Link>
      <ul className={cn("mt-7 card_grid max-7-xl w-full !justify-center", className)}>
        {searchForProjects.map((post: SimpleCardType) => (
          <SimpleCard key={post?._id} post={post} path='du-an' className='xs:w-full justify-items-center' />
        ))}
      </ul>
    </section>
  )
}
export default ProjectList
