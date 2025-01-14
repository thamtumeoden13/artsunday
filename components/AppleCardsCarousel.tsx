"use client";

import React from "react";
import { Carousel, AppleCard } from "@/components/ui/apple-cards-carousel";
import { Author, Construction, Project } from "@/sanity/types";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { testimonials_2 } from "@/constants";

export type ProjectCardType = Omit<Project, "author" | "construction"> & { author?: Author } & { construction?: Construction };

export function AppleCardsCarousel({ title, data }: { readonly title?: string, readonly data: readonly ProjectCardType[] }) {
  const cards = data.map((card: ProjectCardType, index: number) => (
    <AppleCard
      key={card._id}
      card={{ ...card, content: <AnimatedTestimonials testimonials={testimonials_2} /> }}
      index={index} className="lg:h-[72vh] md:h-[60vh]"
    />
  ));

  return (
    <div className="h-full max-w-full">
      {title &&
        <h2 className="pl-4 mx-auto font-sans text-xl font-bold max-w-7xl md:text-5xl text-neutral-800 dark:text-neutral-200">
          {title}
        </h2>
      }
      <Carousel items={cards} />
    </div>
  );
}
