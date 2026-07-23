export default function PropertyMap({
  latitude,
  longitude,
  title,
}: {
  latitude: number;
  longitude: number;
  title: string;
}) {
  const src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <div className="overflow-hidden rounded-md border border-navy-900/8">
      <iframe
        title={`Carte — ${title}`}
        src={src}
        width="100%"
        height="360"
        loading="lazy"
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
