import type { Metadata } from "next";
import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { CONSTRUCTIONS_QUERY, PROJECT_DETAILS_BY_QUERY, } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import Hero from "@/components/Hero";
import ConstructionList from "@/components/ConstructionList";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { AppleCardsCarousel } from "@/components/AppleCardsCarousel";
import SimpleCard from "@/components/SimpleCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const params = { search: query || null };

  const session = await auth();

  console.log(`session -> ${session?.id}`);

  // const posts = await client.fetch(STARTUPS_QUERY);

  // const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  const { data: searchForProjectDetails } = await sanityFetch({ query: PROJECT_DETAILS_BY_QUERY, params });

  const { data: searchForConstructions } = await sanityFetch({ query: CONSTRUCTIONS_QUERY, params });

  return (
    <>
      <MarkupSchema post={{}} path="" />
      <section className="section_container !max-w-full mt-16 bg-black-200 justify-items-center !overflow-hidden">
        <AppleCardsCarousel />
      </section>
      <section className={"pink_container !min-h-[230px]"}>
        <h1 className={"heading"}>
          Kết Nối Với Chúng Tôi
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Hãy Chọn Hạng mục, Dự Án Mà Bạn Quan Tâm.
        </p>

        <SearchForm query={query} search="Dự Án" />
      </section>

      {query ? (
        <section className={"section_container !justify-items-center"}>
          <p className={"text-30-semibold"}>
            {`Tìm kiếm cho "${query}"`}
          </p>
          <ul className={"mt-7 card_grid"}>
            {searchForProjectDetails?.length > 0 ? (
              searchForProjectDetails.map((post: StartupCardType) => (
                <SimpleCard key={post?._id} post={post} path="du-an" />
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
          {searchForConstructions?.length > 0 && (
            searchForConstructions.map((post: StartupCardType) => (
              <ConstructionList key={post?._id} post={post} />
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