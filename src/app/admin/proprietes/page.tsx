"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { mockProperties } from "@/lib/data/mock-properties";
import { formatPriceMAD } from "@/lib/utils";

export default function AdminPropertiesPage() {
  const [query, setQuery] = useState("");
  const [properties, setProperties] = useState(mockProperties);

  const filtered = properties.filter((p) =>
    `${p.title} ${p.city} ${p.neighborhood}`.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Supprimer définitivement cette propriété ?")) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <Input
            placeholder="Rechercher une propriété…"
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button variant="gold" asChild>
          <Link href="/admin/proprietes/nouveau">
            <Plus className="h-4 w-4" />
            Ajouter une propriété
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy-50">
              <tr className="text-left text-xs uppercase tracking-wide text-navy-400">
                <th className="px-5 py-3 font-medium">Propriété</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Prix</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium">Vues</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-navy-900/8">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm">
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-navy-900 line-clamp-1">{p.title}</p>
                        <p className="text-xs text-navy-400">{p.neighborhood}, {p.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 capitalize text-navy-600">{p.property_type}</td>
                  <td className="px-5 py-3 text-navy-600">{formatPriceMAD(p.price)}</td>
                  <td className="px-5 py-3">
                    <Badge variant={p.status === "disponible" ? "success" : "warning"} className="capitalize">
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-navy-500">{p.views_count}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/propriete/${p.slug}`}
                        target="_blank"
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-navy-500 hover:bg-navy-50 hover:text-navy-900"
                        aria-label="Voir"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/proprietes/${p.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-navy-500 hover:bg-navy-50 hover:text-navy-900"
                        aria-label="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-red-500 hover:bg-red-50"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
