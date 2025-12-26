import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* 
          Upcoming Sections (To be implemented):
          - Premium Ad Slider
          - Happening Today (Horizontal Scroll)
          - Category Grid
          - Cinema Section
          - Interactive Map
      */}

      <div className="py-20 text-center text-soft-white/20 text-sm">
        More sections coming soon...
      </div>
    </main>
  );
}
