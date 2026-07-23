import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Car,
  Waves,
  Trees,
  Sofa,
  ArrowUpDown,
  Calendar,
  Phone,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { mockProperties, getPropertyBySlug } from "@/lib/data/mock-properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyMap from "@/components/properties/PropertyMap";
import ContactAgentForm from "@/components/properties/ContactAgentForm";
import RequestVisitButton from "@/components/properties/RequestVisitButton";
import JsonLd from "@/components/seo/JsonLd";
import { formatPriceMAD, formatArea } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  appartement: "Appartement",
  villa: "Villa",
  maison: "Maison",
  bureau: "Bureau",
  commerce: "Commerce",
  terrain: "Terrain",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://darova-immobilier.ma";

export function generateStaticParams() {
  return mockProperties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  const title = `${property.title} — ${formatPriceMAD(property.price)}`;
  const description = property.description.slice(0, 155);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: property.images[0], width: 1200, height: 630 }],
    },
    alternates: { canonical: `${siteUrl}/propriete/${property.slug}` },
  };
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    image: property.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: property.price,
      availability:
        property.status === "disponible"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  const whatsappText = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par ce bien : ${property.title} (${siteUrl}/propriete/${property.slug})`
  );

  return (
    <>
      <JsonLd data={schema} />
      <div className="bg-cream pb-24 pt-28">
        <div className="container">
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-navy-500">
            <Link href="/" className="hover:text-gold-600">Accueil</Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={property.listing_type === "vente" ? "/proprietes-a-vendre" : "/proprietes-a-louer"}
              className="hover:text-gold-600"
            >
              {property.listing_type === "vente" ? "À vendre" : "À louer"}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-navy-900">{property.title}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
            <div>
              <PropertyGallery images={property.images} title={property.title} />

              <div className="card-premium mt-8 p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex gap-2">
                      <Badge variant={property.listing_type === "vente" ? "gold" : "navy"}>
                        {property.listing_type === "vente" ? "À vendre" : "À louer"}
                      </Badge>
                      <Badge variant="outline">{TYPE_LABELS[property.property_type]}</Badge>
                    </div>
                    <h1 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
                      {property.title}
                    </h1>
                    <p className="mt-2 flex items-center gap-1.5 text-navy-500">
                      <MapPin className="h-4 w-4" />
                      {property.address}
                    </p>
                  </div>
                  <p className="font-display text-3xl font-semibold text-gold-700">
                    {formatPriceMAD(property.price)}
                    {property.listing_type === "location" && (
                      <span className="text-base font-normal text-navy-400"> /mois</span>
                    )}
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 border-y border-navy-900/8 py-6 sm:grid-cols-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-2.5">
                      <BedDouble className="h-5 w-5 text-gold-600" />
                      <div>
                        <p className="font-semibold text-navy-900">{property.bedrooms}</p>
                        <p className="text-xs text-navy-400">Chambres</p>
                      </div>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center gap-2.5">
                      <Bath className="h-5 w-5 text-gold-600" />
                      <div>
                        <p className="font-semibold text-navy-900">{property.bathrooms}</p>
                        <p className="text-xs text-navy-400">Salles de bain</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5">
                    <Maximize className="h-5 w-5 text-gold-600" />
                    <div>
                      <p className="font-semibold text-navy-900">{formatArea(property.surface_area)}</p>
                      <p className="text-xs text-navy-400">Surface</p>
                    </div>
                  </div>
                  {property.floor !== undefined && (
                    <div className="flex items-center gap-2.5">
                      <ArrowUpDown className="h-5 w-5 text-gold-600" />
                      <div>
                        <p className="font-semibold text-navy-900">{property.floor === 0 ? "RDC" : property.floor}</p>
                        <p className="text-xs text-navy-400">Étage</p>
                      </div>
                    </div>
                  )}
                  {property.year_built && (
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-5 w-5 text-gold-600" />
                      <div>
                        <p className="font-semibold text-navy-900">{property.year_built}</p>
                        <p className="text-xs text-navy-400">Année</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h2 className="mb-3 font-display text-lg font-semibold text-navy-900">Description</h2>
                  <p className="leading-relaxed text-navy-600">{property.description}</p>
                </div>

                <div className="mt-8">
                  <h2 className="mb-4 font-display text-lg font-semibold text-navy-900">Équipements</h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {property.has_parking && <Amenity icon={Car} label="Parking" />}
                    {property.has_pool && <Amenity icon={Waves} label="Piscine" />}
                    {property.has_garden && <Amenity icon={Trees} label="Jardin" />}
                    {property.is_furnished && <Amenity icon={Sofa} label="Meublé" />}
                    {property.has_elevator && <Amenity icon={ArrowUpDown} label="Ascenseur" />}
                    {property.amenities.map((a) => (
                      <Amenity key={a} label={a} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="mb-4 font-display text-lg font-semibold text-navy-900">Localisation</h2>
                <PropertyMap
                  latitude={property.latitude}
                  longitude={property.longitude}
                  title={property.title}
                />
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
              <div className="card-premium p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
                  Votre conseiller
                </p>
                <p className="font-display text-lg font-semibold text-navy-900">{property.agent_name}</p>
                <p className="mb-5 text-sm text-navy-500">Darova Immobilier — Casablanca</p>

                <div className="space-y-3">
                  <RequestVisitButton propertyId={property.id} propertyTitle={property.title} />
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href={`tel:${property.agent_phone.replace(/\s/g, "")}`}>
                      <Phone className="h-4 w-4" />
                      Appeler {property.agent_phone}
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    className="w-full bg-[#25D366] text-white hover:bg-[#1ea952]"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${property.agent_whatsapp}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Discuter sur WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <div className="card-premium p-6">
                <h3 className="mb-4 font-display text-base font-semibold text-navy-900">
                  Envoyer un message
                </h3>
                <ContactAgentForm
                  propertyId={property.id}
                  source="property"
                  defaultMessage={`Bonjour, je suis intéressé(e) par ce bien : ${property.title}.`}
                  submitLabel="Envoyer"
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

function Amenity({ icon: Icon, label }: { icon?: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-sm bg-navy-50 px-3 py-2.5 text-sm text-navy-700">
      {Icon ? <Icon className="h-4 w-4 shrink-0 text-gold-600" /> : (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" />
      )}
      {label}
    </div>
  );
}
