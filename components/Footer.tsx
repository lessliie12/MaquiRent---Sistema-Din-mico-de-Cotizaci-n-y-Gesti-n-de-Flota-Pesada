'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp, Shield } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101214] text-white border-t border-white/10">
      {/* Upper footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Bio */}
          <div>
            <a href="#top" className="flex items-center gap-3 group">
              <div className="grid size-9 place-items-center rounded-xl bg-[#f6c400] text-[#141719] font-black text-lg">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-ornamental text-lg font-bold tracking-tight leading-none text-white uppercase">
                  MAQUI<span className="text-[#f6c400]">-RENT</span>
                </span>
                <span className="font-editorial-sans text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase mt-0.5">
                  Equipos CAT<span className="text-[#f6c400]">®</span> Colombia
                </span>
              </div>
            </a>

            <p className="mt-4 text-xs leading-relaxed text-white/60 font-sans">
              Soluciones integrales de alquiler y venta de maquinaria pesada Caterpillar para minería, obras de infraestructura y construcción civil en todo el territorio colombiano.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-emerald-400 font-semibold font-sans">
              <ShieldCheck className="size-4" />
              <span>RUNT y Pólizas Vigentes</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-editorial-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#f6c400] mb-4">
              Navegación Rápida
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#top" className="hover:text-white transition">Inicio</a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-white transition">Catálogo de Maquinaria</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition">Simulador de Tarifas</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">Servicios y Mantenimiento</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">Sobre Nosotros</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">Preguntas Frecuentes</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">Contacto y Radicación</a>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link href="/admin" className="text-[#f6c400] font-bold flex items-center gap-1.5 hover:underline">
                  <Shield className="size-3.5" /> Portal Asesores & CRM
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Patios & Cobertura */}
          <div>
            <h4 className="font-editorial-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#f6c400] mb-4">
              Patios de Operación
            </h4>
            <ul className="space-y-3 text-xs text-white/70 font-sans">
              <li className="flex items-start gap-2">
                <MapPin className="size-3.5 text-[#f6c400] shrink-0 mt-0.5" />
                <span><strong>Bogotá D.C.:</strong> Autopista Medellín Km 3.5, Corredor Industrial Cota</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-3.5 text-[#f6c400] shrink-0 mt-0.5" />
                <span><strong>Medellín:</strong> Autopista Sur Calle 85, Itagüí</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-3.5 text-[#f6c400] shrink-0 mt-0.5" />
                <span><strong>Barranquilla:</strong> Vía 40 con Calle 76, Zona Portuaria</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-3.5 text-[#f6c400] shrink-0 mt-0.5" />
                <span><strong>Cali / Yumbo:</strong> Calle 15 Zona Industrial Arroyohondo</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Línea de Emergencias y Redes */}
          <div>
            <h4 className="font-editorial-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#f6c400] mb-4">
              Atención 24/7
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#f6c400]" />
                <span>PBX Nacional: (601) 745-9000</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#f6c400]" />
                <span>Móvil Obra: +57 (310) 555-0190</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#f6c400]" />
                <span>info@maqui-rent.com.co</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="block text-[10px] uppercase font-bold text-white/40 mb-2">
                Redes Institucionales
              </span>
              <div className="flex gap-3 text-xs font-bold text-white/70">
                <a href="#top" className="grid size-8 place-items-center rounded-lg bg-white/5 hover:bg-[#f6c400] hover:text-[#141719] transition">
                  in
                </a>
                <a href="#top" className="grid size-8 place-items-center rounded-lg bg-white/5 hover:bg-[#f6c400] hover:text-[#141719] transition">
                  ig
                </a>
                <a href="#top" className="grid size-8 place-items-center rounded-lg bg-white/5 hover:bg-[#f6c400] hover:text-[#141719] transition">
                  fb
                </a>
                <a href="#top" className="grid size-8 place-items-center rounded-lg bg-white/5 hover:bg-[#f6c400] hover:text-[#141719] transition">
                  yt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-white/5 bg-[#0a0c0d] py-6 text-xs text-white/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-10">
          <div>
            © {new Date().getFullYear()} MAQUI-RENT COLOMBIA S.A.S. NIT: 901.458.219-4. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <a href="#top" className="hover:text-white transition">Términos de Servicio</a>
            <a href="#top" className="hover:text-white transition">Tratamiento de Datos Personales</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#f6c400] hover:underline"
              aria-label="Volver arriba"
            >
              <ArrowUp className="size-3" /> Arriba
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
