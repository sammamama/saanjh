"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Rooms", href: "#rooms" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF5F0]/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* Logo */}
        <Link href="#home" className="group flex flex-col leading-none">
          <span
            className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-[#FAF5F0]"
            }`}
          >
            Saanjh
          </span>
          <span
            className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${
              scrolled ? "text-primary" : "text-[#FAF5F0]/70"
            }`}
          >
            The Musical Sunset
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled
                    ? "text-foreground/80 hover:text-primary"
                    : "text-[#FAF5F0]/80 hover:text-[#FAF5F0]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="#rooms"
          className="hidden rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg lg:inline-flex"
        >
          Book Now
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden transition-colors duration-300 ${
            scrolled ? "text-foreground" : "text-[#FAF5F0]"
          }`}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-0 z-40 bg-[#1A1A1A]/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm transform bg-[#FAF5F0] shadow-2xl transition-transform duration-500 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-5">
          <span className="font-serif text-xl font-bold text-foreground">
            Saanjh
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-foreground"
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>
        <ul className="flex flex-col gap-1 px-6 py-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link
              href="#rooms"
              onClick={() => setMobileOpen(false)}
              className="block rounded-full bg-primary px-6 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
