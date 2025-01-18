import React from 'react'
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import ConstructionForm from "@/components/ConstructionForm";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className={"pink_container !min-h-[230px]"}>
        <h1 className={"heading"}>Submit Your Construction</h1>
      </section>

      <ConstructionForm/>
    </>
  )
}
export default Page
