"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UploadCloud, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import { Property } from "@/lib/types";

interface PropertyFormProps {
  initialData?: Partial<Property>;
  mode: "create" | "edit";
}

const AMENITY_FIELDS: { key: keyof Property; label: string }[] = [
  { key: "has_parking", label: "Parking" },
  { key: "has_elevator", label: "Ascenseur" },
  { key: "has_pool", label: "Piscine" },
  { key: "has_garden", label: "Jardin" },
  { key: "is_furnished", label: "Meublé" },
  { key: "is_featured", label: "Mettre en avant (page d'accueil)" },
];

export default function PropertyForm({ initialData, mode }: PropertyFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    listing_type: initialData?.listing_type || "vente",
    property_type: initialData?.property_type || "appartement",
    status: initialData?.status || "disponible",
    price: initialData?.price?.toString() || "",
    city: initialData?.city || "Casablanca",
    neighborhood: initialData?.neighborhood || "",
    address: initialData?.address || "",
    surface_area: initialData?.surface_area?.toString() || "",
    bedrooms: initialData?.bedrooms?.toString() || "0",
    bathrooms: initialData?.bathrooms?.toString() || "0",
    year_built: initialData?.year_built?.toString() || "",
    agent_name: initialData?.agent_name || "",
    agent_phone: initialData?.agent_phone || "",
    agent_whatsapp: initialData?.agent_whatsapp || "",
    has_parking: initialData?.has_parking || false,
    has_elevator: initialData?.has_elevator || false,
    has_pool: initialData?.has_pool || false,
    has_garden: initialData?.has_garden || false,
    is_furnished: initialData?.is_furnished || false,
    is_featured: initialData?.is_featured || false,
  });

  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const handleImageUrlAdd = (url: string) => {
    if (url) setImages((prev) => [...prev, url]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        title: form.title,
        slug: slugify(form.title),
        description: form.description,
        listing_type: form.listing_type,
        property_type: form.property_type,
        status: form.status,
        price: Number(form.price),
        city: form.city,
        neighborhood: form.neighborhood,
        address: form.address,
        surface_area: Number(form.surface_area),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        year_built: form.year_built ? Number(form.year_built) : null,
        agent_name: form.agent_name,
        agent_phone: form.agent_phone,
        agent_whatsapp: form.agent_whatsapp,
        has_parking: form.has_parking,
        has_elevator: form.has_elevator,
        has_pool: form.has_pool,
        has_garden: form.has_garden,
        is_furnished: form.is_furnished,
        is_featured: form.is_featured,
        images,
      };

      if (mode === "create") {
        await supabase.from("properties").insert(payload);
      } else if (initialData?.id) {
        await supabase.from("properties").update(payload).eq("id", initialData.id);
      }
      router.push("/admin/proprietes");
      router.refresh();
    } catch {
      alert("Impossible d'enregistrer la propriété. Vérifiez votre configuration Supabase.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="space-y-5 p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Informations générales</h2>

        <div>
          <Label htmlFor="title">Titre de l&apos;annonce</Label>
          <Input
            id="title"
            required
            value={form.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="Ex : Villa moderne avec piscine à Californie"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            required
            rows={5}
            value={form.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Décrivez le bien en détail…"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>Transaction</Label>
            <Select value={form.listing_type} onValueChange={(v) => update({ listing_type: v as "vente" | "location" })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="vente">Vente</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Type de bien</Label>
            <Select value={form.property_type} onValueChange={(v) => update({ property_type: v as Property["property_type"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="appartement">Appartement</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="maison">Maison</SelectItem>
                <SelectItem value="bureau">Bureau</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="terrain">Terrain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Statut</Label>
            <Select value={form.status} onValueChange={(v) => update({ status: v as Property["status"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="reserve">Réservé</SelectItem>
                <SelectItem value="vendu">Vendu</SelectItem>
                <SelectItem value="loue">Loué</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="price">Prix (DH)</Label>
            <Input id="price" type="number" required value={form.price} onChange={(e) => update({ price: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="surface">Surface (m²)</Label>
            <Input id="surface" type="number" required value={form.surface_area} onChange={(e) => update({ surface_area: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="year">Année de construction</Label>
            <Input id="year" type="number" value={form.year_built} onChange={(e) => update({ year_built: e.target.value })} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="bedrooms">Chambres</Label>
            <Input id="bedrooms" type="number" value={form.bedrooms} onChange={(e) => update({ bedrooms: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="bathrooms">Salles de bain</Label>
            <Input id="bathrooms" type="number" value={form.bathrooms} onChange={(e) => update({ bathrooms: e.target.value })} />
          </div>
        </div>
      </Card>

      <Card className="space-y-5 p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Localisation</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="city">Ville</Label>
            <Input id="city" required value={form.city} onChange={(e) => update({ city: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="neighborhood">Quartier</Label>
            <Input id="neighborhood" required value={form.neighborhood} onChange={(e) => update({ neighborhood: e.target.value })} />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Adresse complète</Label>
          <Input id="address" required value={form.address} onChange={(e) => update({ address: e.target.value })} />
        </div>
      </Card>

      <Card className="space-y-5 p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Équipements</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {AMENITY_FIELDS.map((field) => (
            <label key={field.key} className="flex items-center gap-2 text-sm text-navy-700">
              <Checkbox
                checked={form[field.key as keyof typeof form] as boolean}
                onCheckedChange={(checked) => update({ [field.key]: !!checked } as Partial<typeof form>)}
              />
              {field.label}
            </label>
          ))}
        </div>
      </Card>

      <Card className="space-y-5 p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Photos</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((img, i) => (
            <div key={img + i} className="group relative h-24 overflow-hidden rounded-sm border border-navy-900/8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy-950/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Coller l'URL d'une image et appuyer sur Entrée"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleImageUrlAdd((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
        </div>
        <p className="flex items-center gap-1.5 text-xs text-navy-400">
          <UploadCloud className="h-3.5 w-3.5" />
          En production, branchez ce champ sur Supabase Storage pour l&apos;upload direct de fichiers.
        </p>
      </Card>

      <Card className="space-y-5 p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Conseiller en charge</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="agent_name">Nom</Label>
            <Input id="agent_name" required value={form.agent_name} onChange={(e) => update({ agent_name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="agent_phone">Téléphone</Label>
            <Input id="agent_phone" required value={form.agent_phone} onChange={(e) => update({ agent_phone: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="agent_whatsapp">Numéro WhatsApp (format international)</Label>
            <Input id="agent_whatsapp" required value={form.agent_whatsapp} onChange={(e) => update({ agent_whatsapp: e.target.value })} placeholder="212600000000" />
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/proprietes")}>
          Annuler
        </Button>
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {mode === "create" ? "Publier la propriété" : "Enregistrer les modifications"}
        </Button>
      </div>
    </form>
  );
}
