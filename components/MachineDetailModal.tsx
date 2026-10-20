'use client';

import { X, Check, ShieldCheck, Zap, Fuel, Scale, Gauge, Calendar, MessageCircle, Plus, Wrench, AlertTriangle, Clock } from 'lucide-react';
import { Machine } from '@/types/machine';
import { quotesService } from '@/lib/services/quotesService';

interface MachineDetailModalProps {
  machine: Machine | null;
  onClose: () => void;
  onAddToQuote: (machine: Machine) => void;
}

export function MachineDetailModal({ machine, onClose, onAddToQuote }: MachineDetailModalProps) {
  if (!machine) return null;

  const fleet = quotesService.getFleet();
  const fleetItem = fleet.find((f) => f.machineId === machine.id);
  const isUnderMaintenance = fleetItem?.status === 'En Mantenimiento';

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  const whatsappMessage = encodeURIComponent(
    isUnderMaintenance
      ? `Hola Maqui-Rent Colombia, veo que la máquina ${machine.name} está en mantenimiento hasta el ${fleetItem?.returnDate || '24 de Octubre'}. Deseo consultar por una pre-reserva o una alternativa disponible.`
      : `Hola Maqui-Rent Colombia, estoy interesado en cotizar el alquiler de la máquina: ${machine.name}. ¿Tienen disponibilidad para despacho?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#1c2022] text-white shadow-2xl border border-white/10 my-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141719]">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#f6c400] px-3 py-0.5 text-xs font-black uppercase text-[#141719]">
              Ficha Técnica
            </span>
            <span className="text-xs text-white/50">{machine.type}</span>
          </div>
          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition"
            aria-label="Cerrar modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Maintenance Alert Banner if applicable */}
          {isUnderMaintenance && (
            <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 text-white animate-in fade-in">
              <div className="flex items-start gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-amber-500 text-[#141719] shrink-0">
                  <Wrench className="size-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                      Estado Operativo: En Mantenimiento Preventivo
                    </span>
                    <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      Taller Central Cota
                    </span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Esta unidad se encuentra actualmente en proceso de <strong>{fleetItem?.maintenanceType || 'Mantenimiento Preventivo de 2.000 horas'}</strong> con repuestos originales CAT®.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-white/60 pt-1 border-t border-amber-500/20">
                    <span><strong>Técnico a cargo:</strong> {fleetItem?.technician || 'Téc. Jhon Jairo Moreno'}</span>
                    <span><strong>Reincorporación proyectada:</strong> <strong className="text-amber-400">{fleetItem?.returnDate || '24 de Octubre de 2026'}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Info Banner */}
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="relative overflow-hidden rounded-2xl bg-[#0e1011] p-4 border border-white/5">
              <img
                src={machine.image}
                alt={machine.name}
                className="w-full h-64 object-contain"
              />
              <span className="absolute top-4 left-4 rounded-full bg-[#f6c400] px-3 py-1 text-[11px] font-black text-[#141719]">
                {machine.badge || 'Equipo Premium'}
              </span>
              <span className="absolute bottom-4 right-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-[11px] font-bold text-emerald-400">
                {machine.availability}
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black">{machine.name}</h2>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{machine.description}</p>

              {/* Pricing Cards */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#24292c] p-4 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-white/50 block">Alquiler por Día</span>
                  <span className="text-xl font-black text-[#f6c400]">{formatCOP(machine.dailyRate)}</span>
                  <span className="text-[10px] text-white/40 block mt-0.5">Mínimo 8 horas de turno</span>
                </div>
                <div className="rounded-xl bg-[#24292c] p-4 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-white/50 block">Tarifa Mensual estimada</span>
                  <span className="text-xl font-black text-white">{formatCOP(machine.monthlyRate)}</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">Incluye descuento por obra</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-white/50">
                * Precio de referencia de venta: <span className="text-white/80 font-semibold">{machine.salePrice}</span>
              </div>
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#f6c400] mb-4 flex items-center gap-2">
              <Gauge className="size-4" /> Especificaciones Principales de Fábrica
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                  <Scale className="size-3.5 text-[#f6c400]" /> Peso Operativo
                </div>
                <div className="font-bold text-sm text-white">{machine.specs.operatingWeight}</div>
              </div>

              <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                  <Zap className="size-3.5 text-[#f6c400]" /> Potencia Motor
                </div>
                <div className="font-bold text-sm text-white">{machine.specs.power}</div>
              </div>

              {machine.specs.bucketCapacity && (
                <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Gauge className="size-3.5 text-[#f6c400]" /> Capacidad Cucharón
                  </div>
                  <div className="font-bold text-sm text-white">{machine.specs.bucketCapacity}</div>
                </div>
              )}

              {machine.specs.payload && (
                <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Scale className="size-3.5 text-[#f6c400]" /> Carga Útil
                  </div>
                  <div className="font-bold text-sm text-white">{machine.specs.payload}</div>
                </div>
              )}

              {machine.specs.maxDepth && (
                <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Gauge className="size-3.5 text-[#f6c400]" /> Profundidad Máx.
                  </div>
                  <div className="font-bold text-sm text-white">{machine.specs.maxDepth}</div>
                </div>
              )}

              {machine.specs.drumWidth && (
                <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Gauge className="size-3.5 text-[#f6c400]" /> Ancho de Rodillo
                  </div>
                  <div className="font-bold text-sm text-white">{machine.specs.drumWidth}</div>
                </div>
              )}

              {machine.specs.liftCapacity && (
                <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Scale className="size-3.5 text-[#f6c400]" /> Capacidad Elevación
                  </div>
                  <div className="font-bold text-sm text-white">{machine.specs.liftCapacity}</div>
                </div>
              )}

              {machine.specs.boomLength && (
                <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Gauge className="size-3.5 text-[#f6c400]" /> Longitud de Pluma
                  </div>
                  <div className="font-bold text-sm text-white">{machine.specs.boomLength}</div>
                </div>
              )}

              {machine.specs.bladeCapacity && (
                <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Gauge className="size-3.5 text-[#f6c400]" /> Capacidad Hoja / Vertedera
                  </div>
                  <div className="font-bold text-sm text-white">{machine.specs.bladeCapacity}</div>
                </div>
              )}

              {machine.specs.maxReach && (
                <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Gauge className="size-3.5 text-[#f6c400]" /> Alcance Máximo
                  </div>
                  <div className="font-bold text-sm text-white">{machine.specs.maxReach}</div>
                </div>
              )}

              {machine.specs.millingWidth && (
                <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Gauge className="size-3.5 text-[#f6c400]" /> Ancho de Corte / Fresado
                  </div>
                  <div className="font-bold text-sm text-white">{machine.specs.millingWidth}</div>
                </div>
              )}

              <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                  <Fuel className="size-3.5 text-[#f6c400]" /> Capacidad Tanque
                </div>
                <div className="font-bold text-sm text-white">{machine.specs.fuelCapacity}</div>
              </div>

              <div className="rounded-xl bg-[#141719] p-3.5 border border-white/5">
                <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                  <Calendar className="size-3.5 text-[#f6c400]" /> Año Modelo
                </div>
                <div className="font-bold text-sm text-white">{machine.specs.year}</div>
              </div>
            </div>
          </div>

          {/* Features and Ideal Applications */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-[#141719] p-5 border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Tecnología y Equipamiento Incluido
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                {machine.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="size-4 text-[#f6c400] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#141719] p-5 border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Aplicaciones y Obras Recomendadas
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                {machine.idealFor.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ShieldCheck className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 bg-[#141719] px-6 py-4">
          <div className="text-xs text-white/60 text-center sm:text-left">
            Entrega con mantenimiento preventivo al día y tanque lleno.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/573105550190?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>

            <button
              onClick={() => {
                onAddToQuote(machine);
                onClose();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-[#f6c400] px-6 py-3 text-xs font-black text-[#141719] hover:bg-[#ffd52b] transition"
            >
              <Plus className="size-4" />
              Añadir a Cotización
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
