"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import PropertyFilters from "./PropertyFilters";
import PropertyCard from "./PropertyCard";
import { Property, PropertyFiltersState, ListingType } from "@/lib/types";

export default function PropertyListingView({
  properties,
  listingType,
}: {
  properties: Property[];
  listingType: ListingType;
}) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<PropertyFiltersState>({});

  useEffect(() => {
    const ville = searchParams.get("ville");
    const type = searchParams.get("type");
    setFilters((f) => ({
      ...f,
      city: ville || undefined,
      propertyType: (type as PropertyFiltersState["propertyType"]) || undefined,
    }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.city && p.city !== filters.city) return false;
      if (filters.propertyType && filters.propertyType !== "tous" && p.property_type !== filters.propertyType) return false;
      if (filters.minPrice && p.price < filters.minPrice) return false;
      if (filters.maxPrice && p.price > filters.maxPrice) return false;
      if (filters.bedrooms && p.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms && p.bathrooms < filters.bathrooms) return false;
      if (filters.minSurface && p.surface_area < filters.minSurface) return false;
      return true;
    });
  }, [properties, filters]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
      <PropertyFilters filters={filters} onChange={setFilters} resultsCount={filtered.length} />

      <div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
            <SearchX className="h-12 w-12 text-navy-300" />
            <p className="font-display text-lg font-semibold text-navy-900">
              Aucun bien ne correspond à ces critères
            </p>
            <p className="text-sm text-navy-500">
              Essayez d&apos;élargir votre recherche ou contactez-nous, nous avons souvent des
              biens qui ne sont pas encore publiés.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
