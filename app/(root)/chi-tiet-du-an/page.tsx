import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { PROJECT_DETAILS_BY_QUERY, PROJECTS_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import ProjectDetailList from "@/components/ProjectDetailList";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { Metadata } from "next/types";
import SimpleCard from "@/components/SimpleCard";
// import BreadcrumbComponent from "@/components/shared/Breadcrumb";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const params = { search: query || null };

  const session = await auth();

  console.log(`session -> ${session?.id}`);

  const { data: searchForProjects } = await sanityFetch({ query: PROJECT_DETAILS_BY_QUERY, params });

  console.log('searchForProjects', searchForProjects)

  return (
    <>
      <MarkupSchema path={`chi-tiet-du-an`} />

      <section className={"pink_container !min-h-[230px] mt-32"}>
        <h1 className={"heading"}>
          Kết Nối Với Chúng Tôi
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Hãy Chọn Dự Án Mà Bạn Quan Tâm.
        </p>
        <SearchForm query={query} path="chi-tiet-du-an" search="Dự Án"/>
      </section>
      <section className={"section_container justify-items-center"}>
        <p className={"text-30-semibold"}>
          {query ? `Tìm kiếm cho "${query}"` : 'Tất cả dự án'}
        </p>
        <ul className={"mt-7 card_grid"}>
          {searchForProjects?.length > 0 ? (
            searchForProjects.map((post: StartupCardType) => (
              <SimpleCard key={post?._id} post={post} path="chi-tiet-du-an" />
            ))
          ) : (
            <p className={"no-result"}>
              Không tìm thấy dự án phù hợp
            </p>
          )}
        </ul>
      </section>
      {/* {searchForProjects?.length > 0 ? (
        searchForProjects.map((post: StartupCardType) => (
          <ProjectDetailList key={post?._id} post={post} />
        ))
      ) : (
        <section className={"section_container"}>
          <p className={"no-result"}>
            Không tìm thấy dự án
          </p>
        </section>
      )} */}

      <SanityLive />
    </>
  );
}

export const metadata: Metadata = {
  title: "CÔNG TY TNHH KIẾN TRÚC XÂY DỰNG ART SUNDAY",
  description: "Thiết Kế Và Thi Công Kiến Trúc: Nhà Phố, Biệt Thự, Khách Sạn, Nhà Thờ, Nhà Giáo Lý Và Nội Thất Chuyên Nghiệp",
  keywords: ["Biệt Thự", "Nhà Phố", "Nội Thất", "Công Trình Công Giáo"],
  openGraph: {
    title: "Kiến Trúc, Xây Dựng | ART SUNDAY",
    description: "Thiết Kế Và Thi Công Kiến Trúc: Nhà Phố, Biệt Thự, Khách Sạn, Nhà Thờ, Nhà Giáo Lý Và Nội Thất Chuyên Nghiệp.",
    url: "https://artsunday.vn/",
    images: [
      {
        url: "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "noi-that",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@twitterhandle",
    title: "Kiến Trúc, Xây Dựng | ART SUNDAY",
    description: "Thiết Kế Và Thi Công Kiến Trúc: Nhà Phố, Biệt Thự, Khách Sạn, Nhà Thờ, Nhà Giáo Lý Và Nội Thất Chuyên Nghiệp.",
    images: [
      {
        url: "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "noi-that",
      },
    ],
  },
};