
import { Tabs } from "./ui/tabs";
import ProjectDetailTable from "./ProjectDetailTable";
import CategoryTable from "./CategoryTable";
import { Author } from "@/sanity/types";
import ConstructionTable from "./ConstructionTable";
import ProjectTable from "./ProjectTable";
import PermissionTable from "./PermissionTable";
import DesignTable from "./DesignTable";

export const TabManagement = async ({ user }: { user: Author }) => {

  const role = user?.role;

  console.log('TabManagement -> user', user)

  const tabs = [
    {
      title: "Công Trình",
      value: "cong-trinh",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <ConstructionTable title='Công Trình' role={role} />
        </div>
      ),
    },
    {
      title: "Thiết Kế",
      value: "thiet-ke",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <DesignTable title='Thiết kế' role={role} />
        </div>
      ),
    },
    {
      title: "Dự Án",
      value: "du-an",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <ProjectTable title="Dự Án" role={role} />
        </div>
      ),
    },
    {
      title: "Bài Viết",
      value: "chi-tiet-bai-viet",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <ProjectDetailTable title="Bài Viết" role={role} />
        </div>
      ),
    },
    {
      title: "Danh Mục Trang Chủ",
      value: "home-hero",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="home-hero"
            title="Danh Mục Trang Chủ"
            role={role}
          />
        </div>
      ),
    },
    {
      title: "Danh Mục Công Trình",
      value: "constructions-router",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="constructions-router"
            title="Danh Mục Công Trình"
            role={role}
          />
        </div>
      ),
    },
    {
      title: "Danh Mục Thiết Kế",
      value: "designs-router",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="designs-router"
            title="Danh Mục Thiết Kế"
            role={role}
          />
        </div>
      ),
    },
    {
      title: "Danh Mục Cuối Trang",
      value: "footer",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          <CategoryTable
            slug="footer"
            title="Danh Mục Cuối Trang"
            role={role}
          />
        </div>
      ),
    },
    {
      title: "Quyền Truy Cập",
      value: "permission",
      content: (
        <div className="relative w-full h-full p-10 text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-blue-700 to-green-900">
          {role === 'admin' ?
            <PermissionTable title="Quyền Truy Cập" role={role} />
            : 'Bạn không có quyền truy cập'
          }
        </div>
      ),
    },
  ];

  return (
    <div className="h-[90vh] max-md:hidden [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start m-10">
      <Tabs
        tabs={tabs}
        activeTabClassName="bg-primary"
      />
    </div>
  );
}

