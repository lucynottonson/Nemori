 "use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [accentClicked, setAccentClicked] = useState(false);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] grid-cols-3 gap-4 min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)]">
      
      {/* Main Title */}
      <h1 className="text-[var(--primary)] text-5xl font-bold text-center mb-6">Nemori</h1>

      <main className="flex flex-col gap-[32px] row-start-3 items-center sm:items-start w-full">
        
        {/* Text Color Showcase */}
        <section className="p-4 border border-[var(--secondary)] rounded-lg">
          <p className="text-[var(--primary)]">This is primary text.</p>
          <p className="text-[var(--secondary)]">This is secondary text.</p>
          <p className="text-[var(--tertiary)]">This is tertiary text.</p>
          <p className={`font-bold ${accentClicked ? "text-[var(--bright-accent)]" : "text-[var(--accent)]"}`}>
            This is accent text.
          </p>
          <p className="text-[var(--bright-primary)]">This is bright primary text.</p>
          <p className="text-[var(--bright-secondary)]">This is bright secondary text.</p>
          <p className="text-[var(--bright-tertiary)]">This is bright tertiary text.</p>
        </section>

        {/* Button Showcase */}
        <div className="flex gap-4 flex-wrap mt-4">
          <button className="bg-[var(--primary)] text-[var(--neutral)] px-6 py-2 rounded-full hover:bg-[var(--bright-primary)]">
            Primary Button
          </button>
          <button className="bg-[var(--secondary)] text-[var(--neutral)] px-6 py-2 rounded-full hover:bg-[var(--bright-secondary)]">
            Secondary Button
          </button>
          <button className="bg-[var(--tertiary)] text-[var(--neutral)] px-7 py-2 rounded-full hover:bg-[var(--bright-tertiary)]">
            Tertiary Button
          </button>
          <button
            className="bg-[var(--accent)] text-[var(--neutral)] px-6 py-2 rounded-full hover:bg-[var(--bright-primary)]"
            onClick={() => setAccentClicked(true)}
          >
            Accent Button
          </button>
        </div>

        {/* Card Component */}
        <div className="p-6 mt-6 rounded-lg shadow-md bg-[var(--secondary)] text-[var(--neutral)] w-full max-w-sm">
          <h3 className="text-lg font-semibold">Card Title</h3>
          <p>This is a simple card component with secondary background.</p>
        </div>

        {/* Alert Box */}
        <div className="p-4 mt-4 bg-[var(--accent)] text-[var(--neutral)] font-bold rounded-lg">
          Warning! This is an important message.
        </div>
      </main>

      {/* Footer Section */}
      <footer className="row-start-2 flex gap-[24px] flex-wrap items-center justify-center mt-10">
        <a
          className="flex items-center gap-2 text-[var(--tertiary)] hover:underline hover:underline-offset-4 hover:text-[var(--bright-tertiary)]"
          href="#"
        >
          Tertiary Link
        </a>
        <a
          className="flex items-center gap-2 text-[var(--secondary)] hover:underline hover:underline-offset-4 hover:text-[var(--bright-secondary)]"
          href="#"
        >
          Secondary Link
        </a>
        <a
          className="flex items-center gap-2 text-[var(--primary)] hover:underline hover:underline-offset-4 hover:text-[var(--bright-primary)]"
          href="#"
        >
          Primary Link
        </a>
      </footer>
    </div>
  );
}
