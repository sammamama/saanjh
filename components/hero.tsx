"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { useScroll, useTransform, motion, spring, easeIn, useSpring } from "framer-motion";

export default function Hero() {
  const parallaxRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 50,
    restDelta: 0.005,
  });

  const mountOne = useTransform(smoothProgress, [0, 1], ["0%", "0%"]);
  const mountTwo = useTransform(smoothProgress, [0, 1], ["10%", "-5%"]);
  const mountThree = useTransform(smoothProgress, [0, 1], ["13%", "-7%"]);

  const textY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      id="home"
      ref={parallaxRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden"
    >
      {/* Content */}
      <div className="relative w-full h-full">
        <Image
          alt="mountain image"
          src={"/images/mount-bg.png"}
          fill
          priority
          className="z-0 object-cover"
        />

        {/* Mountains */}
        <motion.div
          className="absolute inset-0 z-20 will-change-transform"
          style={{ y: mountOne }}
        >
          <Image
            alt="mountain image"
            src={"/images/1-mount.png"}
            fill
            priority
            className="md:scale-200 origin-bottom object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-30 will-change-transform"
          style={{ y: mountTwo }}
        >
          <Image alt="mountain image" src={"/images/2-mount.png"} className="object-cover absolute bottom-10  origin-bottom" fill priority />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-50 will-change-transform"
          style={{ y: mountThree }}
        >
          <Image alt="mountain image" src={"/images/3-mount.png"} className="object-cover" fill priority />
        </motion.div>

        <div className="absolute inset-0 z-30 bg-gradient-to-b from-[#1A1A1A]/30 via-[#1A1A1A]/20 to-[#1A1A1A]/30" />
      </div>

      {/* Text behind mountain */}
      <motion.div
        className="absolute z-30 w-full flex flex-col items-center will-change-transform"
        style={{ y: textY, top: "30%" }}
      >
        <p className="mb-5 text-xs uppercase tracking-[0.4em] text-[#FAF5F0]/60 sm:text-sm">
          A Himalayan Retreat
        </p>
        <h1 className="font-serif text-6xl font-bold leading-none text-[#FAF5F0] sm:text-7xl md:text-8xl lg:text-9xl">
          Saanjh
        </h1>
        <div className="mt-5 flex items-center gap-5">
          <span className="h-px w-14 bg-[#FAF5F0]/30" />
          <p className="font-serif text-lg italic text-[#FAF5F0]/70 sm:text-xl">
            The Musical Sunset
          </p>
          <span className="h-px w-14 bg-[#FAF5F0]/30" />
        </div>
      </motion.div>

      {/* Buttons — above gradient */}
      <div className="absolute bottom-40 z-50 w-full flex justify-center gap-4">
        <Link
          href="#rooms"
          className="rounded-full bg-primary px-9 py-3.5 text-base font-semibold text-primary-foreground ..."
        >
          Reserve Your Stay
        </Link>
        <Link
          href="#about"
          className="rounded-full border px-3 py-3.5 text-neutral-300 backdrop-blur-sm border-[#FAF5F0]/25 ..."
        >
          Explore More
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <Link
          href="#about"
          aria-label="Scroll to About section"
          className="flex animate-bounce flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#FAF5F0]/40">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 text-[#FAF5F0]/50" />
        </Link>
      </div>
    </section>
  );
}
