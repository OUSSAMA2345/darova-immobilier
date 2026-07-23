"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PropertyFiltersState } from "@/lib/types";

const CITIES = ["Casablanca", "Bouskoura", "Mohammedia", "Dar Bouazza", "Rabat"];
const TYPES = [
  { value: "tous", label: "Tous les types" },
  { value: "appartement", label: "Appartement" },
  { value: "villa", label: "Villa" },
  { value: "maison", label: "Maison" },
  { value: "bureau", label: "Bureau" },
  { value: "commerce", label: "Commerce" },
  { value: "terrain", label: "Terrain" },
];

interface PropertyFiltersProps {
  filters: PropertyFiltersState;
  onChange: (filters: PropertyFiltersState) => void;
  resultsCount: number;
}

export default function PropertyFilters({ filters, onChange, resultsCount }: PropertyFiltersProps) {
  const update = (patch: Partial<PropertyFiltersState>) => onChange({ ...filters, ...patch });

  return (
    <aside className="card-premium sticky top-24 h-fit p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
          <SlidersHorizontal className="h-4 w-4 text-gold-600" />
          Filtres
        </h3>
        <button
          onClick={() => onChange({})}
          className="flex items-center gap-1 text-xs font-medium text-navy-400 hover:text-gold-600"
        >
          <X className="h-3 w-3" /> Réinitialiser
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <Label>Ville</Label>
          <Select value={filters.city || ""} onValueChange={(v) => update({ city: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes les villes" />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Type de bien</Label>
          <Select
            value={filters.propertyType || "tous"}
            onValueChange={(v) => update({ propertyType: v as PropertyFiltersState["propertyType"] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Prix min (DH)</Label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minPrice ?? ""}
              onChange={(e) => update({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
            />
          </div>
          <div>
            <Label>Prix max (DH)</Label>
            <Input
              type="number"
              placeholder="Aucun"
              value={filters.maxPrice ?? ""}
              onChange={(e) => update({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
            />
          </div>
        </div>

        <div>
          <Label>Chambres min.</Label>
          <Select
            value={filters.bedrooms?.toString() || ""}
            onValueChange={(v) => update({ bedrooms: Number(v) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Indifférent" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((n) => (
                <SelectItem key={n} value={n.toString()}>{n}+</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Salles de bain min.</Label>
          <Select
            value={filters.bathrooms?.toString() || ""}
            onValueChange={(v) => update({ bathrooms: Number(v) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Indifférent" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((n) => (
                <SelectItem key={n} value={n.toString()}>{n}+</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Surface min. (m²)</Label>
          <Input
            type="number"
            placeholder="0"
            value={filters.minSurface ?? ""}
            onChange={(e) => update({ minSurface: e.target.value ? Number(e.target.value) : undefined })}
          />
        </div>
      </div>

      <p className="mt-6 border-t border-navy-900/8 pt-4 text-sm text-navy-500">
        <strong className="text-navy-900">{resultsCount}</strong> bien(s) trouvé(s)
      </p>
    </aside>
  );
}
