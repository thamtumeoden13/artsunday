'use client';

import { ImagesSlider } from "@/components/ui/ImagesSlider"
import { imageSliders } from "@/constants"
import { motion } from "framer-motion"
import { LampContainer } from "./ui/Lamp";
import { Boxes } from "./ui/background-boxes";

const HeroImageSilder = () => {
  return (
    <ImagesSlider
      images={imageSliders}
      className="relative h-[40rem] rounded-xl"
      overlayClassName="hover:bg-black/10"
      overlay={false}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="absolute z-50 bottom-10 left-10 h-[15rem] w-[30rem] overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg"
      >
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes className=" opacity-80" />
        <motion.p className="font-bold text-xl md:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <motion.button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Xem ngay →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </motion.button>

      </motion.div>
    </ImagesSlider>
  )
}

export default HeroImageSilder