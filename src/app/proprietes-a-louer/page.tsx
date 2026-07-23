import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import PropertyListingView from "@/components/properties/PropertyListingView";
import { getPropertiesByListingType } from "@/lib/data/mock-properties";

export const metadata: Metadata = {
  title: "Propriétés à louer à Casablanca",
  description:
    "Trouvez votre prochain appartement, villa ou bureau à louer à Casablanca. Biens meublés et non meublés, filtres par prix et quartier.",
};

export default function PropertiesForRentPage() {
  const properties = getPropertiesByListingType("location");

  return (
    <>
      <PageHeader
        eyebrow="À louer"
        title="Propriétés à louer à Casablanca"
        description="Appartements meublés, villas et bureaux disponibles à la location dans les meilleurs quartiers de Casablanca."
      />
      <section className="section-pad bg-white">
        <div className="container">
          <Suspense fallback={<div className="py-24 text-center text-navy-400">Chargement…</div>}>
            <PropertyListingView properties={properties} listingType="location" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
