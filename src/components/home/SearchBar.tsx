"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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

export default function SearchBar() {
  const router = useRouter();
  const [mode, setMode] = useState<"vente" | "location">("vente");
  const [city, setCity] = useState<string>("");
  const [type, setType] = useState<string>("tous");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set("ville", city);
    if (type && type !== "tous") params.set("type", type);
    const base = mode === "vente" ? "/proprietes-a-vendre" : "/proprietes-a-louer";
    router.push(`${base}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-3xl rounded-md bg-white/95 p-2 shadow-premium backdrop-blur">
      <div className="flex gap-1 border-b border-navy-900/8 px-3 pt-2">
        {(["vente", "location"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-t-sm px-4 py-2.5 text-sm font-semibold transition-colors",
              mode === m
                ? "border-b-2 border-gold-500 text-navy-900"
                : "text-navy-400 hover:text-navy-700"
            )}
          >
            {m === "vente" ? "Acheter" : "Louer"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 p-3 sm:flex-row">
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="sm:w-1/3">
            <SelectValue placeholder="Ville / Quartier" />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="sm:w-1/3">
            <SelectValue placeholder="Type de bien" />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="gold" size="lg" className="sm:w-1/3" onClick={handleSearch}>
          <Search className="h-4 w-4" />
          Rechercher
        </Button>
      </div>
    </div>
  );
}
