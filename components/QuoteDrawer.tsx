'use client';

import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { QuoteItem } from '@/types/machine';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateDays: (machineId: string, days: number) => void;
  onToggleOperator: (machineId: string) => void;
  onRemoveItem: (machineId: string) => void;
  onClearQuote: () => void;
  onProceedToForm: () => void;
}

export function QuoteDrawer({
  isOpen,
  onClose,
  items,
  onUpdateDays,
  onToggleOperator,
  onRemoveItem,
  onClearQuote,
  onProceedToForm
}: QuoteDrawerProps) {
  if (!isOpen) return null;

  const operatorDailyRate = 220000;

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  const calculateItemTotal = (item: QuoteItem) => {
    let machineTotal = item.dailyRate * item.days;
    // Volume discounts
    if (item.days >= 30) machineTotal *= 0.85;
    else if (item.days >= 7) machineTotal *= 0.95;

    const opTotal = item.withOperator ? operatorDailyRate * item.days : 0;
    return machineTotal + opTotal;
  };

  const subtotalNeto = items.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  const iva = subtotalNeto * 0.19;
  const total = subtotalNeto + iva;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#171a1c] text-white shadow-2xl flex flex-col border-l border-white/10 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-[#141719]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-[#f6c400]" />
              <h2 className="font-ornamental text-lg font-bold uppercase tracking-tight text-white">
                Mi Bolsa de Cotización ({items.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="grid size-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Cerrar bolsa"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-white/5 text-white/30 mb-4">
                  <ShoppingBag className="size-8" />
                </div>
                <h3 className="font-bold text-white text-base">Tu bolsa está vacía</h3>
                <p className="mt-1 text-xs text-white/50 max-w-xs mx-auto">
                  Agrega equipos desde el catálogo o la calculadora para simular un paquete completo de maquinaria para tu obra.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-white/50 pb-1 border-b border-white/5">
                  <span>Equipos seleccionados</span>
                  <button
                    onClick={onClearQuote}
                    className="text-red-400 hover:text-red-300 transition text-[11px] font-semibold"
                  >
                    Vaciar lista
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.machineId}
                    className="rounded-2xl border border-white/10 bg-[#1c2022] p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-editorial-sans text-[10px] font-bold uppercase tracking-wider text-[#f6c400]">
                          {item.machineType}
                        </span>
                        <h4 className="font-ornamental uppercase font-bold text-base text-white tracking-tight">{item.machineName}</h4>
                        <span className="text-xs text-white/60 font-sans">
                          Tarifa: {formatCOP(item.dailyRate)} / día
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.machineId)}
                        className="text-white/40 hover:text-red-400 transition p-1"
                        aria-label="Eliminar máquina"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    {/* Days adjustment */}
                    <div className="flex items-center justify-between text-xs bg-[#141719] p-2.5 rounded-xl border border-white/5">
                      <span className="text-white/70">Días de alquiler:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateDays(item.machineId, Math.max(1, item.days - 1))}
                          className="size-6 rounded-lg bg-white/10 font-black text-xs hover:bg-white/20"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-white">{item.days}</span>
                        <button
                          onClick={() => onUpdateDays(item.machineId, item.days + 1)}
                          className="size-6 rounded-lg bg-white/10 font-black text-xs hover:bg-white/20"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Operator toggle */}
                    <div
                      onClick={() => onToggleOperator(item.machineId)}
                      className={`cursor-pointer rounded-xl p-2.5 text-xs border transition flex items-center justify-between ${
                        item.withOperator
                          ? 'border-[#f6c400]/60 bg-[#f6c400]/10 text-white'
                          : 'border-white/5 bg-[#141719] text-white/60'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                        <UserCheck className="size-3.5 text-[#f6c400]" />
                        Operador certificado SENA
                      </span>
                      <span className="text-[10px] font-bold">
                        {item.withOperator ? '+ $220.000 / día' : 'Sin operador'}
                      </span>
                    </div>

                    {/* Subtotal of item */}
                    <div className="flex justify-between items-baseline pt-1 text-xs">
                      <span className="text-white/50">Subtotal equipo:</span>
                      <span className="font-extrabold text-[#f6c400]">
                        {formatCOP(calculateItemTotal(item))}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer with Totals and CTA */}
          {items.length > 0 && (
            <div className="border-t border-white/10 bg-[#141719] p-6 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal equipos ({items.length}):</span>
                  <span>{formatCOP(subtotalNeto)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>IVA estimado (19%):</span>
                  <span>{formatCOP(iva)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-white/10 font-sans">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Total Estimado:</span>
                  <span className="font-ornamental text-2xl font-bold text-[#f6c400] tracking-tight">{formatCOP(total)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToForm();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#f6c400] py-3.5 text-xs font-black text-[#141719] shadow-lg shadow-[#f6c400]/20 hover:bg-[#ffd52b] transition"
              >
                Completar y Enviar Cotización
                <ArrowRight className="size-4" />
              </button>

              <p className="text-[10px] text-center text-white/40">
                Los datos se pasarán automáticamente al formulario de contacto para emitir tu orden.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
