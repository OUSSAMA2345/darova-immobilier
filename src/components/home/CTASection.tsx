import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-pad bg-cream">
      <div className="container">
        <div className="relative overflow-hidden rounded-lg bg-navy-gradient px-8 py-16 text-center sm:px-16">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="eyebrow mb-4 justify-center text-gold-400">Vous souhaitez vendre ?</p>
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Recevez une estimation gratuite de votre bien en 24h
            </h2>
            <p className="mt-4 text-white/70">
              Nos experts locaux évaluent votre appartement, villa ou local professionnel selon
              les prix réels du marché casablancais — sans aucun engagement.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="gold" size="lg" asChild>
                <Link href="/estimation-gratuite">
                  Estimer mon bien
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-navy-900"
                asChild
              >
                <Link href="/contact">Parler à un conseiller</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
