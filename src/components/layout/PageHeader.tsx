export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-navy-gradient pb-16 pt-36">
      <div className="container">
        <p className="eyebrow mb-3 text-gold-400">{eyebrow}</p>
        <h1 className="max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
          {title}
        </h1>
        {description && <p className="mt-4 max-w-xl text-white/70">{description}</p>}
      </div>
    </section>
  );
}
