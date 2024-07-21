import React from 'react'
import MagicButton from "./ui/MagicButton"
import { FaLocationArrow } from "react-icons/fa6"
import { imageSliders } from "@/constants"
import { DirectionAwareHover } from "./ui/DirectionAwareHover"
import { Button } from "./ui/MovingBorder"

const MostViews = () => {
  return (
    <>
      <div className="mt-12">
        <h1 className="heading" style={{ textAlign: 'left' }} >
          Xem {' '}
          <span className="text-purple">Nhiều Nhất</span>
        </h1>
        <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
          {imageSliders.map((card, index) => (
            <Button
              key={card.id}
              duration={Math.floor(Math.random() * 10000) + 10000}
              borderRadius="1.75rem"
              className="flex-1 text-white border-neutral-200 dark:border-slate-800"
            >
              <div className="flex lg:flex-row flex-col lg:items-center p-3 md:p-5 lg:p-10 py-6 gap-2">
                <img
                  src={card.img} alt={card.img}
                  className="lg:w-32 md:w-20 w-16"
                />
                <div className="lg:ms-5">
                  <h1 className="text-start text-xl md:2xl font-bold">
                    {card.title}
                  </h1>
                  <p className="text-start text-white-100 mt-3 font-semibold">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </>
  )
}

export default MostViews