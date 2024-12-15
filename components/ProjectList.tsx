import React from 'react'
import { formatDate } from "@/lib/utils";
import { ArrowUpRight, EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import StartupCard from './StartupCard';
import { PROJECTS_BY_CONSTRUCTION_ID_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import SimpleCard from './SimpleCard';

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const ProjectList = async ({ post }: { post: StartupCardType }) => {

  const { _id: id, title, slug } = post

  const params = { id }

  const { data: searchForProjects } = await sanityFetch({ query: PROJECTS_BY_CONSTRUCTION_ID_QUERY, params });

  if (!searchForProjects?.length) return null;

  return (
    <section className={"section_container !justify-items-center"}>
      <Link href={`/hang-muc/${slug?.current}`} className='flex lg:w-[65rem] md:w-[43rem] w-[22rem]'>
        <h1 className="heading-half hover:underline w-full" style={{ textAlign: 'left' }}>
          Thiết kế{'  '}
          <span className="text-purple">{title}</span>
        </h1>
      </Link>
      <ul className={"mt-7 card_grid"}>
        {searchForProjects.map((post: StartupCardType) => (
          <SimpleCard key={post?._id} post={post} path='du-an' />
        ))}
      </ul>
    </section>
  )
}
export default ProjectList
