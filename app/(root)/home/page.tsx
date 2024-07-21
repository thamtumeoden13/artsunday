import Clients from "@/components/Clients"
import HeroImageSilder from "@/components/HeroImageSilder"
import MostViews from "@/components/MostViews"
import RecentCategories from "@/components/RecentCategories"
import Header from "@/components/shared/Header"
import React from 'react'

const HomePage = () => {
  return (
    <>
      {/* <Header title="Home Page" /> */}

      <section className="mt-10 h-[50rem] w-full" id="hero-images">
        <HeroImageSilder />
      </section>

      <section className="mt-10 min-h-screen" id="recent-categories">
        <RecentCategories />
      </section>

      <section className="mt-10 min-h-[30rem]" id="most-views">
        <MostViews />
      </section>

      <section className="mt-10 min-h-[30rem]" id="testimonials">
        <Clients />
      </section>
    </>
  )
}

export default HomePage