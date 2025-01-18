import React from 'react'
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Construction } from "@/sanity/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { CloudinaryImage } from "./shared/CloudinaryImage";
import { cn } from '@/lib/utils';

export type SimpleCardType = Omit<Construction, "author"> & { author?: Author };

const SimpleCard = ({ post, path, className }: { post: SimpleCardType, path: string, className?: string }) => {
  const {
    title,
    subtitle,
    thumbnail,
    slug
  } = post;

  return (
    <li className={cn("simple-card group", className)}>
      <div className={"flex w-full mt-5 gap-5"}>
        <div className={"flex-1 h-20"}>
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
      </div>
      <Link href={`/${path}/${slug?.current}`}>
        <CloudinaryImage
          src={thumbnail!}
          alt={subtitle ?? "Art Sunday"}
          width={500}
          height={500}
          className={"simple-card_img"}
        />
      </Link>
    </li>
  )
}
export default SimpleCard
