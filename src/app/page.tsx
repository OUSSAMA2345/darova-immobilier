import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Categories from "@/components/home/Categories";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import ContactSection from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Agence immobilière à Casablanca — Achat, vente, location",
  description:
    "Darova Immobilier accompagne particuliers et investisseurs à Casablanca pour l'achat, la vente et la location d'appartements, villas, maisons, bureaux, commerces et terrains.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Categories />
      <Testimonials />
      <CTASection />
      <ContactSection />
    </>
  );
}
