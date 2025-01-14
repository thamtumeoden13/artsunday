import React from 'react'
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import ProjectDetailForm from "@/components/ProjectDetailForm";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className={"pink_container !min-h-[230px]"}>
        <h1 className={"heading"}>Submit Your Project Detail</h1>
      </section>

      <ProjectDetailForm/>
    </>
  )
}
export default Page
