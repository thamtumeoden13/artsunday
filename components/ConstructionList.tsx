import React from 'react'
import Link from "next/link";
import { Author, Startup } from "@/sanity/types";
import { PROJECTS_BY_CONSTRUCTION_ID_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import SimpleCard, { SimpleCardType } from './SimpleCard';

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const ConstructionList = async ({ post }: { post: StartupCardType }) => {

  const { _id: id, title, slug } = post

  const params = { id }

  const { data: searchForProjects } = await sanityFetch({ query: PROJECTS_BY_CONSTRUCTION_ID_QUERY, params });

  if (!searchForProjects?.length) return null;

  return (
    <section className={"section_container !justify-items-center !px-2"}>
      <Link href={`/hang-muc/${slug?.current}`} className='flex lg:w-[65rem] md:w-[43rem] w-full'>
        <h1 className="w-full heading-half hover:underline" style={{ textAlign: 'left' }}>
          Hạng Mục{'  '}
          <span className="text-purple">{title}</span>
        </h1>
      </Link>
      <ul className={"mt-7 card_grid max-7-xl w-full"}>
        {searchForProjects?.length > 0 && (
          searchForProjects.map((post: SimpleCardType) => (
            <SimpleCard key={post?._id} post={post} path='du-an' className='xs:w-full justify-items-center' />
          ))
        )}
      </ul>
    </section>
  )
}
export default ConstructionList
