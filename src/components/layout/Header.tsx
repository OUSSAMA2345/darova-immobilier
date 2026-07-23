"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/proprietes-a-vendre", label: "Acheter" },
  { href: "/proprietes-a-louer", label: "Louer" },
  { href: "/estimation-gratuite", label: "Estimer mon bien" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"fr" | "ar">("fr");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-navy-900/95 shadow-premium backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-gold-gradient font-display text-lg font-bold text-navy-900">
            D
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-wide text-white">
              DAROVA
            </span>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-500">
              IMMOBILIER
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-white/85 transition-colors hover:text-gold-500",
                pathname === link.href && "text-gold-500"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
            className="flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-gold-500"
            aria-label="Changer de langue"
          >
            <Globe className="h-4 w-4" />
            {lang === "fr" ? "العربية" : "Français"}
          </button>
          <a href="tel:+212522000000" className="flex items-center gap-2 text-sm font-medium text-white/85 hover:text-gold-500">
            <Phone className="h-4 w-4" />
            +212 5 22 00 00 00
          </a>
          <Button variant="gold" size="default" asChild>
            <Link href="/estimation-gratuite">Estimation gratuite</Link>
          </Button>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-navy-900 lg:hidden"
          >
            <nav className="container flex flex-col gap-1 pb-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-white/10 py-3.5 text-white/90"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a href="tel:+212522000000" className="flex items-center gap-2 text-white/85">
                  <Phone className="h-4 w-4" /> +212 5 22 00 00 00
                </a>
                <Button variant="gold" asChild>
                  <Link href="/estimation-gratuite">Estimation gratuite</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
