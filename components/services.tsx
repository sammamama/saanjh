"use client";

import Image from "next/image";
import { Coffee, Mountain, Flame, Music } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: Coffee,
    title: "Mountain Cafe",
    description:
      "Start your morning with hand-brewed Himalayan coffee and freshly baked goods on a terrace overlooking the valley. Our cafe serves local organic fare from farm to table.",
    image: "/images/dining-rua.jpeg",
    imageAlt: "Saanjh mountain cafe terrace with fresh beverages",
  },
  {
    icon: Mountain,
    title: "Luxury Rooms",
    description:
      "Explore hidden trails, alpine meadows, and ancient village paths with our expert local guides. From gentle sunrise walks to full-day summit expeditions.",
    image: "/images/dusk-bed.avif",
    imageAlt: "Mountain trail through Himalayan landscape",
  },
  {
    icon: Flame,
    title: "Bonfire Evenings",
    description:
      "As the sun dips behind the peaks, gather around a crackling fire under a canopy of stars. Stories, songs, and the warmth of shared moments await.",
    image: "/images/bon.png",
    imageAlt: "Evening bonfire at Saanjh homestay under starry sky",
  },
  {
    icon: Music,
    title: "Live Music Nights",
    description:
      "Every weekend, local artists and travelling musicians fill the mountain air with folk melodies. The sunset becomes the stage, and you become part of the performance.",
    image: "/images/hero.jpg",
    imageAlt: "Live music performance at mountain homestay",
  },
];

export default function Services() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Experiences
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">
              More Than a Stay, It&apos;s a Way of Living
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            At Saanjh, every experience is crafted to connect you deeper with
            the mountains, the culture, and yourself.
          </p>
        </div>

        {/* Services bento grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                } ${index === 0 ? "sm:row-span-2" : ""}`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                {/* Background image */}
                <div
                  className={`relative w-full overflow-hidden ${
                    index === 0 ? "h-full min-h-[520px]" : "h-72 sm:h-80"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/30 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#FAF5F0]/20 bg-[#FAF5F0]/10 backdrop-blur-md">
                      <Icon className="h-5 w-5 text-[#FAF5F0]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#FAF5F0] sm:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#FAF5F0]/65">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
