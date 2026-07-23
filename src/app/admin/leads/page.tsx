"use client";

import { useState } from "react";
import { Phone, Mail, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface LeadRow {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  message: string;
  source: string;
  property: string;
  status: "nouveau" | "en_cours" | "traite" | "perdu";
  date: string;
}

const MOCK_LEADS: LeadRow[] = [
  { id: "1", full_name: "Nabil Ouazzani", phone: "0661 22 33 44", email: "nabil.o@email.com", message: "Intéressé par une visite ce week-end.", source: "property", property: "Villa moderne — Californie", status: "nouveau", date: "21/07/2026" },
  { id: "2", full_name: "Amina Berrada", phone: "0662 33 44 55", email: "amina.b@email.com", message: "Souhaite connaître les charges de copropriété.", source: "property", property: "Appartement — Racine", status: "en_cours", date: "21/07/2026" },
  { id: "3", full_name: "Youssef Amrani", phone: "0663 44 55 66", email: "youssef.a@email.com", message: "Demande de visite en soirée.", source: "property", property: "Duplex vue mer — Ain Diab", status: "nouveau", date: "20/07/2026" },
  { id: "4", full_name: "Leila Squalli", phone: "0664 55 66 77", email: "leila.s@email.com", message: "Recherche bureau 150-200m² Maarif.", source: "contact", property: "—", status: "traite", date: "20/07/2026" },
  { id: "5", full_name: "Hicham Benali", phone: "0665 66 77 88", email: "hicham.b@email.com", message: "Demande d'estimation pour appartement à Gauthier.", source: "evaluation", property: "—", status: "en_cours", date: "19/07/2026" },
  { id: "6", full_name: "Ghita Lahlou", phone: "0666 77 88 99", email: "ghita.l@email.com", message: "Souhaite être rappelée demain matin.", source: "callback", property: "—", status: "perdu", date: "18/07/2026" },
];

const STATUS_STYLE: Record<string, { label: string; variant: "gold" | "navy" | "success" | "danger" }> = {
  nouveau: { label: "Nouveau", variant: "gold" },
  en_cours: { label: "En cours", variant: "navy" },
  traite: { label: "Traité", variant: "success" },
  perdu: { label: "Perdu", variant: "danger" },
};

const SOURCE_LABELS: Record<string, string> = {
  contact: "Formulaire de contact",
  property: "Fiche propriété",
  evaluation: "Estimation gratuite",
  callback: "Rappel demandé",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("tous");

  const filtered = leads.filter((l) => {
    if (statusFilter !== "tous" && l.status !== statusFilter) return false;
    return `${l.full_name} ${l.property}`.toLowerCase().includes(query.toLowerCase());
  });

  const updateStatus = (id: string, status: LeadRow["status"]) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <Input placeholder="Rechercher un prospect…" className="pl-10" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="sm:w-56"><SelectValue placeholder="Filtrer par statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les statuts</SelectItem>
            <SelectItem value="nouveau">Nouveau</SelectItem>
            <SelectItem value="en_cours">En cours</SelectItem>
            <SelectItem value="traite">Traité</SelectItem>
            <SelectItem value="perdu">Perdu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filtered.map((lead) => (
          <Card key={lead.id} className="p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <p className="font-display font-semibold text-navy-900">{lead.full_name}</p>
                  <Badge variant="outline">{SOURCE_LABELS[lead.source]}</Badge>
                </div>
                <p className="mb-2 text-sm text-navy-500">{lead.property}</p>
                <p className="mb-3 text-sm text-navy-600">&laquo; {lead.message} &raquo;</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-navy-400">
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-gold-600">
                    <Phone className="h-3.5 w-3.5" /> {lead.phone}
                  </a>
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-gold-600">
                    <Mail className="h-3.5 w-3.5" /> {lead.email}
                  </a>
                  <span>{lead.date}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge variant={STATUS_STYLE[lead.status].variant}>{STATUS_STYLE[lead.status].label}</Badge>
                <Select value={lead.status} onValueChange={(v) => updateStatus(lead.id, v as LeadRow["status"])}>
                  <SelectTrigger className="h-9 w-40 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nouveau">Nouveau</SelectItem>
                    <SelectItem value="en_cours">En cours</SelectItem>
                    <SelectItem value="traite">Traité</SelectItem>
                    <SelectItem value="perdu">Perdu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="py-16 text-center text-navy-400">Aucun prospect ne correspond à ces filtres.</p>
        )}
      </div>
    </div>
  );
}
