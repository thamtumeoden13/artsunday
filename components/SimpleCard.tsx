import React from 'react'
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export type SimpleCard = Omit<Startup, "author"> & { author?: Author };

const SimpleCard = ({ post, path }: { post: SimpleCard, path: string }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
    slug
  } = post;

  return (
    <li className={"simple-card group"}>
      {/* <div className={"flex-between"}>
        <p className={"simple-card_date"}> {formatDate(_createdAt)} </p>

        <div className={"flex gap-1.5"}>
          <EyeIcon className={"size-6 text-primary"} />
          <span className={"text-16-medium"}>{views}</span>
        </div>
      </div> */}

      <div className={"flex-between mt-5 gap-5"}>
        <div className={"flex-1 h-20"}>
          {/* <Link href={`/user/${author?._id}`}>
            <p className={"text-16-medium line-clamp-1"}>
              {author?.name}
            </p>
          </Link> */}
          <Link href={`/${path}/${slug?.current}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <h3 className={"text-20-medium !font-semibold line-clamp-2 !text-left"}>{title}</h3>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start" >
                  <p className='text-left text-white-100'> {title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </div>
        {/* <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || "https://placehold.co/48x48"}
            alt={"placeholder"}
            width={48} height={48} className={"rounded-full"}
          />
        </Link> */}
      </div>
      <Link href={`/${path}/${slug?.current}`}>
        {/* <p className={"simple-card_desc"}>
          {description}
        </p> */}
        <Image
          src={image!}
          alt={title!}
          width={280}
          height={200}
          className={"simple-card_img"}
        />
      </Link>

      <div className={"flex-between gap-3 mt-5"}>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <div className={"flex gap-1.5"}>
            <EyeIcon className={"size-6 text-primary"} />
            <span className={"text-16-medium"}>{views}</span>
          </div>
        </Link>
        <Button className={"simple-card_btn"} asChild>
          <Link href={`/${path}/${slug?.current}`}>
            Chi Tiết
          </Link>
        </Button>
      </div>
    </li>
  )
}
export default SimpleCard
