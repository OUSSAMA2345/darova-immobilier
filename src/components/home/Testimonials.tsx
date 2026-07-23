import Image from "next/image";
import { Star } from "lucide-react";
import { mockTestimonials } from "@/lib/data/mock-testimonials";

export default function Testimonials() {
  return (
    <section className="section-pad bg-navy-gradient">
      <div className="container">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3 justify-center text-gold-400">Témoignages clients</p>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Ce que disent nos clients
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mockTestimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-md border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating ? "fill-gold-500 text-gold-500" : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-white/75">
                &laquo; {t.comment} &raquo;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.client_avatar}
                  alt={t.client_name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{t.client_name}</p>
                  <p className="text-xs text-white/50">{t.client_role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
