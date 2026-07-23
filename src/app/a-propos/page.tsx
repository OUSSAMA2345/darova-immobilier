import type { Metadata } from "next";
import Image from "next/image";
import { Award, Users, ShieldCheck, Target } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "À propos de Darova Immobilier",
  description:
    "Découvrez Darova Immobilier, agence immobilière basée à Casablanca : notre histoire, nos valeurs et notre équipe de conseillers experts du marché marocain.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Transparence",
    text: "Des informations vérifiées sur chaque bien : titre foncier, charges, historique de prix.",
  },
  {
    icon: Target,
    title: "Expertise locale",
    text: "Une connaissance fine des quartiers de Casablanca, quartier par quartier, rue par rue.",
  },
  {
    icon: Users,
    title: "Accompagnement",
    text: "Un conseiller dédié du premier contact jusqu'à la signature chez le notaire.",
  },
  {
    icon: Award,
    title: "Exigence",
    text: "Une sélection rigoureuse des biens que nous commercialisons, sans compromis sur la qualité.",
  },
];

const TEAM = [
  {
    name: "Yasmine Alaoui",
    role: "Fondatrice & Directrice Générale",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
  },
  {
    name: "Karim Bennis",
    role: "Responsable Bureaux & Commerces",
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=400",
  },
  {
    name: "Salma Idrissi",
    role: "Conseillère Résidentiel",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notre agence"
        title="Depuis 15 ans, aux côtés des familles casablancaises"
        description="Darova Immobilier accompagne particuliers et investisseurs dans leurs projets immobiliers à Casablanca, avec une exigence de conseil et de transparence."
      />

      <section className="section-pad bg-white">
        <div className="container grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative h-[420px] overflow-hidden rounded-md">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200"
              alt="Équipe Darova Immobilier"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow mb-3">Notre histoire</p>
            <h2 className="mb-5 font-display text-3xl font-semibold text-navy-900">
              Une agence née à Casablanca, pour Casablanca
            </h2>
            <p className="mb-4 text-navy-600">
              Fondée en 2011 par Yasmine Alaoui, Darova Immobilier est née d&apos;une conviction
              simple : le marché immobilier casablancais mérite un accompagnement aussi rigoureux
              que les grandes places internationales, tout en restant profondément ancré dans les
              réalités locales.
            </p>
            <p className="mb-4 text-navy-600">
              Depuis, notre équipe a accompagné plus de 1 200 transactions à Casablanca et dans sa
              région — de l&apos;appartement familial à Racine à la villa de prestige à Californie,
              en passant par les bureaux et commerces du centre d&apos;affaires.
            </p>
            <p className="text-navy-600">
              Notre nom, Darova, s&apos;inspire du mot &laquo; dar &raquo;, la maison en darija :
              parce qu&apos;au-delà de la transaction, c&apos;est un chez-soi que nous aidons à
              trouver.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container">
          <div className="mb-14 text-center">
            <p className="eyebrow mb-3 justify-center">Nos valeurs</p>
            <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Ce qui guide notre travail au quotidien
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="card-premium p-6">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-gold-gradient text-navy-900">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-navy-900">{v.title}</h3>
                <p className="text-sm text-navy-500">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container">
          <div className="mb-14 text-center">
            <p className="eyebrow mb-3 justify-center">Notre équipe</p>
            <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Des conseillers dédiés à votre projet
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-900">{member.name}</h3>
                <p className="text-sm text-gold-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
