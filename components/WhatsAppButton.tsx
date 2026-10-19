'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const defaultMessage = encodeURIComponent(
    'Hola Maqui-Rent Colombia, requiero información sobre disponibilidad y tarifas de maquinaria pesada para una obra.'
  );

  return (
    <aside aria-label="Contacto por WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/573105550190?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar por WhatsApp con un asesor"
        className="group relative flex items-center justify-center size-14 rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition duration-300 hover:scale-110 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        <MessageCircle className="size-7 fill-white text-emerald-500" />
        
        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#141719] px-3 py-1.5 text-xs font-bold text-white shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 border border-white/10">
          ¿Cotización rápida? ¡Escríbenos!
        </span>

        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping -z-10" />
      </a>
    </aside>
  );
}
