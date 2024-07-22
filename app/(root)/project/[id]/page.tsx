import ProjectAlbum from "@/components/ProjectAlbum"
import ProjectGeneral from "@/components/ProjectGeneral"
import BreadcrumbComponent from "@/components/shared/Breadcrumb"
import Header from "@/components/shared/Header"
import { LayoutGrid } from "@/components/ui/LayoutGrid"
import { TracingBeam } from "@/components/ui/TracingBeam"
import React from 'react'
import { twMerge } from "tailwind-merge"

const ProjectDetail = () => {
  return (
    <>
      <BreadcrumbComponent />

      <Header
        title="Thiết Kế Nhà Phố 3 Tầng Hiện Đại tại Biên Hòa"
        subtitle="Thông tin chi tiết dự án"
      />

      <section className="mt-10 w-full">
        <div className="h-[40rem]">
          <ProjectAlbum />
        </div>

        <ProjectGeneral />

      </section>

    </>
  )
}

export default ProjectDetail