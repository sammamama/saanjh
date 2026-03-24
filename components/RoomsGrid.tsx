"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import { Room, GroupRoom, featureIcons } from "@/types/roomType";
import { toRoomSlug } from "@/lib/utils";

type Tab = "individual" | "group";

interface Props {
  individualRooms: Room[];
  groupRooms: GroupRoom[];
}

function RoomCard({ room, index }: { room: Room | GroupRoom; index: number }) {
  const groupRoom = "rooms" in room ? (room as GroupRoom) : null;

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white/60 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="relative h-[350px] overflow-hidden">
        <Image
          src={room.image}
          alt={room.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {room.bestValue && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground shadow">
            Best Value
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
          <Users className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Up to {room.guests} guests</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
          {room.tagline}
        </p>
        <h3 className="mt-1.5 font-serif text-xl font-bold text-foreground">
          {room.name}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {room.description.replace(/\\n/g, " ").trim()}
        </p>

        {/* Highlights */}
        <div className="mt-4 flex flex-wrap gap-2">
          {room.highlights.slice(0, 5).map((h) => {
            const Icon = featureIcons[h];
            return (
              <span
                key={h}
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
              >
                {Icon && <Icon className="h-3 w-3" />}
                {h}
              </span>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href={`/rooms/${toRoomSlug(room.name)}`}
          className="mt-6 flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
        >
          Book This Room
        </Link>
      </div>
    </div>
  );
}

export default function RoomsGrid({ individualRooms, groupRooms }: Props) {
  const [tab, setTab] = useState<Tab>("individual");

  const rooms = tab === "individual" ? individualRooms : groupRooms;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Link href="/" className="flex flex-col leading-none text-center">
            <span className="font-serif text-xl font-bold tracking-tight text-foreground">
              Saanjh
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-primary">
              The Musical Sunset
            </span>
          </Link>
          <Link
            href="/#contact"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:inline-flex"
          >
            Book Now
          </Link>
          <div className="w-20 sm:hidden" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Page header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Accommodations
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Find Your Perfect Retreat
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Each room at Saanjh is designed to be your home in the mountains.
            Wake up to birdsong, fall asleep to silence.
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-secondary p-1">
            <button
              onClick={() => setTab("individual")}
              className={`rounded-full px-7 py-2.5 text-sm font-semibold transition-all duration-300 ${
                tab === "individual"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Individual Rooms
            </button>
            <button
              onClick={() => setTab("group")}
              className={`rounded-full px-7 py-2.5 text-sm font-semibold transition-all duration-300 ${
                tab === "group"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Group Packages
            </button>
          </div>
        </div>

        {/* Section label */}
        <div className="mb-8 mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {tab === "individual"
              ? `${rooms.length} Individual Rooms`
              : `${rooms.length} Group Packages`}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <RoomCard key={room.name} room={room} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-2xl border border-primary/15 bg-primary/5 px-8 py-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Ready to stay?
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">
            Book Your Mountain Escape
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Reach out to us directly and we&apos;ll help you find the perfect
            room for your stay.
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-primary px-10 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
