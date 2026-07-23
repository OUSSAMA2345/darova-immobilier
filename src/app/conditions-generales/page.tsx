import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description:
    "Conditions générales d'utilisation du site Darova Immobilier et des services de mise en relation immobilière à Casablanca.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Informations légales" title="Conditions générales d'utilisation" />
      <section className="section-pad bg-white">
        <div className="container max-w-3xl space-y-8 text-navy-600">
          <p className="text-sm text-navy-400">Dernière mise à jour : 1er juillet 2026</p>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">1. Objet</h2>
            <p>
              Les présentes conditions générales régissent l&apos;utilisation du site
              darova-immobilier.ma, édité par Darova Immobilier, agence immobilière basée à
              Casablanca, Maroc. En accédant au site, l&apos;utilisateur accepte sans réserve les
              présentes conditions.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">2. Nature des annonces</h2>
            <p>
              Les annonces publiées sur le site sont fournies à titre indicatif. Darova Immobilier
              s&apos;efforce d&apos;assurer l&apos;exactitude des informations (prix, surface,
              caractéristiques) mais ne saurait être tenu responsable d&apos;une erreur ou d&apos;une
              modification postérieure à la publication, notamment la disponibilité effective du
              bien au moment de la consultation.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">3. Rôle de l&apos;agence</h2>
            <p>
              Darova Immobilier agit en qualité d&apos;intermédiaire entre vendeurs/bailleurs et
              acheteurs/locataires. La conclusion définitive d&apos;une vente ou d&apos;une location
              reste soumise à la signature des actes correspondants, notamment devant notaire pour
              toute transaction de vente.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus du site (textes, photographies, logo, charte graphique)
              est protégé par le droit de la propriété intellectuelle et demeure la propriété
              exclusive de Darova Immobilier ou de ses partenaires. Toute reproduction sans
              autorisation préalable est interdite.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">5. Responsabilité</h2>
            <p>
              Darova Immobilier met tout en œuvre pour assurer la disponibilité et la sécurité de
              son site, sans garantie d&apos;absence d&apos;interruption ou d&apos;erreur technique.
              L&apos;utilisateur reconnaît utiliser le site sous sa propre responsabilité.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold text-navy-900">6. Droit applicable</h2>
            <p>
              Les présentes conditions générales sont soumises au droit marocain. Tout litige
              relatif à leur interprétation ou leur exécution relève de la compétence exclusive des
              tribunaux de Casablanca.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
