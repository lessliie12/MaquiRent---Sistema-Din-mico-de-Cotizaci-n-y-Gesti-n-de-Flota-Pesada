'use client';

import { Shield, Award, MapPin, Users, CheckCircle2 } from 'lucide-react';
import { companyStats } from '@/lib/data/machines';

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-[#f4f5f6] py-20 lg:py-28 text-[#141719] border-b border-[#e3e5e7]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#141719] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f6c400] mb-4">
            Sobre Maqui-Rent Colombia
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#141719]">
            Más de una Década Impulsando la Infraestructura del País
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5a6268]">
            Nacimos con el objetivo de ofrecer a contratistas, consorcios viales y empresas mineras una solución confiable de alquiler de maquinaria pesada Caterpillar®. Eliminamos el sobrecosto de mantenimiento y tiempos muertos mediante tecnología predictiva y operadores altamente calificados.
          </p>
        </div>

        {/* Company Stats Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {companyStats.map((stat, i) => (
            <div
              key={i}
              className="rounded-3xl border border-[#e3e5e7] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="text-3xl sm:text-4xl font-black text-[#141719] tracking-tight">
                <span className="text-[#b08e00]">{stat.value}</span>
              </div>
              <div className="mt-2 text-xs font-bold text-[#141719]">{stat.label}</div>
              <div className="mt-1 text-[11px] text-[#687076]">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* 3 Pillars */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#e3e5e7] bg-white p-8">
            <div className="grid size-12 place-items-center rounded-2xl bg-[#f6c400]/20 text-[#9e7600] mb-6">
              <Shield className="size-6" />
            </div>
            <h3 className="text-lg font-black text-[#141719] mb-2">Compromiso SST & Calidad</h3>
            <p className="text-xs leading-relaxed text-[#687076]">
              Cumplimiento estricto de las normas ISO 9001, ISO 14001 e ISO 45001. Toda nuestra maquinaria cuenta con certificado de inspección técnico-mecánica vigente y póliza de responsabilidad civil extracontractual.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e3e5e7] bg-white p-8">
            <div className="grid size-12 place-items-center rounded-2xl bg-[#f6c400]/20 text-[#9e7600] mb-6">
              <Users className="size-6" />
            </div>
            <h3 className="text-lg font-black text-[#141719] mb-2">Operadores Certificados SENA</h3>
            <p className="text-xs leading-relaxed text-[#687076]">
              Personal con experiencia mínima de 5 años en movimiento de tierras, afiliación a seguridad social con ARL riesgo V, exámenes médicos ocupacionales y cursos de trabajo seguro en alturas y espacios confinados.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e3e5e7] bg-white p-8">
            <div className="grid size-12 place-items-center rounded-2xl bg-[#f6c400]/20 text-[#9e7600] mb-6">
              <MapPin className="size-6" />
            </div>
            <h3 className="text-lg font-black text-[#141719] mb-2">Cobertura Nacional y Patios</h3>
            <p className="text-xs leading-relaxed text-[#687076]">
              Patios de operaciones principales en Bogotá D.C., Medellín (Itagüí), Barranquilla (Vía 40) y Cali (Yumbo). Despachamos equipos a cualquier municipio o frente de obra en Colombia en menos de 24 a 48 horas.
            </p>
          </div>
        </div>

        {/* Banner de Garantía */}
        <div className="mt-12 rounded-3xl bg-[#141719] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f6c400] text-[#141719]">
              <Award className="size-7" />
            </div>
            <div>
              <h4 className="text-base font-black text-white">Garantía de Sustitución Mecánica Maqui-Rent</h4>
              <p className="text-xs text-white/60 mt-0.5">
                Si un equipo presenta una falla que supere las 12 horas, lo reemplazamos inmediatamente sin costo de movilización.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#f6c400] shrink-0">
            <CheckCircle2 className="size-4" /> 100% Respaldado
          </div>
        </div>
      </div>
    </section>
  );
}
