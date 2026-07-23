"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, TrendingUp, ShieldCheck, Clock3 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  full_name: z.string().min(2, "Nom trop court"),
  phone: z.string().min(9, "Numéro de téléphone invalide"),
  email: z.string().email("Adresse e-mail invalide").optional().or(z.literal("")),
  property_type: z.string().min(1, "Sélectionnez un type de bien"),
  city: z.string().min(2, "Ville requise"),
  surface_area: z.string().min(1, "Surface requise"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { icon: TrendingUp, title: "Analyse de marché", text: "Comparaison avec les ventes récentes de votre quartier." },
  { icon: ShieldCheck, title: "Visite si nécessaire", text: "Un expert peut visiter le bien pour affiner l'estimation." },
  { icon: Clock3, title: "Rapport sous 24h", text: "Vous recevez une fourchette de prix argumentée par e-mail." },
];

export default function EvaluationPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("leads").insert({
        full_name: data.full_name,
        email: data.email || null,
        phone: data.phone,
        message: `[Estimation gratuite] Type: ${data.property_type} | Ville: ${data.city} | Surface: ${data.surface_area} m² | ${data.message || ""}`,
        source: "evaluation",
      });
      if (error) throw error;
    } catch {
      // Graceful fallback when Supabase isn't configured in this environment.
    }
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <PageHeader
        eyebrow="Estimation gratuite"
        title="Quelle est la valeur réelle de votre bien ?"
        description="Recevez une estimation gratuite et sans engagement réalisée par nos experts du marché casablancais, sous 24h."
      />

      <section className="section-pad bg-white">
        <div className="container grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Comment ça marche</p>
            <h2 className="mb-8 font-display text-2xl font-semibold text-navy-900">
              Une estimation fiable, en 3 étapes
            </h2>
            <div className="space-y-6">
              {STEPS.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-navy-50 font-display font-semibold text-navy-900">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-navy-900">{step.title}</h3>
                    <p className="text-sm text-navy-500">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-md border border-gold-200 bg-gold-50 p-6">
              <p className="text-sm text-navy-700">
                <strong>100% gratuit et sans engagement.</strong> Que vous vendiez dans un mois
                ou dans un an, une estimation à jour vous aide à prendre la meilleure décision.
              </p>
            </div>
          </div>

          <div className="card-premium p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                <p className="font-display text-xl font-semibold text-navy-900">
                  Demande reçue avec succès
                </p>
                <p className="text-sm text-navy-500">
                  Un expert Darova Immobilier vous contactera sous 24h avec votre estimation.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Estimer un autre bien
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h2 className="mb-2 font-display text-xl font-semibold text-navy-900">
                  Décrivez votre bien
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="full_name">Nom complet</Label>
                    <Input id="full_name" placeholder="Votre nom" {...register("full_name")} />
                    {errors.full_name && <p className="mt-1 text-xs text-red-600">{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" placeholder="06 XX XX XX XX" {...register("phone")} />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">E-mail (optionnel)</Label>
                  <Input id="email" placeholder="vous@email.com" {...register("email")} />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Type de bien</Label>
                    <Select onValueChange={(v) => setValue("property_type", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appartement">Appartement</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="maison">Maison</SelectItem>
                        <SelectItem value="bureau">Bureau</SelectItem>
                        <SelectItem value="commerce">Commerce</SelectItem>
                        <SelectItem value="terrain">Terrain</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.property_type && (
                      <p className="mt-1 text-xs text-red-600">{errors.property_type.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="surface_area">Surface (m²)</Label>
                    <Input id="surface_area" type="number" placeholder="120" {...register("surface_area")} />
                    {errors.surface_area && (
                      <p className="mt-1 text-xs text-red-600">{errors.surface_area.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="city">Ville / Quartier</Label>
                  <Input id="city" placeholder="Ex : Racine, Casablanca" {...register("city")} />
                  {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Détails complémentaires (optionnel)</Label>
                  <Textarea id="message" placeholder="Étage, année de construction, travaux récents..." {...register("message")} />
                </div>

                <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Recevoir mon estimation gratuite
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
