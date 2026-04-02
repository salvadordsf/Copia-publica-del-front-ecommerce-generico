"use client";

const pills = [
  "Lorem Fast",
  "Dolor Secure",
  "Sit Premium",
  "Free Shipping",
  "24/7 Support",
  "Easy Returns",
  "Trusted Store",
  "Best Quality",
];

const animations = [
  "animate-float-y",
  "animate-float-y-reverse",
  "animate-float-x",
  "animate-float-x-reverse",
];

export default function FloatingPills() {
  return (
    <div className="relative mb-15 overflow-hidden">
      {/* Center Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[280px] w-[280px] bg-primary/20 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <div className="relative text-center max-w-xl mx-auto mb-16 px-4">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Lorem ipsum dolor sit amet
        </h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
          tempor incididunt.
        </p>
      </div>

      {/* Container */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-full max-w-2xl h-[260px]">
          {/* Pills */}
          {pills.map((text, i) => {
            const positions = [
              "top-4 left-1/2 -translate-x-1/2",
              "top-12 left-6",
              "top-12 right-6",
              "bottom-12 left-6",
              "bottom-12 right-6",
              "bottom-4 left-1/2 -translate-x-1/2",
              "hidden md:block top-1/2 left-0 -translate-y-1/2",
              "hidden md:block top-1/2 right-0 -translate-y-1/2",
            ];

            return (
              <div
                key={i}
                className={`
                  absolute ${positions[i]}
                  backdrop-blur-xl bg-background/70 border rounded-full px-4 py-2 text-xs shadow-sm
                  ${animations[i % animations.length]}
                  hover:scale-105 transition`}
              >
                {text}
              </div>
            );
          })}

          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 md:h-28 md:w-28 rounded-3xl bg-background border shadow-sm flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Core</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
