import React from 'react'
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProjectDetailForm from "@/components/ProjectDetailForm";
import { PROJECT_DETAIL_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { client, clientNoCache } from '@/sanity/lib/client';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const session = await auth();

  if (!session) redirect("/");

  const slug = (await params).slug;

  const post = await clientNoCache.fetch(PROJECT_DETAIL_BY_SLUG_QUERY, { slug })

  if (!post) return redirect("/auth");


  return (
    <>
      <section className={"pink_container !min-h-[230px]"}>
        <h1 className={"heading"}>Submit Your Project Detail</h1>
      </section>

      <ProjectDetailForm post={post} />
    </>
  )
}
export default Page
