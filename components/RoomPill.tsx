import { featureIcons, Room } from "@/types/roomType";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const RoomPill = (individualRooms: Room[], groupRooms: Room[]) => {
  type RoomType = "individual" | "group";

  const [roomType, setRoomType] = useState<RoomType>("individual");
  const [visible, setVisible] = useState(false);

  const ref = useRef(null);

  const roomData: Record<RoomType, Room[]> = {
    individual: individualRooms,
    group: groupRooms,
  };

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mt-16 gap-8 flex flex-col md:flex-row justify-center items-center"
    >
      {roomData[roomType].map((room, index) => (
        <div
          key={room.name}
          className={`group overflow-hidden rounded-2xl border border-border/50 bg-[#FFFFFF]/50 shadow-sm backdrop-blur-xl transition-all duration-700 hover:border-primary/30 hover:shadow-xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
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
              {room.features?.slice(0, 5).map((feature) => {
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
  );
};

export default RoomPill;
