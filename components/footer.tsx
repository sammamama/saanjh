import Link from "next/link";

const quickLinks = ["Home", "About", "Services", "Rooms", "Contact"];
const experiences = [
  "Mountain Cafe",
  "Guided Treks",
  "Bonfire Evenings",
  "Live Music",
  "Yoga Sessions",
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="#home" className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold text-[#FAF5F0]">
                Saanjh
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#FAF5F0]/40">
                The Musical Sunset
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#FAF5F0]/40">
              A Himalayan homestay where every sunset tells a different story.
              Come for the views, stay for the soul.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FAF5F0]/30">
              Quick Links
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-[#FAF5F0]/50 transition-colors duration-300 hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FAF5F0]/30">
              Experiences
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {experiences.map((item) => (
                <li key={item}>
                  <span className="text-sm text-[#FAF5F0]/50">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FAF5F0]/30">
              Stay Connected
            </p>
            <p className="mt-5 text-sm text-[#FAF5F0]/40">
              Follow our journey and get updates on seasonal offers.
            </p>
            <div className="mt-5 flex gap-3">
              {["Instagram", "Facebook", "Twitter"].map((social) => (
                <span
                  key={social}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#FAF5F0]/10 text-xs font-semibold text-[#FAF5F0]/40 transition-colors duration-300 hover:border-primary hover:text-primary"
                  aria-label={social}
                >
                  {social.charAt(0)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#FAF5F0]/10 pt-8 sm:flex-row">
          <p className="text-xs text-[#FAF5F0]/30">
            &copy; {new Date().getFullYear()} Saanjh Homestay. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-[#FAF5F0]/30 transition-colors hover:text-[#FAF5F0]/50 cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-xs text-[#FAF5F0]/30 transition-colors hover:text-[#FAF5F0]/50 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
