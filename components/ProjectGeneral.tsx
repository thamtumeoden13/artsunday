"use client";

import React, { useState } from 'react'

import { TracingBeam } from "@/components/ui/TracingBeam"
import Image from "next/image"
import { motion } from "framer-motion";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./ui/animated-modal"
import { imageSliders } from "@/constants";

const ProjectGeneral = () => {

  const [imageSelected, setImageSelected] = useState<string>(imageSliders[0]?.img || '');

  const handleImageSelected = (image: string) => {
    setImageSelected(image)
  }

  return (
    <>
      <TracingBeam className="px-6 max-w-6xl">
        <div className="mx-auto antialiased pt-4 relative">
          {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                {item.badge}
              </h2>

              <p className={"text-xl mb-4"}>
                {item.title}
              </p>

              <div className="text-sm prose prose-sm dark:prose-invert">
                {item?.image && (
                  <Modal>
                    <ModalTrigger className="flex justify-center group/modal-btn">
                      <Image
                        src={item.image}
                        alt="blog thumnail"
                        height="1000"
                        width="1000"
                        className="rounded-lg mb-10 object-cover"
                      />
                    </ModalTrigger>
                    <ModalBody className="md:max-w-[80%]">
                      <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                          Book your trip to{" "}
                          <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                            Bali
                          </span>{" "}
                          now! ✈️
                        </h4>
                        <div className="flex justify-center items-center gap-6">
                          {imageSliders.map(({ id, title, desc, img, }, idx) => (
                            <motion.div
                              key={"images" + idx}
                              style={{
                                rotate: Math.random() * 20 - 10,
                              }}
                              whileHover={{
                                scale: 1.1,
                                rotate: 0,
                                zIndex: 100,
                              }}
                              whileTap={{
                                scale: 1.1,
                                rotate: 0,
                                zIndex: 100,
                              }}
                              onClick={() => handleImageSelected(img)}
                              // onSelect={() => handleImageSelected(image)}
                              className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                            >
                              <Image
                                src={img}
                                alt="bali images"
                                width="500"
                                height="500"
                                className="rounded-lg h-16 w-16 md:h-20 md:w-20 object-cover flex-shrink-0"
                              />
                            </motion.div>
                          ))}
                        </div>
                        <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                          <Image
                            src={imageSelected}
                            alt="blog thumnail"
                            height="2000"
                            width="2000"
                            className="rounded-lg mb-10 object-cover"
                          />
                        </div>
                      </ModalContent>
                      {/* <ModalFooter className="gap-4">
                        <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                          Cancel
                        </button>
                        <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                          Book Now
                        </button>
                      </ModalFooter> */}
                    </ModalBody>
                  </Modal>
                )}

                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </>
  )
}

export default ProjectGeneral


const dummyContent = [
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <>
        <p>
          Sit duis est minim proident non nisi velit non consectetur. Esse
          adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
          Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
          incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
          fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
          nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
          occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
          officia sint labore. Tempor consectetur excepteur ut fugiat veniam
          commodo et labore dolore commodo pariatur.
        </p>
        <p>
          Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
          veniam in commodo id reprehenderit adipisicing. Proident duis
          exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
        </p>
        <p>
          Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
          reprehenderit deserunt amet laborum consequat adipisicing officia qui
          irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud.
          Amet culpa officia aliquip deserunt veniam deserunt officia
          adipisicing aliquip proident officia sunt.
        </p>
      </>
    ),
    badge: "React",
    image: "/assets/images/Art-sunday-thiet-ke-biet-thu-01.jpg",
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
        <p>
          In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
          veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
          reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
          cillum ut mollit.
        </p>
      </>
    ),
    badge: "Changelog",
    image: "/assets/images/Art-sunday-thiet-ke-nha-mai-thai-tan-uyen-binh-duong-03.jpg",
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
      </>
    ),
    badge: "Launch Week",
    image: "/assets/images/Art-sunday-thiet-ke-nha-pho-san-vuon-phong-cach-hien-dai-03.jpg"
  },
];
