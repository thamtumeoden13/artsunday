import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { CONSTRUCTION_BY_ID_QUERY, PROJECTS_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import markdownit from "markdown-it";
import { auth } from "@/auth";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import ConstructionList from "@/components/ConstructionList";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
// import BreadcrumbComponent from "@/components/shared/Breadcrumb";

const md = markdownit();

export default async function Constructions({ params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id;

  const session = await auth();

  console.log(`session -> ${session?.id}`);

  const { data } = await sanityFetch({ query: CONSTRUCTION_BY_ID_QUERY, params: { id } });

  if (!data) return notFound();

  console.log(JSON.stringify(data.pitch));

  const parsedContent = md.render(data?.pitch || '');

  return (
    <>
      <section className={"pink_container !min-h-[230px] mt-32"}>
        <p className={"tag"}>{formatDate(data?._createdAt)}</p>

        <h1 className={"heading"}>{data.title}</h1>
        <p className={"sub-heading !max-w-5xl"}>{data.description}</p>
      </section>

      <section className={"section_container"}>
        <Image
          src={data.image}
          alt="thumbnail"
          height={704}
          width={1000}
          className={"w-full rounded-xl"}
        />

        <ProjectList key={data?._id} post={data} />

        <div className={"space-y-5 mt-10 max-w-7xl mx-auto"}>
          <h3 className={"text-30-bold"}>Bài Viết Chi Tiết</h3>
          {parsedContent ? (
            <article
              className={"prose max-w-4xl font-ibm-plex break-all"}
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
