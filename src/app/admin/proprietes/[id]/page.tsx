import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { mockProperties } from "@/lib/data/mock-properties";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);
  if (!property) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <PropertyForm mode="edit" initialData={property} />
    </div>
  );
}
