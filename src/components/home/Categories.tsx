import Link from "next/link";
import { Building2, Home as HomeIcon, Warehouse, Briefcase, Store, Map } from "lucide-react";

const CATEGORIES = [
  { icon: Building2, label: "Appartements", type: "appartement", count: "420+ biens" },
  { icon: HomeIcon, label: "Villas", type: "villa", count: "180+ biens" },
  { icon: Warehouse, label: "Maisons", type: "maison", count: "260+ biens" },
  { icon: Briefcase, label: "Bureaux", type: "bureau", count: "95+ biens" },
  { icon: Store, label: "Commerces", type: "commerce", count: "60+ biens" },
  { icon: Map, label: "Terrains", type: "terrain", count: "140+ biens" },
];

export default function Categories() {
  return (
    <section className="section-pad bg-white">
      <div className="container">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3 justify-center">Parcourir par catégorie</p>
          <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Un bien pour chaque projet de vie
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.type}
              href={`/proprietes-a-vendre?type=${cat.type}`}
              className="group flex flex-col items-center rounded-md border border-navy-900/8 bg-white px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-gold"
            >
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy-900 transition-colors group-hover:bg-gold-gradient">
                <cat.icon className="h-6 w-6" />
              </span>
              <p className="font-display font-semibold text-navy-900">{cat.label}</p>
              <p className="mt-1 text-xs text-navy-400">{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
