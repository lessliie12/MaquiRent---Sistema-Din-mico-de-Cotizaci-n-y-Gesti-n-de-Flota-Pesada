'use client';

import { ArrowRight, Calculator, CheckCircle2, Shield, Wrench, Truck, ChevronDown } from 'lucide-react';

interface HeroProps {
  onScrollToCatalog: () => void;
  onScrollToCalculator: () => void;
}

export function Hero({ onScrollToCatalog, onScrollToCalculator }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden bg-[#0d0f10] text-white pt-6 pb-20 lg:pt-10 lg:pb-28">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f6c400_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* Vertical Margin Ribbons - Exact Joasia Fidler Framing */}
      <div className="hidden xl:flex fixed left-3 top-28 bottom-10 z-20 w-8 flex-col justify-between items-center pointer-events-none text-white/30 text-[10px] uppercase font-bold tracking-[0.3em]">
        <span className="[writing-mode:vertical-rl] rotate-180 text-[#f6c400]/70">MAQUI-RENT COLOMBIA</span>
        <div className="w-[1px] h-20 bg-white/10" />
        <span className="[writing-mode:vertical-rl] rotate-180">FLOTA PESADA 2026</span>
      </div>

      <div className="hidden xl:flex fixed right-3 top-28 bottom-10 z-20 w-8 flex-col justify-between items-center pointer-events-none text-white/30 text-[10px] uppercase font-bold tracking-[0.3em]">
        <span className="[writing-mode:vertical-rl] text-[#f6c400]/70">CAT® CERTIFIED</span>
        <div className="w-[1px] h-20 bg-white/10" />
        <span className="[writing-mode:vertical-rl]">TELEMETRÍA 24/7</span>
      </div>

      {/* Main Container with generous whitespace */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top Micro-Header */}
        <div className="text-center pt-6 pb-4">
          <p className="font-editorial-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#f6c400] font-bold">
            EQUIPOS OFICIALES CATERPILLAR® EN COLOMBIA &
          </p>
        </div>

        {/* The Central Monolithic Headline - Joasia Fidler Style */}
        <div className="text-center my-6">
          <h1 className="font-ornamental text-6xl sm:text-8xl lg:text-9xl font-normal tracking-tight text-white uppercase leading-[0.95]">
            POTENCIA & RESPALDO
          </h1>

          <div className="my-6 max-w-3xl mx-auto">
            <h2 className="font-sans text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white/90 leading-tight">
              UNA SOLUCIÓN INTEGRAL PARA TU PRÓXIMA OBRA DE INFRAESTRUCTURA, VÍAS Y MINERÍA
            </h2>
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-white/60 font-sans font-normal">
            Alquiler de flotas pesadas con disponibilidad inmediata, operadores certificados SENA (ARL V),
            cama baja propia nacional y monitoreo satelital en tiempo real Cat Product Link™.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onScrollToCatalog}
              className="flex items-center justify-center gap-3 rounded-full bg-[#f6c400] px-8 py-4 text-xs font-black uppercase tracking-widest text-[#141719] shadow-xl shadow-[#f6c400]/20 transition hover:bg-[#ffd52b] hover:scale-105 active:scale-95"
            >
              Explorar Catálogo de Flota
              <ArrowRight className="size-4" />
            </button>

            <button
              onClick={onScrollToCalculator}
              className="flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition hover:border-[#f6c400] hover:bg-white/10 hover:text-[#f6c400]"
            >
              <Calculator className="size-4 text-[#f6c400]" />
              Simular Tarifas en Vivo
            </button>
          </div>
        </div>

        {/* Featured Showcase Card with Generous Negative Space */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="font-editorial-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#f6c400]">
                  DESTACADO DE FLOTA DISPONIBLE
                </span>
                <h3 className="font-ornamental text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-1">
                  CAT 320 Nueva Generación
                </h3>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                Despacho Inmediato
              </span>
            </div>

            <div className="relative my-6 overflow-hidden rounded-2xl bg-[#090b0c] p-6 flex items-center justify-center">
              <img
                src="/images/cat-320-excavator.png"
                alt="CAT 320 Excavadora"
                className="max-h-72 object-contain transition duration-500 hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 text-center sm:text-left">
                <span className="block text-white/50 text-[10px] uppercase font-bold tracking-wider">Tarifa Diaria desde</span>
                <span className="font-ornamental text-xl font-bold text-[#f6c400]">$1.950.000 COP</span>
                <span className="block text-[10px] text-white/40">+ IVA oficial</span>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 text-center sm:text-left">
                <span className="block text-white/50 text-[10px] uppercase font-bold tracking-wider">Peso Operativo</span>
                <span className="font-sans text-sm font-extrabold text-white">22 Toneladas Métricas</span>
                <span className="block text-[10px] text-white/40">Cuchara 1.19 m³</span>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 text-center sm:text-left">
                <span className="block text-white/50 text-[10px] uppercase font-bold tracking-wider">Tecnología de Control</span>
                <span className="font-sans text-sm font-extrabold text-[#f6c400]">Cat GRADE 2D & E-Fence</span>
                <span className="block text-[10px] text-white/40">Telemetría satelital en vivo</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs text-white/70 font-sans">
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-[#f6c400]" />
                <span>Póliza todo riesgo TREC incluida</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-[#f6c400]" />
                <span>Cama baja propia a cualquier departamento</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="size-4 text-[#f6c400]" />
                <span>Soporte mecánico en obra &lt; 4 horas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll For More - Exactly as in Fidlerówna */}
        <div className="text-center mt-14">
          <button
            onClick={onScrollToCatalog}
            className="group inline-flex flex-col items-center gap-2 text-white/50 hover:text-[#f6c400] transition"
          >
            <span className="font-ornamental text-xs sm:text-sm uppercase tracking-[0.25em]">
              SCROLL FOR MORE
            </span>
            <ChevronDown className="size-4 animate-bounce text-[#f6c400]" />
          </button>
        </div>
      </div>
    </section>
  );
}

