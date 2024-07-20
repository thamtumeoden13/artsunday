import HeroImageSilder from "@/components/HeroImageSilder"
import RecentCategories from "@/components/RecentCategories"
import Header from "@/components/shared/Header"
import React from 'react'

const HomePage = () => {
  return (
    <>
      <Header title="Home Page" />

      <section className="mt-10 h-[50rem] w-full" id="hero-images">
        <HeroImageSilder />
      </section>

      <section className="mt-10 min-h-screen" id="recent-categories">
        <RecentCategories />
      </section>
    </>
  )
}

export default HomePage