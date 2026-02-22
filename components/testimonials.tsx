"use client";

import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Ananya Mehta",
    location: "Mumbai",
    text: "Saanjh is the kind of place that makes you question everything you thought you needed. The sunset from the terrace is beyond anything I have ever seen. Pure magic.",
    rating: 5,
  },
  {
    name: "James Whitfield",
    location: "London, UK",
    text: "We have travelled extensively through the Himalayas, but nothing compares to the warmth and care at Saanjh. The bonfire evenings with live music are unforgettable.",
    rating: 5,
  },
  {
    name: "Priya Kapoor",
    location: "Delhi",
    text: "The Pine Cottage was our honeymoon paradise. Waking up surrounded by nothing but trees and mountains, with the smell of fresh coffee drifting in. Absolute perfection.",
    rating: 5,
  },
];

export default function Testimonials() {
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
    <section ref={sectionRef} className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Guest Stories
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">Voices from the Valley</span>
          </h2>
        </div>

        {/* Reviews grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className={`rounded-2xl border border-border/40 bg-[#FFFFFF]/50 p-8 shadow-sm backdrop-blur-xl transition-all duration-700 hover:shadow-md ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                    aria-hidden="true"
                  />
                ))}
                <span className="sr-only">{review.rating} out of 5 stars</span>
              </div>

              <blockquote className="mt-6 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-serif text-sm font-bold text-primary">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
