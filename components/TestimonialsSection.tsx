'use client';

import { Star, Building2, Quote } from 'lucide-react';
import { testimonialsData } from '@/lib/data/machines';

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20 lg:py-28 text-[#141719] border-b border-[#e3e5e7]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f6c400]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9e7600] mb-3">
            Casos de Éxito y Confianza
          </div>
          <h2 className="text-3xl sm:text-5xl tracking-tight text-[#141719]">
            <span className="font-serif italic font-normal">Respaldando a los</span>{' '}
            <span className="font-sans font-black">Mayores Constructores</span>
          </h2>
          <p className="mt-3 text-sm text-[#687076]">
            Lo que dicen los directores de obra y gerentes de proyectos que confían en Maqui-Rent.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonialsData.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-[#e3e5e7] bg-[#fafbfc] p-8 shadow-sm transition hover:shadow-md"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4 text-[#f6c400]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-[#f6c400]" />
                  ))}
                </div>

                <Quote className="size-8 text-[#f6c400]/40 mb-3" />

                <p className="text-sm leading-relaxed text-[#2d3748] font-serif italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 border-t border-[#e3e5e7] pt-4">
                <div className="text-sm font-black text-[#141719]">{t.name}</div>
                <div className="text-xs font-semibold text-[#8a9298]">{t.role}</div>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#b08e00]">
                  <Building2 className="size-3" />
                  {t.company} — <span className="font-normal text-[#687076]">{t.project}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
