"use client";
import React from "react";
import Link from "next/link";
import { HeroHeader } from "./header";
import { InfiniteSlider } from "./infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { ChevronRight } from "lucide-react";
import { LineShadowText } from "./shadow-line-text";
import { ShinyButton } from "./trynow-button";
import Silk from "./silk-bg";
export default function HeroSection() {
  return (
    <main className="flex flex-col justify-between overflow-x-hidden overflow-scroll w-full h-full">
      <HeroHeader />
      <section className="bg-background h-screen p-3 sm:p-6">
        {/* relative container for background and content */}
        <div className="relative flex flex-col justify-center items-center h-full rounded-4xl overflow-hidden">
          {/* background layer */}
          <div className="absolute inset-0">
            <Silk
              speed={5}
              scale={1}
              color="#5227ff"
              noiseIntensity={1.5}
              rotation={0}
            />
          </div>

          <div className="z-50 flex gap-2 justify-center items-center flex-col text-center">
            <h1 className="text-balance text-[#D4ADFC] text-5xl leading-none tracking-wide sm:text-6xl md:text-7xl lg:text-8xl z-50">
              <span>brain</span>
              <LineShadowText className="italic" shadowColor={"white"}>
                loop
              </LineShadowText>
            </h1>
            <Link href={"/chat"}>
              <ShinyButton className="border-gray-700 hover:scale-110 transition-transform duration-300 rounded-full">
                <h1 className="flex justify-center items-center gap-2 text-amber-50">
                  Try now <ChevronRight className="h-4 w-4" />
                </h1>
              </ShinyButton>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background pb-2">
        <div className="group relative m-auto max-w-7xl px-6">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:max-w-44 md:border-r md:pr-6">
              <p className="text-end text-sm">Powering the best teams</p>
            </div>
            <div className="relative py-6 md:w-[calc(100%-11rem)]">
              <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                <div className="flex">
                  <img
                    className="mx-auto h-5 w-fit dark:invert"
                    src="https://html.tailus.io/blocks/customers/nvidia.svg"
                    alt="Nvidia Logo"
                    height="20"
                    width="auto"
                  />
                </div>

                <div className="flex">
                  <img
                    className="mx-auto h-4 w-fit dark:invert"
                    src="https://html.tailus.io/blocks/customers/column.svg"
                    alt="Column Logo"
                    height="16"
                    width="auto"
                  />
                </div>
                <div className="flex">
                  <img
                    className="mx-auto h-4 w-fit dark:invert"
                    src="https://html.tailus.io/blocks/customers/github.svg"
                    alt="GitHub Logo"
                    height="16"
                    width="auto"
                  />
                </div>
                <div className="flex">
                  <img
                    className="mx-auto h-5 w-fit dark:invert"
                    src="https://html.tailus.io/blocks/customers/nike.svg"
                    alt="Nike Logo"
                    height="20"
                    width="auto"
                  />
                </div>
                <div className="flex">
                  <img
                    className="mx-auto h-5 w-fit dark:invert"
                    src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                    alt="Lemon Squeezy Logo"
                    height="20"
                    width="auto"
                  />
                </div>
                <div className="flex">
                  <img
                    className="mx-auto h-4 w-fit dark:invert"
                    src="https://html.tailus.io/blocks/customers/laravel.svg"
                    alt="Laravel Logo"
                    height="16"
                    width="auto"
                  />
                </div>
                <div className="flex">
                  <img
                    className="mx-auto h-7 w-fit dark:invert"
                    src="https://html.tailus.io/blocks/customers/lilly.svg"
                    alt="Lilly Logo"
                    height="28"
                    width="auto"
                  />
                </div>

                <div className="flex">
                  <img
                    className="mx-auto h-6 w-fit dark:invert"
                    src="https://html.tailus.io/blocks/customers/openai.svg"
                    alt="OpenAI Logo"
                    height="24"
                    width="auto"
                  />
                </div>
              </InfiniteSlider>

              <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
              <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
              <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                direction="left"
                blurIntensity={1}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                direction="right"
                blurIntensity={1}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
