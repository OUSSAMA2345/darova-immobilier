"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/types";
import { formatPriceMAD, formatArea } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  appartement: "Appartement",
  villa: "Villa",
  maison: "Maison",
  bureau: "Bureau",
  commerce: "Commerce",
  terrain: "Terrain",
};

export default function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/propriete/${property.slug}`} className="group block card-premium overflow-hidden">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <Badge variant={property.listing_type === "vente" ? "gold" : "navy"}>
              {property.listing_type === "vente" ? "À vendre" : "À louer"}
            </Badge>
            {property.status !== "disponible" && (
              <Badge variant="danger" className="capitalize">
                {property.status === "reserve" ? "Réservé" : property.status}
              </Badge>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-4">
            <p className="font-display text-xl font-semibold text-white">
              {formatPriceMAD(property.price)}
              {property.listing_type === "location" && <span className="text-sm font-normal"> /mois</span>}
            </p>
          </div>
        </div>

        <div className="p-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
            {TYPE_LABELS[property.property_type]}
          </p>
          <h3 className="mb-2 font-display text-lg font-semibold text-navy-900 line-clamp-1 group-hover:text-gold-700">
            {property.title}
          </h3>
          <p className="mb-4 flex items-center gap-1.5 text-sm text-navy-500">
            <MapPin className="h-4 w-4 shrink-0" />
            {property.neighborhood}, {property.city}
          </p>

          <div className="flex items-center gap-4 border-t border-navy-900/8 pt-4 text-sm text-navy-600">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4 text-gold-600" />
                {property.bedrooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-gold-600" />
                {property.bathrooms}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-gold-600" />
              {formatArea(property.surface_area)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
