import SearchForm from "@/components/SearchForm";
import { CONSTRUCTIONS_BY_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import ConstructionList from "@/components/ConstructionList";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { Metadata } from "next/types";
import { SimpleCardType } from "@/components/SimpleCard";
import { notFound } from "next/navigation";

export default async function Construction({ searchParams }: {
  readonly searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const params = { search: query ?? null };

  console.log(`params: ${query}`)

  const { data: searchForConstructions } = await sanityFetch({ query: CONSTRUCTIONS_BY_QUERY, params });

    if (!searchForConstructions) return notFound();
  

  return (
    <>
      <MarkupSchema path="thi-cong" />

      <section className={"pink_container"}>
        <h1 className={"heading"}>
          Kết Nối Với Chúng Tôi
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Hãy Chọn Công Trình Mà Bạn Quan Tâm.
        </p>

        <SearchForm query={query} path="thi-cong" search="Công Trình" />
      </section>


      {searchForConstructions?.length > 0 ? (
        searchForConstructions.map((post: SimpleCardType) => (
          <ConstructionList key={post?._id} post={post} />
        ))
      ) : (
        <section className={"section_container"}>
          <p className={"no-result"}>
            Không tìm thấy công trình
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