import React from 'react'
import { formatDate } from "@/lib/utils";
import { ArrowUpRight, EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import StartupCard from './StartupCard';
import { PROJECT_DETAILS_BY_PROJECT_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import SimpleCard, { SimpleCardType } from './SimpleCard';

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const ProjectDetailList = async ({ post }: { post: StartupCardType }) => {

  const { _id: id, title, slug } = post

  const params = { id }

  const { data: searchForProjectDetails } = await sanityFetch({ query: PROJECT_DETAILS_BY_PROJECT_QUERY, params });

  if (!searchForProjectDetails?.length) return null

  return (
    <section className={"section_container !justify-items-center"}>
      <Link href={`/du-an/${slug?.current}`} className='flex lg:w-[65rem] md:w-[43rem] w-[22rem]'>
        <h1 className="heading-half hover:underline w-full" style={{ textAlign: 'left' }}>
          Dự Án: {'  '}
          <span className="text-purple">{title}</span>
        </h1>
      </Link>
      <ul className={"mt-7 card_grid"}>
        {searchForProjectDetails?.length > 0 && (
          searchForProjectDetails.map((post: SimpleCardType) => (
            <SimpleCard key={post?._id} post={post} path='chi-tiet-du-an' />
          ))
        )}
      </ul>
    </section>
  )
}
export default ProjectDetailList
