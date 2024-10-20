"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import HourCard from "./HourCard";
import type { HourData } from "@/types/WeatherFlags";

const CarouselHours = ({ hoursToDisplay }: { hoursToDisplay: HourData[] }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const animationFrame = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (!api) return;

    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    animationFrame.current = requestAnimationFrame(() => {
      setScrollProgress(api.scrollProgress());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;

    api.on("scroll", handleScroll);

    return () => {
      api.off("scroll", handleScroll);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [api, handleScroll]);

  return (
    <>
      <Carousel
        className="min-h-[112px] cursor-grab active:cursor-grabbing"
        setApi={setApi}
        opts={{ align: "start" }}
      >
        <CarouselContent>
          {hoursToDisplay?.map((hour) => (
            <CarouselItem key={hour.time} className="basis-1/3 lg:basis-1/4">
              <HourCard hour={hour} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div
        className="absolute -left-full bottom-0 h-[2px] w-full bg-gradient-to-r from-slate-200/20 to-slate-400/40 transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${scrollProgress * 100}%,0,0)`,
        }}
      />
    </>
  );
};

export default CarouselHours;