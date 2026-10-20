'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, FileText, Phone } from 'lucide-react';
import { faqData } from '@/lib/data/machines';

interface FAQSectionProps {
  onScrollToContact: () => void;
}

export function FAQSection({ onScrollToContact }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-20 bg-[#f4f5f6] py-20 lg:py-28 text-[#141719] border-b border-[#e3e5e7]">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#141719] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f6c400] mb-3">
            <HelpCircle className="size-3.5" />
            Resolución de Dudas Frecuentes
          </div>
          <h2 className="text-3xl sm:text-5xl tracking-tight text-[#141719]">
            <span className="font-serif italic font-normal">Preguntas Frecuentes</span>{' '}
            <span className="font-sans font-black">de Alquiler</span>
          </h2>
          <p className="mt-3 text-sm text-[#687076]">
            Todo lo que necesitas saber sobre contratos, fletes, pólizas y mantenimiento preventivo en obra.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-[#e3e5e7] bg-white transition shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-extrabold text-sm sm:text-base text-[#141719] hover:text-[#b08e00] transition"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-6 place-items-center rounded-full bg-[#f4f5f6] text-xs font-bold text-[#b08e00]">
                      {idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`size-5 text-[#8a9298] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#b08e00]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#edf0f1] px-6 py-5 text-xs sm:text-sm leading-relaxed text-[#5a6268] bg-[#fafbfc] animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-12 rounded-3xl bg-white border border-[#e3e5e7] p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-extrabold text-base text-[#141719]">¿Tienes un pliego de condiciones o licitación especial?</h4>
            <p className="text-xs text-[#687076] mt-1">
              Nuestro departamento jurídico y técnico revisa requerimientos para contratistas del Estado (SECOP) o privados.
            </p>
          </div>
          <button
            onClick={onScrollToContact}
            className="flex items-center gap-2 rounded-full bg-[#141719] px-6 py-3 text-xs font-bold text-white hover:bg-[#202326] transition shrink-0"
          >
            <FileText className="size-4 text-[#f6c400]" />
            Enviar Pliego de Condiciones
          </button>
        </div>
      </div>
    </section>
  );
}
