import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { CONSTRUCTIONS_QUERY, PROJECT_DETAILS_BY_QUERY, PROJECTS_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import Hero from "@/components/Hero";
import StartupList from "@/components/StartupList";
import ConstructionList from "@/components/ConstructionList";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { Metadata } from "next/types";

export default async function Construction({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const params = { search: query || null };

  console.log(`params: ${query}`)

  const session = await auth();

  console.log(`session -> ${session?.id}`);

  // const posts = await client.fetch(STARTUPS_QUERY);

  const { data: searchForConstructions } = await sanityFetch({ query: CONSTRUCTIONS_QUERY });
  console.log(`searchForConstructions -> ${params}: ${searchForConstructions}`)

  return (
    <>
      <MarkupSchema path="hang-muc" />

      <section className={"pink_container !mt-32"}>
        <h1 className={"heading"}>
          Kết Nối Với Chúng Tôi
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Hãy Chọn Hạng Mục Mà Bạn Quan Tâm.
        </p>

        <SearchForm query={query} path="hang-muc" search="Hạng Mục" />
      </section>


      {searchForConstructions?.length > 0 ? (
        searchForConstructions.map((post: StartupCardType) => (
          <ConstructionList key={post?._id} post={post} />
        ))
      ) : (
        <section className={"section_container"}>
          <p className={"no-result"}>
            Không tìm thấy hạn mục
          </p>
        </section>
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