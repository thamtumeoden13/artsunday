import ProjectAlbum from "@/components/ProjectAlbum"
import ProjectGeneral from "@/components/ProjectGeneral"
import BreadcrumbComponent from "@/components/shared/Breadcrumb"
import Header from "@/components/shared/Header"
import React from 'react'

const ProjectDetail = () => {
  return (
    <>
      <BreadcrumbComponent />

      <Header
        title="Thiết Kế Nhà Phố 3 Tầng Hiện Đại tại Biên Hòa"
        subtitle="Thông tin chi tiết dự án"
      />

      <section className="w-full">
        <div className="h-[44rem] max-w-6xl">
          <ProjectAlbum />
        </div>

        <ProjectGeneral />

      </section>
    </>
  )
}

export default ProjectDetail