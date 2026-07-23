import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Darova Immobilier : collecte, utilisation et protection de vos données personnelles.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Informations légales" title="Politique de confidentialité" />
      <section className="section-pad bg-white">
        <div className="container max-w-3xl space-y-8 text-navy-600">
          <p className="text-sm text-navy-400">Dernière mise à jour : 1er juillet 2026</p>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">1. Collecte des données</h2>
            <p>
              Darova Immobilier collecte les données personnelles que vous nous transmettez
              volontairement via nos formulaires de contact, de demande de visite et
              d&apos;estimation gratuite : nom, prénom, numéro de téléphone, adresse e-mail et
              contenu de votre message. Aucune donnée sensible n&apos;est collectée sans votre
              consentement explicite.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">2. Utilisation des données</h2>
            <p>
              Les informations recueillies sont utilisées exclusivement pour répondre à vos
              demandes, vous mettre en relation avec un conseiller Darova Immobilier, et vous
              informer, si vous y avez consenti, de biens correspondant à vos critères de
              recherche.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">3. Conservation et sécurité</h2>
            <p>
              Vos données sont hébergées de manière sécurisée via notre prestataire technique
              (Supabase) et conservées pendant la durée nécessaire au traitement de votre demande,
              conformément à la loi n° 09-08 relative à la protection des personnes physiques à
              l&apos;égard du traitement des données à caractère personnel au Maroc.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">4. Partage des données</h2>
            <p>
              Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec
              nos partenaires notaires ou bancaires uniquement dans le cadre du traitement d&apos;un
              dossier que vous nous avez confié, et avec votre accord préalable.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">5. Vos droits</h2>
            <p>
              Conformément à la réglementation en vigueur, vous disposez d&apos;un droit d&apos;accès,
              de rectification et de suppression de vos données personnelles. Pour exercer ce
              droit, contactez-nous à l&apos;adresse contact@darova-immobilier.ma.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">6. Cookies</h2>
            <p>
              Notre site utilise des cookies techniques nécessaires à son fonctionnement ainsi que
              des cookies de mesure d&apos;audience, dans le seul but d&apos;améliorer votre
              expérience de navigation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
