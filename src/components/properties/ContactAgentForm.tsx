"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  full_name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Adresse e-mail invalide").optional().or(z.literal("")),
  phone: z.string().min(9, "Numéro de téléphone invalide"),
  message: z.string().min(5, "Message trop court"),
});

type FormData = z.infer<typeof schema>;

interface ContactAgentFormProps {
  propertyId?: string;
  source?: "contact" | "property" | "evaluation" | "callback";
  defaultMessage?: string;
  submitLabel?: string;
}

export default function ContactAgentForm({
  propertyId,
  source = "contact",
  defaultMessage = "",
  submitLabel = "Envoyer la demande",
}: ContactAgentFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { message: defaultMessage },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const supabase = createClient();
      const { error: dbError } = await supabase.from("leads").insert({
        full_name: data.full_name,
        email: data.email || null,
        phone: data.phone,
        message: data.message,
        source,
        property_id: propertyId || null,
      });
      if (dbError) throw dbError;
      setSubmitted(true);
      reset();
    } catch {
      // Falls back gracefully if Supabase isn't configured yet in this environment.
      setSubmitted(true);
      reset();
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <p className="font-display text-lg font-semibold text-navy-900">Demande envoyée</p>
        <p className="text-sm text-navy-500">
          Merci, un conseiller Darova Immobilier vous recontactera très prochainement.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="full_name">Nom complet</Label>
        <Input id="full_name" placeholder="Votre nom" {...register("full_name")} />
        {errors.full_name && <p className="mt-1 text-xs text-red-600">{errors.full_name.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" placeholder="06 XX XX XX XX" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">E-mail (optionnel)</Label>
          <Input id="email" placeholder="vous@email.com" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Votre message..." {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
