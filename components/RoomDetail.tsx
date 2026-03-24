"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, X, ChevronLeft, ChevronRight,
  Users, MapPin, Layers, Camera,
} from "lucide-react";
import { Room, GroupRoom, featureIcons } from "@/types/roomType";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { differenceInCalendarDays } from "date-fns";

// ── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_PRICES: Record<string, number> = {
  Dusk: 8500, Twilight: 6500, Horizon: 7000, Starling: 7500, Eve: 7000,
  Eclipse: 11000, Comet: 10000, Luna: 9500, Myst: 9500,
  "The Sunset Suite": 15000, "The Attic Collective": 18000,
  "Saanjh — The Full Musical Sunset": 32000,
  "The Celestial Couple": 19000, "The Comet Duplex": 10000,
  "The Orbit": 21000, "The Grand Himalayan": 55000,
};

const BOOKED_DATES = [
  ...Array.from({ length: 4 }, (_, i) => new Date(2026, 3, 5 + i)),
  ...Array.from({ length: 4 }, (_, i) => new Date(2026, 3, 15 + i)),
  ...Array.from({ length: 3 }, (_, i) => new Date(2026, 4, 2 + i)),
];

type Category = "Bedroom" | "Kitchen";
const CATEGORY_ORDER: Category[] = ["Bedroom", "Kitchen"];

const BASE_CATEGORY_IMAGES: Record<Category, string[]> = {
  Bedroom: [
    "/images/dusk-room.avif",
    "/images/dusk-bed.avif",
    "/images/luna-room.avif",
    "/images/horizon-room.avif",
    "/images/mount-bg.png",
  ],
  Kitchen: [
    "/images/dining-rua.jpeg",
    "/images/bon.png",
    "/images/1-mount.png",
    "/images/2-mount.png",
    "/images/3-mount.png",
  ],
};

function buildCategoryImages(roomImage: string): Record<Category, string[]> {
  return {
    Bedroom: [roomImage, ...BASE_CATEGORY_IMAGES.Bedroom.filter((i) => i !== roomImage)].slice(0, 6),
    Kitchen: BASE_CATEGORY_IMAGES.Kitchen,
  };
}

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(n);
}

function parseDescription(raw: string): string[] {
  return raw.split(/\\n|\n/).map((p) => p.trim()).filter(Boolean);
}

// ── Gallery Modal (fullscreen lightbox) ──────────────────────────────────────
// Note: body overflow is managed by PhotoBrowser, not here.

function GalleryModal({
  images, initial, onClose,
}: {
  images: string[]; initial: number; onClose: () => void;
}) {
  const [idx, setIdx] = useState(initial);

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-[#0D0D0D]">
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between px-6 py-4">
        <span className="tabular-nums text-sm font-medium text-white/50">
          {idx + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          aria-label="Close photo"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Main image */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-14">
        <button
          onClick={prev}
          className="absolute left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        <div className="relative h-full w-full">
          <Image
            key={idx}
            src={images[idx]}
            alt={`Photo ${idx + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>

        <button
          onClick={next}
          className="absolute right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          aria-label="Next photo"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex shrink-0 gap-2 overflow-x-auto px-6 py-4">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all ${
              i === idx
                ? "ring-2 ring-primary opacity-100"
                : "opacity-40 hover:opacity-70"
            }`}
          >
            <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="96px" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Photo Browser (scroll-driven category tracking) ──────────────────────────

function PhotoBrowser({
  roomImage, roomName, onClose,
}: {
  roomImage: string; roomName: string; onClose: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState<Category>("Bedroom");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryStart, setGalleryStart] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Partial<Record<Category, HTMLDivElement>>>({});

  const categories = buildCategoryImages(roomImage);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Update active label as user scrolls through sections
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      let current: Category = CATEGORY_ORDER[0];
      for (const cat of CATEGORY_ORDER) {
        const el = sectionRefs.current[cat];
        if (!el) continue;
        if (el.offsetTop <= container.scrollTop + container.clientHeight * 0.4) {
          current = cat;
        }
      }
      setActiveCategory(current);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // Clicking a label smoothly scrolls the right panel to that section
  const scrollToCategory = (cat: Category) => {
    const container = scrollRef.current;
    const section = sectionRefs.current[cat];
    if (!container || !section) return;
    container.scrollTo({ top: section.offsetTop - 16, behavior: "smooth" });
  };

  const openGallery = (cat: Category, i: number) => {
    setGalleryImages(categories[cat]);
    setGalleryStart(i);
    setGalleryOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-100 flex flex-col bg-background">
        {/* ── Header ── */}
        <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-6 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">Photos</p>
            <h2 className="font-serif text-xl font-bold text-foreground">{roomName}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Close photos"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* ── Mobile: tabs highlight tracks scroll ── */}
        <div className="flex shrink-0 gap-2 border-b border-border/60 px-6 py-3 md:hidden">
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
              <span className={`ml-1.5 text-xs ${activeCategory === cat ? "text-primary-foreground/60" : "text-muted-foreground/60"}`}>
                {categories[cat].length}
              </span>
            </button>
          ))}
        </div>

        {/* ── Body ── */}
        <div className="flex min-h-0 flex-1">
          {/* Desktop left sidebar — highlight auto-follows scroll */}
          <div className="hidden w-56 shrink-0 flex-col gap-1 border-r border-border/60 bg-secondary/20 px-4 py-6 md:flex">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Categories
            </p>
            {CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span>{cat}</span>
                <span className={`tabular-nums text-xs ${activeCategory === cat ? "text-primary-foreground/60" : "text-muted-foreground/50"}`}>
                  {categories[cat].length}
                </span>
              </button>
            ))}
          </div>

          {/* Right: all category sections stacked, single scrollable column */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
            {CATEGORY_ORDER.map((cat) => (
              <div
                key={cat}
                ref={(el) => { if (el) sectionRefs.current[cat] = el; }}
                className="mb-14"
              >
                <h3 className="mb-6 font-serif text-2xl font-bold text-foreground">
                  {cat}
                  <span className="ml-3 text-base font-normal text-muted-foreground">
                    {categories[cat].length} photos
                  </span>
                </h3>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                  {categories[cat].map((src, i) => (
                    <div
                      key={i}
                      onClick={() => openGallery(cat, i)}
                      className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-xl border border-border/40 shadow-sm"
                    >
                      <Image
                        src={src}
                        alt={`${cat} photo ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                          <Camera className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen gallery layers on top of the browser */}
      {galleryOpen && (
        <GalleryModal
          images={galleryImages}
          initial={galleryStart}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
}

// ── Features Section ──────────────────────────────────────────────────────────

function FeaturesSection({ features }: { features: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? features : features.slice(0, 10);

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-foreground">
        What this place offers
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {shown.map((f) => {
          const Icon = featureIcons[f];
          return (
            <div key={f} className="flex items-center gap-3 py-1.5">
              {Icon ? (
                <Icon className="h-4.5 w-4.5 shrink-0 text-primary" />
              ) : (
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              )}
              <span className="text-sm text-foreground">{f}</span>
            </div>
          );
        })}
      </div>
      {features.length > 10 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-5 rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          {expanded ? "Show less" : `Show all ${features.length} amenities`}
        </button>
      )}
    </div>
  );
}

// ── Booking Card ──────────────────────────────────────────────────────────────

function BookingCard({ price, guests }: { price: number; guests: number }) {
  const [range, setRange] = useState<DateRange | undefined>();

  const nights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;
  const subtotal = nights * price;
  const serviceFee = Math.round(subtotal * 0.12);

  return (
    <div className="rounded-2xl border border-border/60 bg-white/60 p-7 shadow-md backdrop-blur-xl">
      <div className="flex items-baseline gap-1.5">
        <span className="font-serif text-3xl font-bold text-foreground">
          {formatINR(price)}
        </span>
        <span className="text-sm text-muted-foreground">/ night</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Prices are indicative · Final price on request
      </p>

      <div className="mt-5 h-px bg-border" />

      <div className="mt-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Select your dates
        </p>
        <div className="overflow-hidden rounded-xl border border-border">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={[{ before: new Date() }, ...BOOKED_DATES]}
            numberOfMonths={1}
            className="w-full"
          />
        </div>
        {range?.from && range?.to && (
          <p className="mt-2 text-center text-xs font-medium text-primary">
            {nights} night{nights !== 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      {nights > 0 && (
        <div className="mt-5 space-y-2.5 rounded-xl bg-secondary/50 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {formatINR(price)} × {nights} night{nights !== 1 ? "s" : ""}
            </span>
            <span className="font-medium text-foreground">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service fee</span>
            <span className="font-medium text-foreground">{formatINR(serviceFee)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2.5 text-sm font-bold">
            <span>Total</span>
            <span>{formatINR(subtotal + serviceFee)}</span>
          </div>
        </div>
      )}

      <button className="mt-5 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
        {nights > 0 ? "Request to Book" : "Check Availability"}
      </button>

      {nights > 0 && (
        <p className="mt-2.5 text-center text-xs text-muted-foreground">
          You won&apos;t be charged yet
        </p>
      )}

      <div className="mt-5 h-px bg-border" />

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          Up to {guests} guests
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          Mashobra, Shimla
        </span>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function RoomDetail({ room }: { room: Room | GroupRoom }) {
  const [photoBrowserOpen, setPhotoBrowserOpen] = useState(false);

  const isGroup = "rooms" in room;
  const groupRoom = isGroup ? (room as GroupRoom) : null;
  const price = MOCK_PRICES[room.name] ?? 7500;

  // Build a flat preview array (hero + 4) for the main grid
  const previewImages = buildCategoryImages(room.image);
  const gridImages = [
    previewImages.Bedroom[0],
    ...previewImages.Bedroom.slice(1, 3),
    ...previewImages.Kitchen.slice(0, 2),
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* ── Sticky top bar ── */}
        <div className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link
              href="/rooms"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All Rooms
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

        <div className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-8">
          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/rooms" className="transition-colors hover:text-foreground">Rooms</Link>
            <span>/</span>
            <span className="font-medium text-foreground">{room.name}</span>
          </nav>

          {/* ── Room heading ── */}
          <div className="mt-5">
            {isGroup && (
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                Group Package
              </span>
            )}
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground lg:text-5xl">
              {room.name}
            </h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {room.tagline}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                Up to {room.guests} guests
              </span>
              <span className="hidden sm:block">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                Mashobra, Shimla, Himachal Pradesh
              </span>
              {groupRoom && (
                <>
                  <span className="hidden sm:block">·</span>
                  <span className="flex items-center gap-1.5">
                    <Layers className="h-4 w-4" />
                    {groupRoom.rooms.length} rooms combined
                  </span>
                </>
              )}
            </div>
          </div>

          {/* ── Image grid (Airbnb-style, clicks open PhotoBrowser) ── */}
          <div className="relative mt-8 overflow-hidden rounded-2xl">
            {/* Mobile: single hero */}
            <div
              className="relative h-72 cursor-pointer md:hidden"
              onClick={() => setPhotoBrowserOpen(true)}
            >
              <Image
                src={gridImages[0]}
                alt={room.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              <button className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-foreground shadow backdrop-blur-sm">
                <Camera className="h-3.5 w-3.5" />
                See all photos
              </button>
            </div>

            {/* Desktop: hero 2×2 + 4 smalls */}
            <div className="hidden h-130 grid-cols-4 grid-rows-2 gap-2 md:grid">
              {/* Hero */}
              <div
                className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden"
                onClick={() => setPhotoBrowserOpen(true)}
              >
                <Image
                  src={gridImages[0]}
                  alt={room.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="50vw"
                  priority
                />
              </div>

              {/* 4 small images */}
              {gridImages.slice(1, 5).map((src, i) => (
                <div
                  key={i}
                  className="relative cursor-pointer overflow-hidden"
                  onClick={() => setPhotoBrowserOpen(true)}
                >
                  <Image
                    src={src}
                    alt={`Room photo ${i + 2}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.05]"
                    sizes="25vw"
                  />
                  {i === 3 && (
                    <div className="absolute inset-0 flex items-end justify-end bg-black/30 p-4">
                      <button className="flex items-center gap-2 rounded-full bg-white/92 px-4 py-2.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-white">
                        <Camera className="h-3.5 w-3.5" />
                        Show all photos
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Content + booking card ── */}
          <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-3">
            {/* Left column */}
            <div className="space-y-10 lg:col-span-2">
              {groupRoom && (
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Rooms included in this package
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {groupRoom.rooms.map((r) => (
                      <span
                        key={r}
                        className="rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 h-px bg-border" />
                </div>
              )}

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  About this space
                </h2>
                <div className="mt-5 space-y-4">
                  {parseDescription(room.description).map((para, i) => (
                    <p key={i} className="text-sm leading-7 text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              {room.features && room.features.length > 0 && (
                <>
                  <FeaturesSection features={room.features} />
                  <div className="h-px bg-border" />
                </>
              )}

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Room highlights
                </h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {room.highlights.map((h) => {
                    const Icon = featureIcons[h];
                    return (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary px-3.5 py-2 text-xs font-medium text-muted-foreground"
                      >
                        {Icon && <Icon className="h-3.5 w-3.5 text-primary" />}
                        {h}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Location
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Nestled at 7,000 feet above sea level in Mashobra, Shimla — just 12 km from the
                  city centre. Surrounded by pine forests and Himalayan peaks, Saanjh offers the
                  calm of nature with the convenience of proximity.
                </p>
              </div>
            </div>

            {/* Right: sticky booking card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingCard price={price} guests={room.guests} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo browser overlay */}
      {photoBrowserOpen && (
        <PhotoBrowser
          roomImage={room.image}
          roomName={room.name}
          onClose={() => setPhotoBrowserOpen(false)}
        />
      )}
    </>
  );
}
