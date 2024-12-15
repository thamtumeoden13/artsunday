"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarousel({ title }: { title?: string }) {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} className="lg:h-[72vh] md:h-[60vh]" />
  ));

  return (
    <div className="max-w-full h-full">
      {title &&
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          {title}
        </h2>
      }
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Thiết kế công trình Công giáo
              </span>{" "}
              là sự kết hợp giữa nghệ thuật kiến trúc, biểu tượng tôn giáo và không gian tâm linh, tạo nên một nơi thờ phượng trang nghiêm, linh thiêng và gần gũi với cộng đồng tín hữu. Các công trình này thường mang đậm dấu ấn của văn hóa, truyền thống, và niềm tin tôn giáo của từng vùng miền, thể hiện sự giao thoa giữa nghệ thuật và tín ngưỡng.
            </p>
            <Image
              src="https://images.pexels.com/photos/89887/pexels-photo-89887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Macbook mockup from Aceternity UI"
              width={640}
              height={450}
              className="h-full w-[90%] mx-auto object-cover rounded-2xl my-4"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Công Trình Tôn Giáo",
    title: "Tư Vấn, Thiết Kế và Thi Công Công Trình Tôn Giáo",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Thiết Kế Nội Thất",
    title: "Tư vấn, Thiết kế nội thất",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Thiết Kế Nhà Phố",
    title: "Tư Vấn, Thiết Kế và Thi Công Nhà Phố",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Thiết kế Sân Vườn",
    title: "Tư Vấn, Thiết Kế và Thi Công Nhà Vườn",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },

  {
    category: "Thiết Kế Biệt Thự",
    title: "Tư Vấn và Thiết Kế Biệt Thự",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];
