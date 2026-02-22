"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "12+", label: "Years of Hosting" },
  { value: "2,400+", label: "Happy Guests" },
  { value: "4.9", label: "Guest Rating" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image column */}
          <div
            className={`relative transition-all duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-primary/10">
              <Image
                src="/images/about.jpg"
                alt="Misty morning view from Saanjh homestay balcony with tea"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating glassmorphic stat card */}
            <div className="absolute -bottom-6 -right-2 rounded-2xl border border-border/40 bg-[#FAF5F0]/70 px-7 py-5 shadow-xl backdrop-blur-xl sm:-right-8">
              <p className="font-serif text-3xl font-bold text-primary">
                7,000ft
              </p>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Above Sea Level
              </p>
            </div>
          </div>

          {/* Text column */}
          <div
            className={`transition-all delay-200 duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Our Story
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">
                Where the Mountains Sing at Dusk
              </span>
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Perched on a quiet ridge in the heart of the Himalayas, Saanjh
                was born from a simple dream: to share the magic of mountain
                sunsets with kindred spirits. The name itself means
                &ldquo;dusk&rdquo; in Hindi &mdash; that fleeting golden hour
                when the world pauses and the sky becomes a canvas of fire and
                amber.
              </p>
              <p>
                What began as a family home has evolved into a sanctuary for
                those seeking stillness. Every room faces the valley, every meal
                is cooked with locally-sourced ingredients, and every evening
                ends with the gentle strum of a guitar by the bonfire.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
