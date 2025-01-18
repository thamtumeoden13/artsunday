import React from 'react'
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import DesignForm from '@/components/DesignForm';

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className={"pink_container !min-h-[230px]"}>
        <h1 className={"heading"}>Submit Your Design</h1>
      </section>

      <DesignForm/>
    </>
  )
}
export default Page
