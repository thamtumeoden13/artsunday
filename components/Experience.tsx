import { workExperience } from '@/constants'
import React from 'react'
import { Button } from './shared/MovingBorder'
import Image from "next/image"

const Experience = () => {
  return (
    <section className="py-20" id="testimonials">
      <h1 className="heading !text-left">
        My{' '}
        <span className="text-purple">work experience</span>
      </h1>
      <div className="max-w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            className="flex-1 text-white border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 md:p-5 lg:p-10 py-6 gap-2">
              <img
                src={card.thumbnail} alt={card.thumbnail}
                className="lg:w-32 md:w-20 w-16"
              />
              <div className="lg:ms-5">
                <h3 className="text-start text-xl md:2xl font-bold">
                  {card.title}
                </h3>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  )
}

export default Experience