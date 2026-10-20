'use client';

import { ArrowRight, Wrench, Truck, ShieldCheck, Cpu, Headphones, CheckCircle } from 'lucide-react';

interface ServicesSectionProps {
  onScrollToContact: () => void;
}

export function ServicesSection({ onScrollToContact }: ServicesSectionProps) {
  const services = [
    {
      number: '01',
      title: 'Alquiler Flexible de Maquinaria',
      description: 'Modalidades por día, semana, mes o proyecto completo (stand-by o llave en mano). Equipos con o sin operador certificado SENA con ARL de riesgo V.',
      icon: ShieldCheck,
      details: ['Inspección previa a entrega', 'Póliza todo riesgo TREC', 'Reemplazo inmediato por avería']
    },
    {
      number: '02',
      title: 'Mantenimiento Preventivo y Correctivo en Obra',
      description: 'Talleres móviles 4x4 equipados con diagnóstico electrónico Cat Electronic Technician (ET) y repuestos originales para respuesta en menos de 4 horas.',
      icon: Wrench,
      details: ['Técnicos certificados de fábrica', 'Monitoreo de fluidos SOS', 'Mantenimiento en horarios nocturnos']
    },
    {
      number: '03',
      title: 'Transporte y Movilización en Cama Baja',
      description: 'Flota propia de camas bajas y cabezotes articulados para transporte seguro de maquinaria pesada hacia cualquier departamento de Colombia.',
      icon: Truck,
      details: ['Permisos especiales INVÍAS', 'Escolta vehicular si aplica', 'Póliza de transporte de carga']
    },
    {
      number: '04',
      title: 'Telemetría Satelital y Control de Combustible',
      description: 'Acceso cliente a la plataforma Cat Product Link™: monitorea horómetros reales, consumo de ACPM por hora, ralentí excesivo y geocercas en tiempo real.',
      icon: Cpu,
      details: ['Reportes semanales de eficiencia', 'Alertas tempranas de fallas', 'Control contra hurto de combustible']
    }
  ];

  return (
    <section id="services" className="scroll-mt-20 bg-[#1c2022] text-white py-20 lg:py-28 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f6c400]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f6c400] mb-4">
              Mucho más que alquiler
            </div>
            <h2 className="text-3xl sm:text-5xl tracking-tight leading-tight text-white">
              <span className="font-serif italic font-normal text-white/90">Garantizamos</span>{' '}
              <span className="font-sans font-black">Cero Paradas en tu Operación</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-white/60 font-sans">
              Sabemos que cada hora de máquina parada cuesta millones. Nuestro ecosistema de soporte integral
              asegura que tu proyecto vial, minero o de infraestructura avance sin retrasos.
            </p>

            <div className="mt-8 space-y-3 text-xs text-white/80 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-[#f6c400]" />
                <span>Asistencia técnica 24 horas los 7 días de la semana</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-[#f6c400]" />
                <span>Planes de financiación y crédito corporativo a 30, 60 y 90 días</span>
              </div>
            </div>

            <button
              onClick={onScrollToContact}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#f6c400] px-7 py-3.5 text-xs font-black text-[#141719] shadow-lg shadow-[#f6c400]/20 transition hover:bg-[#ffd52b] hover:shadow-xl"
            >
              Consultar con un Ingeniero de Maquinaria
              <ArrowRight className="size-4" />
            </button>
          </div>

          {/* Services Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.number}
                  className="group rounded-3xl border border-white/10 bg-[#141719] p-6 transition duration-300 hover:border-[#f6c400]/50 hover:bg-[#181c1f]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif italic text-3xl font-bold text-[#f6c400]">{service.number}</span>
                    <div className="grid size-10 place-items-center rounded-xl bg-white/5 text-[#f6c400] transition group-hover:scale-110 group-hover:bg-[#f6c400] group-hover:text-[#141719]">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-white mb-2">{service.title}</h3>
                  <p className="text-xs leading-relaxed text-white/60 mb-4">{service.description}</p>

                  <ul className="space-y-1.5 border-t border-white/5 pt-3 text-[11px] text-white/50">
                    {service.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="size-1 rounded-full bg-[#f6c400]" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
