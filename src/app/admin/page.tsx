import {
  Building2,
  Inbox,
  Eye,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProperties } from "@/lib/data/mock-properties";
import { formatPriceMAD } from "@/lib/utils";
import DashboardChart from "@/components/admin/DashboardChart";

const STATS = [
  {
    label: "Propriétés actives",
    value: mockProperties.filter((p) => p.status === "disponible").length,
    icon: Building2,
    change: "+4 ce mois",
  },
  {
    label: "Nouveaux prospects",
    value: 27,
    icon: Inbox,
    change: "+12% vs mois dernier",
  },
  {
    label: "Vues cumulées",
    value: mockProperties.reduce((sum, p) => sum + p.views_count, 0),
    icon: Eye,
    change: "+8% vs mois dernier",
  },
  {
    label: "Taux de conversion",
    value: "6.4%",
    icon: TrendingUp,
    change: "+0.8 pt vs mois dernier",
  },
];

const RECENT_LEADS = [
  { name: "Nabil Ouazzani", property: "Villa moderne — Californie", status: "nouveau", date: "Aujourd'hui, 10:24" },
  { name: "Amina Berrada", property: "Appartement — Racine", status: "en_cours", date: "Aujourd'hui, 09:02" },
  { name: "Youssef Amrani", property: "Duplex vue mer — Ain Diab", status: "nouveau", date: "Hier, 18:47" },
  { name: "Leila Squalli", property: "Bureau — Maarif", status: "traite", date: "Hier, 14:12" },
];

const STATUS_LABELS: Record<string, { label: string; variant: "gold" | "navy" | "success" }> = {
  nouveau: { label: "Nouveau", variant: "gold" },
  en_cours: { label: "En cours", variant: "navy" },
  traite: { label: "Traité", variant: "success" },
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy-50 text-navy-900">
                <stat.icon className="h-5 w-5" />
              </span>
            </div>
            <p className="font-display text-2xl font-semibold text-navy-900">{stat.value}</p>
            <p className="mt-1 text-xs text-navy-400">{stat.label}</p>
            <p className="mt-2 text-xs font-medium text-emerald-600">{stat.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-navy-900">
              Vues des propriétés — 30 derniers jours
            </h2>
          </div>
          <DashboardChart />
        </Card>

        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-navy-900">
              Prospects récents
            </h2>
            <Link href="/admin/leads" className="text-xs font-medium text-gold-600 hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="space-y-4">
            {RECENT_LEADS.map((lead) => (
              <div key={lead.name} className="flex items-start justify-between gap-3 border-b border-navy-900/8 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold text-navy-900">{lead.name}</p>
                  <p className="text-xs text-navy-400">{lead.property}</p>
                  <p className="mt-1 text-[11px] text-navy-300">{lead.date}</p>
                </div>
                <Badge variant={STATUS_LABELS[lead.status].variant}>
                  {STATUS_LABELS[lead.status].label}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-navy-900">
            Propriétés les plus vues
          </h2>
          <Link href="/admin/proprietes" className="flex items-center gap-1 text-xs font-medium text-gold-600 hover:underline">
            Gérer les propriétés <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-900/8 text-left text-xs uppercase tracking-wide text-navy-400">
                <th className="pb-3 font-medium">Propriété</th>
                <th className="pb-3 font-medium">Ville</th>
                <th className="pb-3 font-medium">Prix</th>
                <th className="pb-3 font-medium">Vues</th>
                <th className="pb-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {[...mockProperties]
                .sort((a, b) => b.views_count - a.views_count)
                .slice(0, 5)
                .map((p) => (
                  <tr key={p.id} className="border-b border-navy-900/5 last:border-0">
                    <td className="py-3 font-medium text-navy-900">{p.title}</td>
                    <td className="py-3 text-navy-500">{p.city}</td>
                    <td className="py-3 text-navy-500">{formatPriceMAD(p.price)}</td>
                    <td className="py-3 text-navy-500">{p.views_count}</td>
                    <td className="py-3">
                      <Badge variant={p.status === "disponible" ? "success" : "warning"} className="capitalize">
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
