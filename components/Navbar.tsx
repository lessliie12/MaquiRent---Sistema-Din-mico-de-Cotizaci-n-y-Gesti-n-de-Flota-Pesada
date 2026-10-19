'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, PhoneCall, ShieldCheck, Shield } from 'lucide-react';

interface NavbarProps {
  quoteCount: number;
  onOpenQuoteDrawer: () => void;
  onOpenQuickQuote: () => void;
}

export function Navbar({ quoteCount, onOpenQuoteDrawer, onOpenQuickQuote }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#141719]/90 text-white backdrop-blur-md transition-all">
      {/* Top microbar */}
      <div className="hidden border-b border-white/5 bg-[#0e1011] py-1.5 text-xs text-white/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="inline-block size-2 animate-pulse rounded-full bg-emerald-500" />
              Flota 100% disponible para despacho nacional
            </span>
            <span className="hidden items-center gap-1.5 text-white/50 lg:flex">
              <ShieldCheck className="size-3.5 text-[#f6c400]" />
              Equipos con certificación RUNT y telemetría activa
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+573105550190" className="flex items-center gap-1.5 hover:text-[#f6c400] transition">
              <PhoneCall className="size-3.5 text-[#f6c400]" />
              Línea Nacional: +57 (310) 555-0190
            </a>
            <span className="text-white/30">|</span>
            <Link
              href="/admin"
              className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-[#f6c400] hover:bg-[#f6c400] hover:text-[#111315] transition flex items-center gap-1"
            >
              <Shield className="size-3" /> Portal Asesores (/admin)
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#f6c400] to-[#dfb000] text-[#141719] font-black text-xl shadow-md shadow-[#f6c400]/20 transition group-hover:scale-105">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight leading-none">
              MAQUI<span className="text-[#f6c400]">-RENT</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">
              Equipos CAT<span className="text-[#f6c400]">®</span> Colombia
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-wider text-white/80 md:flex">
          <a href="#equipment" className="hover:text-[#f6c400] transition">Maquinaria</a>
          <a href="#calculator" className="hover:text-[#f6c400] transition flex items-center gap-1">
            Calculadora
            <span className="rounded bg-[#f6c400]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#f6c400]">En vivo</span>
          </a>
          <a href="#services" className="hover:text-[#f6c400] transition">Servicios</a>
          <a href="#about" className="hover:text-[#f6c400] transition">Nosotros</a>
          <a href="#faq" className="hover:text-[#f6c400] transition">Preguntas</a>
          <a href="#contact" className="hover:text-[#f6c400] transition">Contacto</a>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuoteDrawer}
            aria-label="Ver bolsa de cotización"
            className="relative flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition hover:border-[#f6c400] hover:bg-white/10"
          >
            <ShoppingBag className="size-4 text-[#f6c400]" />
            <span className="hidden sm:inline">Mi Cotización</span>
            {quoteCount > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-[#f6c400] text-[10px] font-black text-[#141719]">
                {quoteCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenQuickQuote}
            className="hidden rounded-full bg-[#f6c400] px-5 py-2.5 text-xs font-extrabold text-[#141719] shadow-md shadow-[#f6c400]/20 transition hover:bg-[#ffd52b] hover:shadow-lg active:scale-95 sm:block"
          >
            Cotizar Ahora
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid size-10 place-items-center rounded-xl border border-white/20 text-white md:hidden"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#171a1c] px-6 py-6 text-sm md:hidden animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4 font-semibold text-white/90">
            <a
              href="#equipment"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#f6c400]"
            >
              Maquinaria en Alquiler
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 flex items-center justify-between hover:text-[#f6c400]"
            >
              <span>Calculadora de Alquiler</span>
              <span className="rounded bg-[#f6c400] px-2 py-0.5 text-[10px] font-bold text-[#141719]">Interactiva</span>
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#f6c400]"
            >
              Servicios y Soporte en Obra
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#f6c400]"
            >
              Sobre Nosotros
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#f6c400]"
            >
              Preguntas Frecuentes
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#f6c400]"
            >
              Contacto y Sedes
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 flex items-center justify-between text-[#f6c400] font-bold"
            >
              <span>Portal Asesores & CRM</span>
              <span className="rounded bg-[#f6c400]/20 px-2 py-0.5 text-[10px]">Acceso Asesor</span>
            </Link>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteDrawer();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#f6c400] py-3 text-xs font-bold text-[#f6c400]"
              >
                <ShoppingBag className="size-4" /> Ver Cotización ({quoteCount} equipos)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuickQuote();
                }}
                className="w-full rounded-xl bg-[#f6c400] py-3 text-xs font-black text-[#141719]"
              >
                Solicitar Cotización Inmediata
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
