"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

const FAQS = [
  {
    category: "Acheter",
    items: [
      {
        q: "Quels sont les frais annexes lors d'un achat immobilier au Maroc ?",
        a: "En plus du prix d'achat, comptez généralement entre 6 et 8% du prix pour les droits d'enregistrement, les frais de conservation foncière, les honoraires de notaire et les frais d'agence. Ces frais varient selon la nature du bien et le statut de l'acheteur (résident ou MRE).",
      },
      {
        q: "Puis-je obtenir un crédit immobilier en tant que Marocain résidant à l'étranger (MRE) ?",
        a: "Oui, la plupart des banques marocaines proposent des offres de financement dédiées aux MRE, avec des conditions spécifiques. Nos conseillers peuvent vous orienter vers nos partenaires bancaires pour étudier votre dossier.",
      },
      {
        q: "Comment vérifier qu'un bien a un titre foncier en règle ?",
        a: "Chaque bien que nous commercialisons fait l'objet d'une vérification auprès de la Conservation Foncière. Nous vous fournissons systématiquement une copie du certificat de propriété avant toute offre d'achat.",
      },
    ],
  },
  {
    category: "Vendre",
    items: [
      {
        q: "Combien de temps faut-il pour vendre mon bien avec Darova Immobilier ?",
        a: "La durée moyenne de commercialisation constatée sur nos biens correctement estimés est de 6 à 10 semaines à Casablanca, selon le quartier, le type de bien et son état.",
      },
      {
        q: "L'estimation de mon bien est-elle vraiment gratuite et sans engagement ?",
        a: "Oui. Notre estimation est gratuite, réalisée par un conseiller local et ne vous engage à rien. Vous restez entièrement libre de confier ou non la commercialisation de votre bien à notre agence.",
      },
      {
        q: "Quels documents dois-je préparer pour vendre mon bien ?",
        a: "Titre de propriété, dernière quittance de taxe d'habitation et de services communaux, plan du bien si disponible, et pièce d'identité. Notre équipe vous accompagne pour réunir l'ensemble du dossier.",
      },
    ],
  },
  {
    category: "Louer",
    items: [
      {
        q: "Quelle caution est généralement demandée pour une location à Casablanca ?",
        a: "L'usage courant est de 2 à 3 mois de loyer en dépôt de garantie, restitué en fin de bail sous réserve de l'état des lieux de sortie.",
      },
      {
        q: "Proposez-vous des biens meublés pour les expatriés ?",
        a: "Oui, une part importante de notre portefeuille locatif est composée d'appartements meublés et équipés, notamment à Gauthier, Racine et Ain Diab, adaptés aux cadres en mission.",
      },
    ],
  },
];

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Questions fréquentes"
        title="Tout ce que vous devez savoir"
        description="Retrouvez les réponses aux questions les plus posées par nos clients acheteurs, vendeurs et locataires."
      />
      <section className="section-pad bg-white">
        <div className="container max-w-3xl">
          {FAQS.map((group) => (
            <div key={group.category} className="mb-10">
              <h2 className="mb-4 font-display text-xl font-semibold text-navy-900">
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((item, i) => {
                  const key = `${group.category}-${i}`;
                  const isOpen = openIndex === key;
                  return (
                    <div key={key} className="card-premium overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                      >
                        <span className="font-medium text-navy-900">{item.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-gold-600 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-navy-900/8 p-5 pt-4 text-sm leading-relaxed text-navy-600">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
