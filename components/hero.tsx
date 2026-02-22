"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (parallaxRef.current) {
          const scrollY = window.scrollY;
          parallaxRef.current.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[700px] w-full overflow-hidden"
    >
      {/* Parallax background image */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 -top-24 -bottom-24 will-change-transform"
      >
        <Image
          src="/images/hero.jpg"
          alt="Saanjh Homestay nestled in the Himalayas at golden hour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/50 via-[#1A1A1A]/20 to-[#1A1A1A]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p
          className="mb-5 text-xs uppercase tracking-[0.4em] text-[#FAF5F0]/60 sm:text-sm"
        >
          A Himalayan Retreat
        </p>

        <h1 className="font-serif text-6xl font-bold leading-none text-[#FAF5F0] sm:text-7xl md:text-8xl lg:text-9xl">
          Saanjh
        </h1>

        <div className="mt-5 flex items-center gap-5">
          <span className="h-px w-14 bg-[#FAF5F0]/30" aria-hidden="true" />
          <p className="font-serif text-lg italic text-[#FAF5F0]/70 sm:text-xl">
            The Musical Sunset
          </p>
          <span className="h-px w-14 bg-[#FAF5F0]/30" aria-hidden="true" />
        </div>

        <p className="mt-8 max-w-lg text-sm leading-relaxed text-[#FAF5F0]/60 sm:text-base">
          Where the mountains meet the sky and every evening paints a new melody
          across the Himalayan horizon.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="#rooms"
            className="rounded-full bg-primary px-9 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
          >
            Reserve Your Stay
          </Link>
          <Link
            href="#about"
            className="rounded-full border border-[#FAF5F0]/25 bg-[#FAF5F0]/10 px-9 py-3.5 text-sm font-semibold text-[#FAF5F0] backdrop-blur-sm transition-all duration-300 hover:bg-[#FAF5F0]/20"
          >
            Explore More
          </Link>
        </div>
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
