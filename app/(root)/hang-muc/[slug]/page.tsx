import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { CONSTRUCTION_BY_ID_QUERY, CONSTRUCTION_BY_SLUG_QUERY, PROJECTS_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import markdownit from "markdown-it";
import { auth } from "@/auth";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import ConstructionList from "@/components/ConstructionList";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import MarkupSchema from "@/components/shared/MarkupSchema";
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
        <Image
          src={data.image}
          alt="thumbnail"
          height={1000}
          width={1000}
          className={"h-[44rem] w-full rounded-xl"}
        />

        <ProjectList key={data?._id} post={data} />

        <div className={"space-y-5 mt-10 max-w-7xl mx-auto"}>
          <h3 className={"text-30-bold"}>Pitch Details</h3>
          {parsedContent ? (
            <article
              className={"prose max-w-4xl font-work-sans break-all"}
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className={"no-result"}>No details provided</p>
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
    title: `${data.title} - Cốc Cốc Studio`,
    description: `${data.description}`,
    openGraph: {
      title: `${data.title} - Cốc Cốc Studio`,
      description: `${data.description}`,
      url: `http://cococstudio.com/hang-muc/${slug}`,
      images: [
        {
          url: data.image,
          width: 800,
          height: 600,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} - Cốc Cốc Studio`,
      description: `${data.description}`,
      images: [data.image],
    },
  };
}