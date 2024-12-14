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
      <MarkupSchema  path={`chi-tiet-du-an`}/>
      
      <section className={"pink_container !min-h-[230px] mt-32"}>
        <h1 className={"heading"}>
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competition
        </p>
        <SearchForm query={query} path="chi-tiet-du-an"/>
      </section>
      <section className={"section_container"}>
        <p className={"text-30-semibold"}>
          {query ? `Tìm kiếm cho "${query}"` : 'Tất cả dự án'}
        </p>
        <ul className={"mt-7 card_grid"}>
          {searchForProjects?.length > 0 ? (
            searchForProjects.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} path="chi-tiet-du-an" />
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
