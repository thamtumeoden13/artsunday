import React from 'react'
import Contact from "@/components/Contact";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

  return (
    <section className={"pink_container"}>
      <section className={"section_container mt-16  w-full md:w-[44rem]"}>
        <div className="mt-10">
          <Contact />
        </div>
      </section>
    </section>
  )
}
export default Page
