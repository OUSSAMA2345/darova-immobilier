import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "Questions fréquentes — FAQ",
  description:
    "Réponses aux questions fréquentes sur l'achat, la vente et la location immobilière à Casablanca avec Darova Immobilier.",
};

export default function FAQPage() {
  return <FAQClient />;
}
