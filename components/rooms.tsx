"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Maximize2,
  Wifi,
  Eye,
  TreePine,
  FlameKindling,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const featureIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  "Mountain View": Eye,
  "Valley View": Eye,
  Fireplace: FlameKindling,
  "Private Cottage": TreePine,
};

interface Room {
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  guests: number;
  size: string;
  features: string[];
}

type RoomType = "individual" | "group";

const individualRooms = [
  {
    name: "Sunrise Suite",
    tagline: "Wake up with the peaks",
    description:
      "Our signature room with panoramic Himalayan views, a king-size bed, private fireplace, and a balcony that opens to the first light of dawn.",
    price: 4500,
    image: "/images/room-sunrise.jpg",
    imageAlt: "Sunrise Suite at Saanjh with mountain views",
    guests: 2,
    size: "400 sq ft",
    features: ["Mountain View", "Fireplace", "Balcony", "Wi-Fi"],
  },
  {
    name: "Valley View Room",
    tagline: "Serenity at every glance",
    description:
      "A cozy double room with floor-to-ceiling windows framing the valley below. Rustic wooden interiors, handwoven textiles, and warm ambient lighting.",
    price: 3200,
    image: "/images/room-valley.jpg",
    imageAlt: "Valley View Room with forest and valley panorama",
    guests: 2,
    size: "320 sq ft",
    features: ["Valley View", "Wooden Interiors", "Reading Nook", "Wi-Fi"],
  },
  {
    name: "Pine Cottage",
    tagline: "Your private mountain hideaway",
    description:
      "A standalone cottage surrounded by pine trees, offering complete privacy with its own garden patio, outdoor seating, and a romantic wood-burning stove.",
    price: 5800,
    image: "/images/room-pine.jpg",
    imageAlt: "Pine Cottage surrounded by forest at Saanjh",
    guests: 3,
    size: "520 sq ft",
    features: ["Private Cottage", "Garden Patio", "Wood Stove", "Wi-Fi"],
  },
];

const groupRooms = [
  {
    name: "Upto 4 people",
    tagline: "Wake up with the peaks",
    description:
      "Our signature room with panoramic Himalayan views, a king-size bed, private fireplace, and a balcony that opens to the first light of dawn.",
    price: 4500,
    image: "/images/room-sunrise.jpg",
    imageAlt: "Sunrise Suite at Saanjh with mountain views",
    guests: 2,
    size: "400 sq ft",
    features: ["Mountain View", "Fireplace", "Balcony", "Wi-Fi"],
  },
  {
    name: "Upto 10 people",
    tagline: "Serenity at every glance",
    description:
      "A cozy double room with floor-to-ceiling windows framing the valley below. Rustic wooden interiors, handwoven textiles, and warm ambient lighting.",
    price: 3200,
    image: "/images/room-valley.jpg",
    imageAlt: "Valley View Room with forest and valley panorama",
    guests: 2,
    size: "320 sq ft",
    features: ["Valley View", "Wooden Interiors", "Reading Nook", "Wi-Fi"],
  },
  {
    name: "Upto 30 people",
    tagline: "Your private mountain hideaway",
    description:
      "A standalone cottage surrounded by pine trees, offering complete privacy with its own garden patio, outdoor seating, and a romantic wood-burning stove.",
    price: 5800,
    image: "/images/room-pine.jpg",
    imageAlt: "Pine Cottage surrounded by forest at Saanjh",
    guests: 3,
    size: "520 sq ft",
    features: ["Private Cottage", "Garden Patio", "Wood Stove", "Wi-Fi"],
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
            <ToggleGroupItem 
              value="group" 
              onClick={() => setRoomType("group")}
            >
              For Groups
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Room cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                <div className="absolute top-4 right-4 rounded-full border border-[#FAF5F0]/20 bg-[#1A1A1A]/40 px-4 py-1.5 backdrop-blur-md">
                  <span className="text-xs font-semibold text-[#FAF5F0]">
                    {"\u20B9"}
                    {room.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] font-normal text-[#FAF5F0]/60">
                    /night
                  </span>
                </div>
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
                  <span className="flex items-center gap-1.5">
                    <Maximize2 className="h-3.5 w-3.5" />
                    {room.size}
                  </span>
                </div>

                {/* Feature pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.features.map((feature) => {
                    const FeatureIcon = featureIcons[feature];
                    return (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {FeatureIcon && <FeatureIcon className="h-3 w-3" />}
                        {feature}
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
        </div>
      </div>
    </section>
  );
}
