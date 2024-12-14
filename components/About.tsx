import React from 'react'
import { testimonials } from "@/constants"
import { InfiniteMovingCards } from './shared/InfiniteMovingCard'

const About = () => {
  return (
    <section id="clients" className="py-10">
      <h2 className="heading" style={{ textAlign: 'left' }}>
        Kind words {''}
        <span className="text-purple">satisfield clients</span>
      </h2>

      <div className="flex flex-col items-center max-lg:mt-10 mt-8">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className='max-w-7xl'
        />

        {/* <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map(({ id, name, img, nameImg }) => (
            <div
              key={id}
              className="flex md:max-w-60 max-w-32 gap-2"
            >
              <Image src={img} alt={name} className="md:w-10 w-5" />
              <Image src={nameImg} alt={name} className="md:w-24 w-20" />
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}

export default About