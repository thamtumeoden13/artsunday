import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { CONSTRUCTION_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import markdownit from "markdown-it";
import { auth } from "@/auth";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import ConstructionList from "@/components/ConstructionList";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { CloudinaryImage } from "@/components/shared/CloudinaryImage";
// import BreadcrumbComponent from "@/components/shared/Breadcrumb";

const md = markdownit();

export default async function Constructions({ params }: { params: Promise<{ slug: string }> }) {

  const slug = (await params).slug;

  const session = await auth();

  console.log(`session -> ${session?.id}`);

  const { data } = await sanityFetch({ query: CONSTRUCTION_BY_SLUG_QUERY, params: { slug } });

  if (!data) return notFound();

  const parsedContent = md.render(data?.pitch || '');

  return (
    <>
      <MarkupSchema post={data} path={`hang-muc/${slug}`} />

      <section className={"pink_container !min-h-[230px] mt-32"}>
        <p className={"tag"}>{formatDate(data?._createdAt)}</p>

        <h1 className={"heading"}>{data.title}</h1>
        <p className={"sub-heading !max-w-5xl"}>{data.description}</p>
      </section>

      <section className={"section_container"}>
        <CloudinaryImage
          src={data.thumbnail}
          alt={data.subtitle || "Art Sunday"}
          width={760}
          height={540}
          className="max-h-[44rem] rounded-lg w-full mb-10 object-cover"
        />

        <ProjectList key={data?._id} post={data} className="!justify-items-start !px-0" />

        <div className={"space-y-5 mt-10 max-w-7xl mx-auto"}>
          <h3 className={"text-30-bold"}>Bài Viết Chi Tiết</h3>
          {parsedContent ? (
            <article
              className={"prose max-w-7xl font-ibm-plex text-justify"}
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className={"no-result"}>Không tìm thấy thông tin phù hợp</p>
          )}
        </div>

        <hr className={"divider"} />

      </section>
      <SanityLive />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  // Fetch dữ liệu sản phẩm từ API hoặc database
  const { data } = await sanityFetch({ query: CONSTRUCTION_BY_SLUG_QUERY, params: { slug } });

  return {
    title: `${data?.title} - Art Sunday`,
    description: `${data?.description}`,
    openGraph: {
      title: `${data?.title} - Art Sunday`,
      description: `${data?.description}`,
      url: `http://artsunday.vn/hang-muc/${slug}`,
      images: [
        {
          url: data.image,
          width: 800,
          height: 600,
          alt: data?.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data?.name} - Art Sunday`,
      description: `${data?.description}`,
      images: [data?.image],
    },
  };
}