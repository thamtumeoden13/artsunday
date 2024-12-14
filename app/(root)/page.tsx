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
      <MarkupSchema post={{}} path=""/>
      <Hero />
      <section className={"pink_container"}>
        <h1 className={"heading"}>
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competition
        </p>

        <SearchForm query={query} search="Projects" />
      </section>

      {query ? (
        <section className={"section_container"}>
          <p className={"text-30-semibold"}>
            {`Tìm kiếm cho "${query}"`}
          </p>
          <ul className={"mt-7 card_grid"}>
            {searchForProjectDetails?.length > 0 ? (
              searchForProjectDetails.map((post: StartupCardType) => (
                <StartupCard key={post?._id} post={post} path="project" />
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

export const metadata = {
  title: "Thiết Kế, Xây Dựng | cococstudio",
  description: "Mô tả ngắn gọn về sản phẩm, giúp tăng khả năng hiển thị trên Google.",
  keywords: ["Biệt Thự", "Nhà Phố", "Nội Thất", "Công Trình Công Giáo"],
  openGraph: {
    title: "Thiết Kế, Xây Dựng | cococstudio",
    description: "Mô tả chi tiết sản phẩm.",
    url: "https://cococstudio.com/",
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
    title: "Sản phẩm | Tên website",
    description: "Mô tả chi tiết sản phẩm.",
    images: ["https://example.com/image.jpg"],
  },
};