"use client";

import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ContactAgentForm from "@/components/properties/ContactAgentForm";

export default function RequestVisitButton({
  propertyId,
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="navy" size="lg" className="w-full">
          <CalendarCheck className="h-4 w-4" />
          Demander une visite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="mb-1">Planifier une visite</DialogTitle>
        <p className="mb-5 text-sm text-navy-500">{propertyTitle}</p>
        <ContactAgentForm
          propertyId={propertyId}
          source="property"
          defaultMessage={`Bonjour, je souhaite planifier une visite pour ce bien : ${propertyTitle}.`}
          submitLabel="Confirmer la demande de visite"
        />
      </DialogContent>
    </Dialog>
  );
}
