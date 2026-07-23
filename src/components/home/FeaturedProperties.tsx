import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProperties } from "@/lib/data/mock-properties";
import PropertyCard from "@/components/properties/PropertyCard";
import { Button } from "@/components/ui/button";

export default function FeaturedProperties() {
  const properties = getFeaturedProperties();

  return (
    <section className="section-pad bg-cream">
      <div className="container">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-3">Sélection exclusive</p>
            <h2 className="max-w-xl font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Nos biens à la une à Casablanca
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/proprietes-a-vendre">
              Voir toutes les propriétés
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
