"use client"

import { Link as LinkScroll } from "react-scroll";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const Header = () => {

  const pathname = usePathname()
  console.log({ pathname })

  const isScrolled = pathname.includes('/user/');

  const [hasScrolled, setHasScrolled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // eslint-disable-next-line react/prop-types
  const NavLink = ({ name, route, }: { name: string, route?: string, }) => {
    if (route) {
      return (
        <Link
          href={route}
          className={
            "base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5"
          }
        >
          {name}
        </Link>
      )
    }
    return (
      <LinkScroll
        to={name}
        offset={-100}
        spy
        smooth
        activeClass={"nav-active"}
        className={
          "base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5"
        }
        onClick={() => setIsOpen(false)}
      >
        {name}
      </LinkScroll>
    );
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500" +
        " max-lg:py-4 bg-black",
        (hasScrolled || isScrolled) && "py-2 bg-black-200" + " backdrop-blur-[8px]",
      )}
    >
      <div className={"container flex h-14 items-center max-lg:px-5"}>
        <a className={"lg:hidden flex-1 cursor-pointer z-2"}>
          <Image src="/logo-1.png" alt="logo" width={60} height={30} />
        </a>

        <div
          className={clsx(
            "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-s2 max-lg:opacity-0",
            isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none",
          )}
        >
          <div
            className={
              "w-full max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden sidebar-before max-md:px-4"
            }
          >
            <nav className={"max-lg:relative max-lg:z-2 max-lg:my-auto"}>
              <ul className={"flex max-lg:block max-lg:px-12"}>
                <li className={"nav-li"}>
                  <NavLink name={"Trang Chủ"} route={"/"} />
                  <div className={"dot"} />
                  <NavLink name={"Hạng Mục"} route={"/hang-muc"} />
                  </li>
                <li className={"nav-logo"}>
                  {/* <LinkScroll
                    to={"hero"}
                    offset={-250}
                    spy
                    smooth
                    className={clsx(
                      "max-lg:hidden transition-transform duration-500 cursor-pointer",
                    )}
                  > */}
                  <Link
                    href={`/`}
                    className={clsx(
                      "max-lg:hidden transition-transform duration-500 cursor-pointer",
                    )}
                  >
                    <Image
                      src="/logo-1.png"
                      alt="logo"
                      width={60}
                      height={30}
                    />
                  </Link>
                  {/* </LinkScroll> */}
                </li>

                <li className={"nav-li"}>
                  <NavLink name={"Dự Án"} route={"/du-an"} />
                  <div className={"dot"} />
                  <NavLink name={"Thông Tin"} route={"/about"} />
                </li>
              </ul>
            </nav>

            <div
              className={
                "lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2 rotate-90"
              }
            >
              <Image
                src="/images/bg-outlines.svg"
                alt="outline"
                width={960}
                height={380}
                className={"relative z-2"}
              />
              <Image
                src="/images/bg-outlines-fill.png"
                alt="outline"
                width={960}
                height={380}
                className={"absolute inset-0 mix-blend-soft-light opacity-5"}
              />
            </div>
          </div>
        </div>

        <button
          className={
            "lg:hidden z-2 size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
          }
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <img
            src={`/images/${isOpen ? "close" : "magic"}.svg`}
            alt="magic"
            className={"size-1/2 object-contain"}
          />
        </button>
      </div>
    </header>
  );
};
export default Header;
