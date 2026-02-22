"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Saanjh Homestay, Old Manali Road, Manali, Himachal Pradesh 175131",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "namaste@saanjh.in",
  },
  {
    icon: Clock,
    label: "Check-in / Check-out",
    value: "2:00 PM / 11:00 AM",
  },
];

export default function Contact() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Info column */}
          <div
            className={`transition-all duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Get in Touch
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-balance">Plan Your Mountain Escape</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Whether you are planning a solo retreat, a family getaway, or a
              gathering of friends &mdash; we would love to help you create the
              perfect mountain experience.
            </p>

            <div className="mt-10 space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-[18px] w-[18px] text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form column - glassmorphic card */}
          <div
            className={`rounded-2xl border border-border/40 bg-[#FFFFFF]/50 p-8 shadow-sm backdrop-blur-xl transition-all delay-200 duration-1000 sm:p-10 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="font-serif text-xl font-bold text-foreground">
              Send Us a Message
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We typically respond within 24 hours.
            </p>

            <form
              className="mt-8 flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="Ananya"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="Mehta"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="ananya@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-2 w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="Tell us about your dream stay..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
