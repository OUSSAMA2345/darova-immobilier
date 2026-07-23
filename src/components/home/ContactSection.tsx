import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactAgentForm from "@/components/properties/ContactAgentForm";

export default function ContactSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container grid grid-cols-1 gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">Parlons de votre projet</p>
          <h2 className="mb-6 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Une question ? Contactez notre équipe
          </h2>
          <p className="mb-8 max-w-md text-navy-500">
            Nos conseillers vous répondent sous 24h pour toute demande d&apos;achat, de location
            ou d&apos;estimation à Casablanca et sa région.
          </p>

          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-900">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-navy-900">Adresse</p>
                <p className="text-sm text-navy-500">Boulevard Zerktouni, Casablanca, Maroc</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-900">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-navy-900">Téléphone</p>
                <p className="text-sm text-navy-500">+212 5 22 00 00 00</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-900">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-navy-900">E-mail</p>
                <p className="text-sm text-navy-500">contact@darova-immobilier.ma</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-50 text-navy-900">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-navy-900">Horaires</p>
                <p className="text-sm text-navy-500">Lun – Sam : 9h00 – 19h00</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="card-premium p-8">
          <ContactAgentForm source="contact" submitLabel="Envoyer le message" />
        </div>
      </div>
    </section>
  );
}
