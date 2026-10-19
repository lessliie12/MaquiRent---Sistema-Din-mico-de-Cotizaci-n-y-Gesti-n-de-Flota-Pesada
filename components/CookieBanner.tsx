'use client';

import { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a decision
    const consent = localStorage.getItem('maqui_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('maqui_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('maqui_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Consentimiento de Cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-3xl border border-white/15 bg-[#141719]/95 text-white p-5 shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-xl bg-[#f6c400] text-[#141719] shrink-0">
              <Cookie className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-black tracking-tight text-white">Privacidad & Cookies Técnicas</h4>
              <span className="text-[10px] text-white/50 block">Optimización y Seguridad de Sesión</span>
            </div>
          </div>
          <button
            onClick={handleAcceptEssential}
            className="text-white/40 hover:text-white transition p-1"
            aria-label="Cerrar aviso de cookies"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-white/70">
          Utilizamos cookies técnicas y analíticas para garantizar el correcto funcionamiento del simulador de tarifas, recordar tus cotizaciones y proteger la navegación contra ciberamenazas.
        </p>

        <div className="mt-4 flex items-center gap-2 pt-1 border-t border-white/10">
          <button
            onClick={handleAcceptAll}
            className="flex-1 rounded-xl bg-[#f6c400] px-3.5 py-2 text-xs font-black text-[#141719] hover:bg-[#ffd52b] transition shadow-md"
          >
            Aceptar Todas
          </button>
          <button
            onClick={handleAcceptEssential}
            className="flex-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold text-white/80 hover:bg-white/10 transition"
          >
            Solo Esenciales
          </button>
        </div>
      </div>
    </div>
  );
}
