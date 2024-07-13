import React from 'react'
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid"
import { gridItems } from "@/constants"

const Grid = () => {
  return (
    <section id="about">
      <BentoGrid>
        {gridItems.map(({ id, title, description, className, img, imgClassName, titleClassName, spareImg }, i) => (
          <BentoGridItem
            id={id}
            key={id}
            title={title}
            description={description}
            img={img}
            imgClassName={imgClassName}
            className={className}
            titleClassName={titleClassName}
            spareImg={spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  )
}

export default Grid