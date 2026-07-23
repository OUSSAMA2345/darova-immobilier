import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PropertyForm mode="create" />
    </div>
  );
}
