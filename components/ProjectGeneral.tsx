// "use client";

import React, { } from 'react'

import Image from "next/image"
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger
} from "./ui/animated-modal"
import { imageSliders } from "@/constants";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { StartupCardType } from './StartupCard';
import markdownit from "markdown-it";
import { notFound } from 'next/navigation';

const md = markdownit();

const ProjectGeneral = ({ post }: { post: StartupCardType }) => {

  // const [imageSelected, setImageSelected] = useState<string>(imageSliders[0]?.img || '');

  // const handleImageSelected = (image: string) => {
  //   setImageSelected(image)
  // }

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '');

  return (
    <TracingBeam className="px-6 max-w-7xl">
      <div className="mx-auto antialiased pt-4 relative">

        <div className={"space-y-5 mt-10 px-4 max-w-6xl mx-auto"}>
          <div className={"flex-between gap-5"}>
            <Link
              href={`/app/(root)/user/${post?.author?._id}`}
              className={"flex gap-2 items-center mb-3"}
            >
              <Image
                src={post?.author?.image || ""}
                alt={"avatar"}
                width={64}
                height={64}
                className={"rounded-full drop-shadow-lg"}
              />

              <div>
                <p className={"text-20-medium"}>{post?.author?.name}</p>
                <p className={"text-16-medium !text-black-300"}>
                  {post.author?.username}
                </p>
              </div>
            </Link>

            <p className={"category-tag"}>{post.category}</p>
          </div>
          <div className="text-sm prose max-w-7xl dark:prose-invert">
            {post?.image && (
              <Image
                src={post.image}
                alt="blog thumnail"
                height="1000"
                width="1000"
                className="rounded-lg mb-10 object-cover"
              />
            )}

            {/* {item.description} */}
          </div>

          <h3 className={"text-30-bold"}>Pitch Details</h3>
          {parsedContent ? (
            <article
              className={"prose max-w-7xl font-work-sans break-all"}
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className={"no-result"}>No details provided</p>
          )}
        </div>
      </div>
    </TracingBeam>
  )
}

export default ProjectGeneral
