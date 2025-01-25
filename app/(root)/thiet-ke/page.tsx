import SearchForm from "@/components/SearchForm";
import { CONSTRUCTION_BY_SLUG_QUERY, DESIGNS_BY_QUERY, PROJECT_DETAILS_BY_QUERY, PROJECTS_BY_CONSTRUCTION_ID_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { Metadata } from "next/types";
import SimpleCard, { SimpleCardType } from "@/components/SimpleCard";
import DesignList from "@/components/DesignList";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ProjectDetailList from "@/components/ProjectDetailList";

export default async function Construction({ searchParams }: Readonly<{
  searchParams: Promise<{ query?: string }>
}>) {

  const query = (await searchParams).query;

  const params = { search: query ?? null };

  const post = await client.fetch(CONSTRUCTION_BY_SLUG_QUERY, { 'slug': 'thiet-ke' });

  const { data: searchForProjectDetails } = await sanityFetch({ query: PROJECT_DETAILS_BY_QUERY, params });

  if (!post) return notFound();

  const { data: searchForProjects } = await sanityFetch({ query: PROJECTS_BY_CONSTRUCTION_ID_QUERY, params: { id: post._id } });

  if (!searchForProjects) return notFound();

  return (
    <>
      <MarkupSchema path="thiet-ke" />

      <section className={"pink_container md:!min-h-[28rem] !flex !mt-0 !md:my-0 !pb-4 !pt-16 "}>
        <h1 className={"heading"}>
          Kết Nối Với Chúng Tôi
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Hãy Chọn Thiết Kế Mà Bạn Quan Tâm.
        </p>

        <SearchForm query={query} path="thiet-ke" search="hạng mục Thiết kế" />
      </section>

      {query ? (
        <section className={"section_container !justify-items-center"}>
          <p className={"text-30-semibold"}>
            {`Tìm kiếm cho "${query}"`}
          </p>
          <ul className={"mt-7 card_grid"}>
            {searchForProjectDetails?.length > 0 ? (
              searchForProjectDetails.map((post: SimpleCardType) => (
                <SimpleCard key={post?._id} post={post} path="chi-tiet-du-an" className='xs:w-full justify-items-center' />
              ))
            ) : (
              <p className={"no-result"}>
                Không tìm thấy dự án
              </p>
            )}
          </ul>
        </section>
      ) : (
        <>
          {searchForProjects?.length > 0 && (
            searchForProjects.map((post: SimpleCardType) => (
              <ProjectDetailList key={post?._id} post={post} className="!px-0" />
            ))
          )}
        </>
      )}

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