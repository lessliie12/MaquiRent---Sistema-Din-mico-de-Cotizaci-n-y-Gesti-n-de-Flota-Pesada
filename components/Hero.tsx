'use client';

import { ArrowRight, Calculator, CheckCircle2, Shield, Wrench, Truck } from 'lucide-react';

interface HeroProps {
  onScrollToCatalog: () => void;
  onScrollToCalculator: () => void;
}

export function Hero({ onScrollToCatalog, onScrollToCalculator }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden bg-[#171a1c] pt-12 pb-24 lg:pt-20 lg:pb-32 text-white">
      {/* Background Graphic Grid and Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#f6c400_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-[#f6c400]/10 blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f6c400]/40 bg-[#f6c400]/10 px-3.5 py-1.5 text-xs font-bold text-[#f6c400] backdrop-blur-sm mb-6">
              <span className="inline-block size-2 rounded-full bg-[#f6c400] animate-ping" />
              Líderes en Alquiler de Maquinaria Pesada en Colombia
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.05]">
              Potencia y Respaldo para tu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f6c400] via-[#ffd52b] to-[#f6a000]">
                Próxima Obra.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Alquiler de flotas CAT® de última generación para infraestructura, minería y construcción civil.
              Disponibilidad inmediata, operadores certificados y asistencia técnica 24/7 en cualquier punto de Colombia.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onScrollToCatalog}
                className="flex items-center justify-center gap-3 rounded-xl bg-[#f6c400] px-7 py-4 text-sm font-black text-[#141719] shadow-lg shadow-[#f6c400]/25 transition hover:bg-[#ffd52b] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Explorar Catálogo ({new Date().getFullYear()})
                <ArrowRight className="size-4" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:border-[#f6c400] hover:bg-white/10"
              >
                <Calculator className="size-4 text-[#f6c400]" />
                Simulador de Tarifas
              </button>
            </div>

            {/* Key Value Points */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 pt-8 text-xs">
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="size-4 text-[#f6c400] shrink-0" />
                <span>Horómetros certificados</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Truck className="size-4 text-[#f6c400] shrink-0" />
                <span>Cama baja propia a nivel nacional</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Wrench className="size-4 text-[#f6c400] shrink-0" />
                <span>Soporte en obra &lt; 4 horas</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Box / Card */}
          <div className="relative">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#f6c400]">
                    Destacado de Flota
                  </span>
                  <h3 className="text-xl font-black text-white">CAT 320 Nueva Generación</h3>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                  Disponible Hoy
                </span>
              </div>

              <div className="relative my-4 overflow-hidden rounded-2xl bg-[#0e1011] p-4">
                <img
                  src="/images/cat-320-excavator.png"
                  alt="CAT 320 Excavadora"
                  className="w-full object-cover rounded-xl transition duration-500 hover:scale-105"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                  <span className="block text-white/50 text-[10px] uppercase font-bold">Tarifa Diaria desde</span>
                  <span className="text-base font-black text-[#f6c400]">$1.950.000 COP</span>
                  <span className="block text-[10px] text-white/40">+ IVA</span>
                </div>
                <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                  <span className="block text-white/50 text-[10px] uppercase font-bold">Capacidad</span>
                  <span className="text-sm font-black text-white">22 Ton · 1.19 m³</span>
                  <span className="block text-[10px] text-white/40">Cat GRADE 2D</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <Shield className="size-3.5 text-[#f6c400]" /> Póliza todo riesgo incluida
                </span>
                <span className="font-semibold text-[#f6c400]">Telemetría GPS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
