import BreadcrumbComponent from "@/components/shared/Breadcrumb";
import Header from "@/components/shared/Header"
import Search from "@/components/shared/Search"
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from 'react'

const Project = ({ searchParams }: SearchParamProps) => {

  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  // const images = await getAllImages({page,searchQuery});

  const images = new Array(10).fill('');

  return (
    <>
      <BreadcrumbComponent />
      <Header
        title="Hạn mục dự án"
        subtitle="Thông tin hạng mục dự án"
      />

      <section id="project" className="mt-10">

        <div className="mb-6 gap-5 flex md:flex-row flex-col md:flex-between">
          <Search />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gird-cols-1 mx-auto gap-4">
          {images.map((card, index) => (
            <div key={index} className="max-w-xs w-full group/card">
              <div
                className={cn(
                  " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                  "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
                )}
              >
                <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
                <div className="flex flex-row items-center space-x-4 z-10">
                  <Image
                    height="100"
                    width="100"
                    alt="Avatar"
                    src="/manu.png"
                    className="h-10 w-10 rounded-full border-2 object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="font-normal text-base text-gray-50 relative z-10">
                      Manu Arora
                    </p>
                    <p className="text-sm text-gray-400">2 min read</p>
                  </div>
                </div>
                <div className="text content">
                  <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                    Author Card
                  </h1>
                  <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                    Card with Author avatar, complete name and time to read - most
                    suitable for blogs.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  )
}

export default Project