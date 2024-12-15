'use client';

import { motion } from 'framer-motion';

import { projectNavList, socials } from '../constants';
import styles from '@/styles';
import { footerVariants } from '@/lib/utils';
import Image from 'next/image';
import { TextGenerateEffect } from './TextGenerateEffect';
import { Button } from './shared/MovingBorder';
import { IconDirectionSign } from '@tabler/icons-react';
import Link from 'next/link';
import { HoverBorderGradient } from './ui/hover-border-gradient';

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.paddings} py-8 relative bg-black overflow-hidden`}
  >
    <div className="footer-gradient" />
    <div
      className={`${styles.innerWidth} mx-auto flex flex-col gap-8 max-w-7xl`}
    >
      <div
        // className="flex items-center justify-between flex-wrap gap-5"
        className=' grid gap-5 md:grid-cols-2 grid-cols-1'
      >
        {/* <h4
					className="font-bold md:text-[64px] text-[44px] text-white"
				>
					Enter the Metaverse
				</h4> */}
        <div className="flex flex-col">
          <Image
            src={"/bg-artsunday.png"}
            alt='logo'
            width={500}
            height={500}
            className='object-contain w-[360px] h-[100px]'
          />
          <TextGenerateEffect
            className="font-medium text-left my-1 text-white-100 text-[20px] md:text-md lg:text-lg"
            words="Địa Chỉ: 17/13 Huỳnh Văn Luỹ, P.Phú Lợi, TP.Thủ Dầu Một, T.Bình Dương"
            idxTranfer={1}
          />
          <TextGenerateEffect
            className="font-medium text-left  my-1 text-white-100 text-[20px] md:text-md lg:text-lg"
            words="Số Điện Thoại: 0904 177 100"
            idxTranfer={2}
          />
          <TextGenerateEffect
            className="font-medium text-left  my-1 text-white-100 text-[20px] md:text-md lg:text-lg"
            words="Mã Số Thuế: 3702962067"
            idxTranfer={2}
          />
        </div>
        <div
          className="flex flex-col items-start gap-5"
        >
          <h4 className="w-full font-extrabold text-[24px] text-white">Dự Án</h4>
          <div className='flex items-center flex-wrap gap-2'>
            {projectNavList.map(({ title, href }) => (
              <Button
                key={title}
                duration={Math.floor(Math.random() * 10000) + 10000}
                borderRadius="1.75rem"
                className="flex-1 text-white border-slate-800"
              >
                <Link href={href} className='flex p-2 gap-2'>
                  <IconDirectionSign className="h-6 w-6 text-white" />
                  <span className="font-normal text-[16px] text-white hover:text-purple">{title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />
        <div
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <button
            type="button"
            className="flex items-center w-full md:w-[240px] h-fit py-4 px-6 bg-[#25618b] rounded-[32px] gap-[12px]"
          >
            <img
              src="/headset.svg"
              alt="headset"
              className="w-[24px] h-[24px] object-contain"
            />
            <span className="font-normal text-[16px] text-white">Bạn Cần Hỗ Trợ</span>
          </button>
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2023 - 2025 Art Sunday. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socials.map((social, index) => (
              <HoverBorderGradient
                key={social.name}
                containerClassName="rounded-full"
                as="button"
                className="bg-black flex items-center"
              >
                <img
                  src={social.url}
                  alt={social.name}
                  className="object-contain cursor-pointer"
                />
              </HoverBorderGradient>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
