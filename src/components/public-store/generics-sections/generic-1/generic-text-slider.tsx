"use client";

const texts = [
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit",
  "Sed do eiusmod tempor",
  "Ut labore et dolore magna aliqua",
  "Ut enim ad minim veniam",
];

export default function TextSlider() {
  return (
    <div className="mt-24 overflow-hidden relative">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex whitespace-nowrap animate-marquee gap-12 text-sm md:text-base text-muted-foreground">
        {[...texts, ...texts].map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-3 opacity-80 hover:opacity-100 transition"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
