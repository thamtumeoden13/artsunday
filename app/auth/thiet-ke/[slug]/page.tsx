import React from 'react'
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DESIGN_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { clientNoCache } from '@/sanity/lib/client';
import DesignForm from '@/components/DesignForm';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const session = await auth();

  if (!session) redirect("/");

  const slug = (await params).slug;

  const post = await clientNoCache.fetch(DESIGN_BY_SLUG_QUERY, { slug });

  console.log(post);

  if (!post) return redirect("/auth");

  return (
    <>
      <section className={"pink_container !min-h-[230px]"}>
        <h1 className={"heading"}>Submit Your Deisng</h1>
      </section>

      <DesignForm post={post} />
    </>
  )
}
export default Page
