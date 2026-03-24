"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { featureIcons, Room } from "@/types/roomType";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Users } from "lucide-react";

type RoomType = "individual" | "group";

const individualRooms: Room[] = [
  {
    name: "Dusk",
    tagline: "Largest luxury room in property",
    description:
      "Our signature room with panoramic Himalayan views, a king-size bed, and a balcony that opens to the first light of dawn.",
    image: "/images/dusk-room.avif",
    imageAlt: "Sunrise Suite at Saanjh with mountain views",
    guests: 2,
    highlights: ["Mountain View", "Living Area", "Balcony", "Wi-Fi", "And More"],
    bestValue: true,
  },
  {
    name: "Luna",
    tagline: "Serenity at every glance",
    description:
      "A cozy, warm room with a king-sized bed and private jacuzzi, featuring floor-to-ceiling valley views, rustic wooden interiors, handwoven textiles, and soft ambient lighting.",
    image: "/images/luna-room.avif",
    imageAlt: "Valley View Room with forest and valley panorama",
    guests: 2,
    highlights: ["Mountain View", "Cozy", "Jacuzzi", "Wi-Fi", "And More"],
  },
  {
    name: "Horizon",
    tagline: "Your private mountain hideaway",
    description:
      "A cozy attic room with a comfortable living area and a private balcony, offering a warm, intimate atmosphere with charming views and thoughtful details throughout.",
    image: "/images/horizon-room.avif",
    imageAlt: "Pine Cottage surrounded by forest at Saanjh",
    guests: 2,
    highlights: ["Balcony", "Living Area", "Wi-Fi", "And More"],
  },
];

const groupRooms: Room[] = [
  {
    name: "Upto 4 people",
    tagline: "Private Area (2Bed + Living Area + Balcony)",
    description:
      "Our signature 2Bed apartment featuring a private living area, comfortable bedrooms, and a balcony with beautiful views—perfect for relaxed mornings and unhurried evenings.",
    image: "/images/fourCombo.png",
    imageAlt: "Sunrise Suite at Saanjh with mountain views",
    guests: 4,
    highlights: ["Mountain View", "Fireplace", "Balcony", "Wi-Fi"],
  },
  {
    name: "Upto 10 people",
    tagline: "Private Villa (5Bed + 2Living Area + 2Balcony)",
    description:
      "A spacious 5Bed private villa offering complete exclusivity, with expansive interiors, large windows framing valley views, rustic wooden finishes, handwoven textiles, and warm ambient lighting throughout.",
    image: "/images/tenCombo.png",
    imageAlt: "Valley View Room with forest and valley panorama",
    guests: 10,
    highlights: ["Private Cottage", "Valley View", "Wooden Interiors", "Wi-Fi"],
  },
  {
    name: "Double Date",
    tagline: "2Bed + 2Jacuzzi",
    description:
      "A stylish 2Bed private retreat designed for double-date getaways, featuring two private jacuzzis, complete privacy, cozy living spaces, and a warm, romantic atmosphere throughout.",
    image: "/images/doubleD.png",
    imageAlt: "Pine Cottage surrounded by forest at Saanjh",
    guests: 4,
    highlights: ["Private Cottage", "Jacuzzi", "Wi-Fi", "Mountain View"],
  },
];

const roomData: Record<RoomType, Room[]> = {
  individual: individualRooms,
  group: groupRooms,
};

export default function Rooms() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [roomType, setRoomType] = useState<RoomType>("individual");

  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rooms"
      className="bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Accommodations
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">Find Your Perfect Retreat</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Each room at Saanjh is designed to be your home in the mountains.
            Wake up to birdsong, fall asleep to silence.
          </p>
        </div>

        <div className="w-full flex items-center justify-center mt-32 transition-all ">
          <ToggleGroup
            variant={"outline"}
            defaultValue={"individual"}
            type="single"
          >
            <ToggleGroupItem
              onClick={() => setRoomType("individual")}
              value="individual"
            >
              For Individuals
            </ToggleGroupItem>
            <ToggleGroupItem value="group" onClick={() => setRoomType("group")}>
              For Groups
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Room cards */}
        <div className="mt-16 gap-8 flex flex-col md:flex-row justify-center items-center">
          {roomData[roomType].map((room, index) => (
            <div
              key={room.name}
              className={`group overflow-hidden rounded-2xl border border-border/50 bg-[#FFFFFF]/50 shadow-sm backdrop-blur-xl transition-all duration-700 hover:border-primary/30 hover:shadow-xl ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-7">
                <p className="text-[11px] font-medium uppercase tracking-widest text-primary">
                  {room.tagline}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">
                  {room.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {room.description}
                </p>

                {/* Meta info */}
                <div className="mt-5 flex items-center gap-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {room.guests} Guests
                  </span>
                </div>

                {/* Feature pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.highlights.map((highlight) => {
                    const FeatureIcon = featureIcons[highlight];
                    return (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {FeatureIcon && <FeatureIcon className="h-3 w-3" />}
                        {highlight}
                      </span>
                    );
                  })}
                </div>

                {/* CTA */}
                <Link
                  href="#contact"
                  className="mt-7 flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                >
                  Book This Room
                </Link>
              </div>
            </div>
          ))}
          <div
            onClick={() => {
              router.push("/rooms");
            }}
            className={`relative w-full h-[50px] md:h-auto md:self-stretch md:w-[200px] flex items-center cursor-pointer justify-center overflow-hidden rounded-lg group
              ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="absolute inset-0 h-full w-full bg-primary group-hover:bg-secondary transition-all"></div>
            <p className="text-white z-10 font-semibold group-hover:text-primary text-sm md:[writing-mode:vertical-rl] md:rotate-180 duration-300 tracking-widest uppercase group-hover:scale-110 transition-all">
              Explore More →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
