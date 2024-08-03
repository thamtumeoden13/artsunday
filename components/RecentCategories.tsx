import React from 'react'
import { DirectionAwareHover } from "./ui/DirectionAwareHover"
import { imageSliders } from "@/constants";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./ui/MagicButton";
import { EvervaultCard, Icon } from "./ui/EvervaultCard";
import { CardBody, CardContainer, CardItem } from "./ui/3D-Card";
import Image from "next/image";
import Link from "next/link";

const RecentCategories = () => {
  return (
    <>
      <div className="mt-10">
        <h1 className="heading" style={{ textAlign: 'left' }} >
          Thiết Kế {' '}
          <span className="text-purple">Biệt Thự</span>
        </h1>
        <MagicButton
          title="Biệt thự"
          icon={<FaLocationArrow />}
          position="right"
          otherClasses="bg-white text-slate-950 text-xl"
        />
        <div className="w-full mt-12 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {imageSliders.map((card, index) => (
            <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start md:ml-auto mx-auto min-w-xs max-w-sm p-4 relative h-[30rem]">
              <DirectionAwareHover
                imageUrl={card.img}
                key={index}
                imageClassName="h-[20rem]"
                className="min-w-xs"
                childrenClassName="opacity-1"
              >
                <p className="font-bold text-lg overflow-hidden line-clamp-2">{card.desc}</p>
                {/* <p className="font-normal text-sm">$1299 / night</p> */}
              </DirectionAwareHover>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
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
        <div className="w-full mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20">
          {imageSliders.map((card) => (
            <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-star
            t max-w-sm sm:w-[30rem] mx-auto p-4 relative h-[28rem]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

              <EvervaultCard
                img={card.img}
                imageClassName="absolute group-hover/card:shadow-xl"
                className=" justify-start"
              />

              <h2 className="dark:text-white text-black mt-4 text-sm font-light">
                {card.desc}
              </h2>
              <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                <span>Xem ngay →</span>
                <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h1 className="heading" style={{ textAlign: 'left' }} >
          Thiết Kế {' '}
          <span className="text-purple">Thi Công</span>
        </h1>
        <MagicButton
          title="Thi Công"
          icon={<FaLocationArrow />}
          position="right"
          otherClasses="bg-white text-slate-950 text-xl"
        />
        <div className="w-full mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20">
          {imageSliders.map((card) => (
            <CardContainer className="inter-var" containerClassName="py-0">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] max-w-sm sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem translateZ="100" className="w-full mt-2">
                  <Image
                    // src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    src={card.img}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white mt-10"
                >
                  {card.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {card.desc}
                </CardItem>

                <div className="flex justify-between items-center">
                  <CardItem
                    translateZ={20}
                    // as={Link}
                    // href="https://twitter.com/mannupaaji"
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                      <span>Xem ngay →</span>
                      <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
                    </button>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </>
  )
}

export default RecentCategories