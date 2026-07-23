"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

const STATS = [
  { value: "1 200+", label: "Biens commercialisés" },
  { value: "15 ans", label: "D'expertise à Casablanca" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "24h", label: "Délai de réponse moyen" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-gradient pt-28">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-900/40" />

      {/* Moroccan zellige-inspired accent lattice */}
      <svg
        className="pointer-events-none absolute -right-24 top-16 hidden h-[560px] w-[560px] opacity-[0.12] lg:block"
        viewBox="0 0 200 200"
      >
        <defs>
          <pattern id="zellige" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#D4AF37" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#zellige)" />
      </svg>

      <div className="container relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-5 text-gold-400"
        >
          Agence immobilière premium — Casablanca
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
        >
          Trouvez la propriété qui vous ressemble, au cœur de Casablanca
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-white/75"
        >
          Darova Immobilier vous accompagne dans l&apos;achat, la vente et la location
          d&apos;appartements, villas et locaux professionnels, avec l&apos;exigence d&apos;un
          service sur mesure.
        </motion.p>

        <motion.p
          dir="rtl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-3 font-arabic text-xl text-gold-500"
        >
          معاك فكل خطوة نحو دارك
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10"
        >
          <SearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 grid max-w-2xl grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-semibold text-gold-500 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
