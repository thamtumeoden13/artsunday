"use client";

import React, { useState } from 'react'

import Image from "next/image"
import { motion } from "framer-motion";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "../ui/animated-modal"
import { imageSliders } from "@/constants";
import { Lens } from '../ui/lens';

const ImageModal = ({ item }: { item: any }) => {

  const [imageSelected, setImageSelected] = useState<string>(imageSliders[0]?.img || '');

  const [hovering, setHovering] = useState(false);

  const handleImageSelected = (image: string) => {
    setImageSelected(image)
  }

  return (
    <Modal>
      <ModalTrigger className="flex justify-center group/modal-btn">
        <Image
          src={item.image}
          alt="blog thumnail"
          width={760}
          height={540}
          className="rounded-lg mb-10 object-cover"
        />
      </ModalTrigger>
      <ModalBody className="md:max-w-[90%] max-w-[90%] rounded-2xl">
        <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            {item?.title}
          </h4>
          <div className='grid md:grid-cols-[330px_1fr] grid-cols-1 '>
            <div className="flex flex-col max-md:flex-row justify-around items-center">
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
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={title}
                    width={160}
                    height={114}
                    className="rounded-lg object-cover flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>
            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-4xl mx-auto">
              <Lens hovering={hovering} setHovering={setHovering}>
                <Image
                  src={imageSelected}
                  alt="blog thumnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-4 object-cover"
                />
              </Lens>
            </div>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}

export default ImageModal

