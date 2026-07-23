import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ContactAgentForm from "@/components/properties/ContactAgentForm";
import PropertyMap from "@/components/properties/PropertyMap";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Darova Immobilier à Casablanca : téléphone, e-mail, WhatsApp ou formulaire en ligne. Notre équipe vous répond sous 24h.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre projet immobilier"
        description="Une question sur un bien, une estimation, ou simplement envie d'échanger ? Notre équipe est à votre écoute."
      />

      <section className="section-pad bg-white">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="card-premium p-6">
                <MapPin className="mb-3 h-5 w-5 text-gold-600" />
                <p className="font-semibold text-navy-900">Adresse</p>
                <p className="text-sm text-navy-500">Boulevard Zerktouni, Casablanca, Maroc</p>
              </div>
              <div className="card-premium p-6">
                <Phone className="mb-3 h-5 w-5 text-gold-600" />
                <p className="font-semibold text-navy-900">Téléphone</p>
                <a href="tel:+212522000000" className="text-sm text-navy-500 hover:text-gold-600">
                  +212 5 22 00 00 00
                </a>
              </div>
              <div className="card-premium p-6">
                <Mail className="mb-3 h-5 w-5 text-gold-600" />
                <p className="font-semibold text-navy-900">E-mail</p>
                <a
                  href="mailto:contact@darova-immobilier.ma"
                  className="text-sm text-navy-500 hover:text-gold-600"
                >
                  contact@darova-immobilier.ma
                </a>
              </div>
              <div className="card-premium p-6">
                <Clock className="mb-3 h-5 w-5 text-gold-600" />
                <p className="font-semibold text-navy-900">Horaires</p>
                <p className="text-sm text-navy-500">Lun – Sam : 9h00 – 19h00</p>
              </div>
            </div>

            <PropertyMap latitude={33.5883} longitude={-7.6114} title="Darova Immobilier" />
          </div>

          <div className="card-premium p-8">
            <h2 className="mb-6 font-display text-xl font-semibold text-navy-900">
              Envoyez-nous un message
            </h2>
            <ContactAgentForm source="contact" submitLabel="Envoyer le message" />
          </div>
        </div>
      </section>
    </>
  );
}
