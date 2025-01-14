import React from 'react'
import Experience from '@/components/Experience';
import About from '@/components/About';
import Insights from '@/components/Insights';
import Explore from '@/components/Explore';
import Contact from "@/components/Contact";
import { CarouselPlugin } from "@/components/shared/CarouselPlugin";
import { CarouselSpacing } from "@/components/shared/CarouselSpacing";
import { CarouselOrientation } from "@/components/shared/CarouselOrientation";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // const id = (await params).id;
  // const session = await auth();

  // const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id});
  // if (!user) return notFound();
  const { select: homeHeroPost } = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug: "home-hero" });

  return (
    <>
      <section className={"pink_container"}>
        {/* <section className={"section_container mt-16"}>
          <CarouselPlugin data={homeHeroPost} />
        </section> */}

        {/* <section className={"section_container mt-16"}>
          <CarouselSpacing data={homeHeroPost} />
        </section>
        <section className={"section_container mt-16"}>

          <CarouselOrientation data={homeHeroPost} />
        </section> */}
        <section className={"section_container mt-16  w-full md:w-[44rem]"}>
          {/* <Experience /> */}
          {/* <About /> */}
          {/* <Insights />
          <Explore /> */}
          <div className="mt-10">
            <Contact />
          </div>
        </section>
      </section>
    </>
  )
}
export default Page
