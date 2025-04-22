"use client";

import { Author, Construction, Project } from "@/sanity/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ProjectProps = Omit<Project, "author" | "construction"> & {
  author?: Author;
} & { construction?: Construction };

export const columns: ColumnDef<ProjectProps>[] = [
  {
    accessorKey: "title",
    header: "Tiêu đề",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex items-center gap-3 max-w-80">
          <div className="flex flex-col">
            <span className="font-medium line-clamp-1">{request.title}</span>
            <span className="text-sm text-muted-foreground line-clamp-1">
              {request.subtitle}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "thumnail",
    header: "Ảnh đại diện",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={request.thumbnail || "/gsap.svg"}
            alt={request.title!}
            width={100}
            height={100}
            className="object-cover rounded-sm"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex flex-col max-w-80">
          <span className="line-clamp-2">{request.description}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "view detail",
    header: "Xem chi tiết",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <Button variant="link" className="px-2 h-auto p-0 text-blue-500">
          <Link target="_blank" href={`/bai-viet/${request?.slug?.current}`}>
            View Project
          </Link>
          <ExternalLink className="w-4 h-4 ml-1" />
        </Button>
      );
    },
  },
];
