"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = () => setActive((a) => (a + 1) % images.length);
  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);

  return (
    <div>
      <div className="relative h-[320px] overflow-hidden rounded-md sm:h-[440px] lg:h-[520px]">
        <Image
          src={images[active]}
          alt={`${title} — photo ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
        <button
          onClick={() => setLightbox(true)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-sm bg-navy-950/60 text-white backdrop-blur hover:bg-navy-950/80"
          aria-label="Agrandir"
        >
          <Expand className="h-4 w-4" />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/60 text-white backdrop-blur hover:bg-navy-950/80"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/60 text-white backdrop-blur hover:bg-navy-950/80"
              aria-label="Photo suivante"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 right-4 rounded-sm bg-navy-950/60 px-3 py-1 text-xs text-white backdrop-blur">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`relative h-16 overflow-hidden rounded-sm border-2 transition-colors sm:h-20 ${
                active === i ? "border-gold-500" : "border-transparent"
              }`}
            >
              <Image src={img} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute right-6 top-6 text-white"
              onClick={() => setLightbox(false)}
              aria-label="Fermer"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative h-full w-full max-w-5xl">
              <Image src={images[active]} alt={title} fill sizes="90vw" className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
