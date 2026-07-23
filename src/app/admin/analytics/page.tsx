"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";

const BY_CITY = [
  { city: "Casablanca", biens: 7 },
  { city: "Bouskoura", biens: 1 },
];

const BY_TYPE = [
  { name: "Appartement", value: 3 },
  { name: "Villa", value: 1 },
  { name: "Maison", value: 1 },
  { name: "Bureau", value: 1 },
  { name: "Commerce", value: 1 },
  { name: "Terrain", value: 1 },
];

const LEAD_SOURCES = [
  { name: "Fiche propriété", value: 62 },
  { name: "Formulaire de contact", value: 18 },
  { name: "Estimation gratuite", value: 14 },
  { name: "Rappel demandé", value: 6 },
];

const COLORS = ["#0F172A", "#D4AF37", "#5D7BA3", "#B08F26", "#9BB2CE", "#856B1D"];

export default function AdminAnalyticsPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <h2 className="mb-6 font-display text-lg font-semibold text-navy-900">
          Répartition des biens par ville
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={BY_CITY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E9F2" vertical={false} />
            <XAxis dataKey="city" tick={{ fontSize: 12, fill: "#5D7BA3" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#5D7BA3" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 4, borderColor: "#E2E9F2", fontSize: 13 }} />
            <Bar dataKey="biens" fill="#0F172A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="mb-6 font-display text-lg font-semibold text-navy-900">
          Répartition des biens par type
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={BY_TYPE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
              {BY_TYPE.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 4, borderColor: "#E2E9F2", fontSize: 13 }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 lg:col-span-2">
        <h2 className="mb-6 font-display text-lg font-semibold text-navy-900">
          Origine des prospects (30 derniers jours)
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={LEAD_SOURCES} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E9F2" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12, fill: "#5D7BA3" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#5D7BA3" }} axisLine={false} tickLine={false} width={160} />
            <Tooltip contentStyle={{ borderRadius: 4, borderColor: "#E2E9F2", fontSize: 13 }} />
            <Bar dataKey="value" fill="#D4AF37" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
