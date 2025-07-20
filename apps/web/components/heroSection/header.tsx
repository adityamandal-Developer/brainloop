"use client";
import Link from "next/link";
import { LogoIcon } from "@/components/logo";
import { Menu, MoonStar, SunDimIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const menuItems = [{ name: "Chat Now", href: "/chat" }];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="z-[999]">
      <nav className="absolute z-20 w-full pt-16">
        <motion.div
          className={cn(
            "mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-700 lg:px-12 w-[70%]",
            "bg-transparent backdrop-blur-3xl border border-gray-800"
          )}
        >
          <motion.div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6",
              "lg:py-4"
            )}
          >
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <LogoIcon />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu
                  className={cn(
                    "m-auto size-6 duration-200",
                    menuState && "rotate-180 scale-0 opacity-0"
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 m-auto size-6 duration-200",
                    !menuState && "-rotate-180 scale-0 opacity-0"
                  )}
                />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-amber-50 hover:text-amber/50 block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {menuState && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full lg:hidden overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-black border-none mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent"
                  >
                    <div className="lg:hidden">
                      <ul className="space-y-6 text-base">
                        {menuItems.map((item, index) => (
                          <li key={index}>
                            <Link
                              href={item.href}
                              className="text-amber-50 hover:text-amber/50 block duration-150"
                              onClick={() => setMenuState(false)}
                            >
                              <span>{item.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-center items-center w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-white"
                      >
                        <Link href="#">
                          <span>Login</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant={"ghost"}
                        className="text-white"
                      >
                        <Link href="#">
                          <span>Sign Up</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="h-5 w-5 p-0 bg-transparent hover:bg-transparent transition-all duration-200"
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                      >
                        {theme === "dark" ? (
                          <MoonStar className="h-5 w-5 text-white" />
                        ) : (
                          <SunDimIcon className="h-5 w-5 text-white" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-end space-x-4">
              <Button asChild variant="ghost" size="sm" className="text-white">
                <Link href="#">
                  <span>Login</span>
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant={"ghost"}
                className="text-white"
              >
                <Link href="#">
                  <span>Sign Up</span>
                </Link>
              </Button>
              <Button
                asChild
                className="h-5 w-5 p-0 bg-transparent hover:bg-transparent"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <MoonStar className="h-5 w-5 text-white" />
                ) : (
                  <SunDimIcon className="h-5 w-5 text-white" />
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </nav>
    </header>
  );
};
