import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import PropertyListingView from "@/components/properties/PropertyListingView";
import { getPropertiesByListingType } from "@/lib/data/mock-properties";

export const metadata: Metadata = {
  title: "Propriétés à vendre à Casablanca",
  description:
    "Découvrez notre sélection d'appartements, villas, maisons, bureaux, commerces et terrains à vendre à Casablanca. Filtrez par prix, ville et type de bien.",
};

export default function PropertiesForSalePage() {
  const properties = getPropertiesByListingType("vente");

  return (
    <>
      <PageHeader
        eyebrow="À vendre"
        title="Propriétés à vendre à Casablanca"
        description="Appartements, villas, maisons, bureaux, commerces et terrains sélectionnés par nos experts."
      />
      <section className="section-pad bg-white">
        <div className="container">
          <Suspense fallback={<div className="py-24 text-center text-navy-400">Chargement…</div>}>
            <PropertyListingView properties={properties} listingType="vente" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
