"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-gold-gradient font-display text-lg font-bold text-navy-900">
              D
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold text-white">DAROVA</span>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-gold-500">
                IMMOBILIER
              </span>
            </span>
          </div>
          <p dir="rtl" className="mb-4 font-arabic text-gold-500">
            معاك فكل خطوة نحو دارك
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            Agence immobilière de référence à Casablanca, spécialisée dans la vente et la
            location de biens résidentiels et professionnels haut de gamme.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 transition-colors hover:border-gold-500 hover:text-gold-500"
                aria-label="Réseau social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/proprietes-a-vendre" className="hover:text-gold-500">Propriétés à vendre</Link></li>
            <li><Link href="/proprietes-a-louer" className="hover:text-gold-500">Propriétés à louer</Link></li>
            <li><Link href="/estimation-gratuite" className="hover:text-gold-500">Estimation gratuite</Link></li>
            <li><Link href="/blog" className="hover:text-gold-500">Blog immobilier</Link></li>
            <li><Link href="/a-propos" className="hover:text-gold-500">À propos de nous</Link></li>
            <li><Link href="/faq" className="hover:text-gold-500">Questions fréquentes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Types de biens
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/proprietes-a-vendre?type=appartement" className="hover:text-gold-500">Appartements</Link></li>
            <li><Link href="/proprietes-a-vendre?type=villa" className="hover:text-gold-500">Villas</Link></li>
            <li><Link href="/proprietes-a-vendre?type=maison" className="hover:text-gold-500">Maisons</Link></li>
            <li><Link href="/proprietes-a-vendre?type=bureau" className="hover:text-gold-500">Bureaux</Link></li>
            <li><Link href="/proprietes-a-vendre?type=commerce" className="hover:text-gold-500">Commerces</Link></li>
            <li><Link href="/proprietes-a-vendre?type=terrain" className="hover:text-gold-500">Terrains</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              Boulevard Zerktouni, Casablanca, Maroc
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-500" />
              <a href="tel:+212522000000" className="hover:text-gold-500">+212 5 22 00 00 00</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-500" />
              <a href="mailto:contact@darova-immobilier.ma" className="hover:text-gold-500">
                contact@darova-immobilier.ma
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} Darova Immobilier. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/confidentialite" className="hover:text-gold-500">Politique de confidentialité</Link>
            <Link href="/conditions-generales" className="hover:text-gold-500">Conditions générales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
