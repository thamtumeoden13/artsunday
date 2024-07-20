import React from 'react'
import { DirectionAwareHover } from "./ui/DirectionAwareHover"
import { imageSliders } from "@/constants";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./ui/MagicButton";
import { LampContainer } from "./ui/Lamp";
import { motion } from "framer-motion";
import { Button } from "./ui/MovingBorder";

const RecentCategories = () => {
  return (
    <>

      <h1 className="heading" style={{ textAlign: 'left' }} >
        Thiết Kế {' '}
        <span className="text-purple">Nhà Phố</span>
      </h1>
      <MagicButton
        title="Nhà phố"
        icon={<FaLocationArrow />}
        position="right"
        otherClasses="bg-white text-slate-950 text-xl"
      />
      <div className="w-full mt-12 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {imageSliders.map((card, index) => (
          <DirectionAwareHover
            imageUrl={card.img}
            key={index}
          >
            <p className="font-bold text-xl">{card.desc}</p>
            {/* <p className="font-normal text-sm">$1299 / night</p> */}
          </DirectionAwareHover>

        ))}
      </div>
    </>
  )
}

export default RecentCategories