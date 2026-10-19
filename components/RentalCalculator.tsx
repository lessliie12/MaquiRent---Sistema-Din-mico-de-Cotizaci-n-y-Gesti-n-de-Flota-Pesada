'use client';

import { useState, useMemo } from 'react';
import { Calculator, ArrowRight, ShieldCheck, UserCheck, Truck, Percent, Sparkles, Check } from 'lucide-react';
import { machinesData, colombianCities, operatorDailyRate, insuranceRatePercentage } from '@/lib/data/machines';
import { Machine } from '@/types/machine';

interface RentalCalculatorProps {
  onApplyToQuote: (machine: Machine, days: number, withOperator: boolean) => void;
  onScrollToContact: (quoteSummaryText: string) => void;
}

export function RentalCalculator({ onApplyToQuote, onScrollToContact }: RentalCalculatorProps) {
  const [selectedMachineId, setSelectedMachineId] = useState<string>(machinesData[0].id);
  const [days, setDays] = useState<number>(10);
  const [withOperator, setWithOperator] = useState<boolean>(true);
  const [withInsurance, setWithInsurance] = useState<boolean>(true);
  const [selectedCityName, setSelectedCityName] = useState<string>(colombianCities[0].name);
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  const selectedMachine = useMemo(() => {
    return machinesData.find((m) => m.id === selectedMachineId) || machinesData[0];
  }, [selectedMachineId]);

  const selectedCity = useMemo(() => {
    return colombianCities.find((c) => c.name === selectedCityName) || colombianCities[0];
  }, [selectedCityName]);

  // Discount logic
  const discountRate = useMemo(() => {
    if (days >= 30) return 0.15; // 15% discount
    if (days >= 7) return 0.05; // 5% discount
    return 0;
  }, [days]);

  // Financial calculations
  const rawMachineSubtotal = selectedMachine.dailyRate * days;
  const discountAmount = rawMachineSubtotal * discountRate;
  const machineSubtotal = rawMachineSubtotal - discountAmount;

  const operatorCost = withOperator ? operatorDailyRate * days : 0;
  const freightCost = selectedCity.freightCost;
  const insuranceCost = withInsurance ? machineSubtotal * insuranceRatePercentage : 0;

  const subtotalNeto = machineSubtotal + operatorCost + freightCost + insuranceCost;
  const iva = subtotalNeto * 0.19;
  const totalEstimado = subtotalNeto + iva;

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  const handleApply = () => {
    onApplyToQuote(selectedMachine, days, withOperator);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 2500);
  };

  const handleSendToContact = () => {
    const summary = `Simulación de Alquiler:
- Máquina: ${selectedMachine.name}
- Período: ${days} días (${discountRate > 0 ? `con ${discountRate * 100}% de descuento` : 'tarifa estándar'})
- Operador certificado: ${withOperator ? 'Sí (SENA / ARL V)' : 'No'}
- Póliza Todo Riesgo: ${withInsurance ? 'Sí (TREC)' : 'No'}
- Destino de flete: ${selectedCity.name}
- Total Estimado con IVA: ${formatCOP(totalEstimado)}`;

    onScrollToContact(summary);
  };

  return (
    <section id="calculator" className="relative scroll-mt-20 bg-[#141719] py-20 lg:py-28 text-white border-y border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f6c400]/10 border border-[#f6c400]/30 px-3.5 py-1 text-xs font-bold text-[#f6c400] mb-4">
            <Calculator className="size-3.5" />
            Simulador Interactivo de Tarifas
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Calcula el Presupuesto de tu Obra en Vivo
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60">
            Ajusta los días, selecciona tu ciudad en Colombia y agrega operador o seguro.
            Obtén un desglose transparente sin costos ocultos.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          {/* Controls Form */}
          <div className="rounded-3xl bg-[#1c2022] p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
            {/* 1. Machine select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                1. Selecciona la Maquinaria
              </label>
              <select
                value={selectedMachineId}
                onChange={(e) => setSelectedMachineId(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#141719] px-4 py-3.5 text-sm font-semibold text-white outline-none focus:border-[#f6c400] transition"
              >
                {machinesData.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {formatCOP(m.dailyRate)} / día
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Days Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                  2. Duración del Alquiler: <span className="text-white font-extrabold text-sm">{days} días</span>
                </label>
                {discountRate > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                    <Sparkles className="size-3" />
                    ¡Ahorras {discountRate * 100}% por volumen!
                  </span>
                )}
              </div>

              <input
                type="range"
                min="1"
                max="90"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-[#f6c400] cursor-pointer"
              />

              <div className="mt-2 flex justify-between text-[11px] text-white/40 font-semibold">
                <span>1 día (Mínimo)</span>
                <span className={days >= 7 ? 'text-[#f6c400] font-bold' : ''}>7 días (-5%)</span>
                <span className={days >= 30 ? 'text-emerald-400 font-bold' : ''}>30 días (-15%)</span>
                <span>90 días (Obra completa)</span>
              </div>
            </div>

            {/* 3. City Freight Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5">
                <Truck className="size-4 text-[#f6c400]" /> 3. Ciudad de Destino (Flete en Cama Baja)
              </label>
              <select
                value={selectedCityName}
                onChange={(e) => setSelectedCityName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#141719] px-4 py-3.5 text-sm font-semibold text-white outline-none focus:border-[#f6c400] transition"
              >
                {colombianCities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name} — Flete: {formatCOP(city.freightCost)} (Tiempo est.: {city.estimatedHours})
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Toggles: Operator & Insurance */}
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              {/* Operator */}
              <div
                onClick={() => setWithOperator(!withOperator)}
                className={`cursor-pointer rounded-2xl p-4 border transition flex flex-col justify-between ${
                  withOperator
                    ? 'border-[#f6c400] bg-[#f6c400]/10'
                    : 'border-white/10 bg-[#141719] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className={`size-4 ${withOperator ? 'text-[#f6c400]' : 'text-white/40'}`} />
                    <span className="text-xs font-bold">Operador Certificado</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={withOperator}
                    onChange={() => {}}
                    className="accent-[#f6c400] size-4"
                  />
                </div>
                <div className="mt-3 text-[11px] text-white/60">
                  SENA con ARL Riesgo V (+{formatCOP(operatorDailyRate)} / día)
                </div>
              </div>

              {/* Insurance */}
              <div
                onClick={() => setWithInsurance(!withInsurance)}
                className={`cursor-pointer rounded-2xl p-4 border transition flex flex-col justify-between ${
                  withInsurance
                    ? 'border-[#f6c400] bg-[#f6c400]/10'
                    : 'border-white/10 bg-[#141719] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={`size-4 ${withInsurance ? 'text-[#f6c400]' : 'text-white/40'}`} />
                    <span className="text-xs font-bold">Póliza Todo Riesgo (TREC)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={withInsurance}
                    onChange={() => {}}
                    className="accent-[#f6c400] size-4"
                  />
                </div>
                <div className="mt-3 text-[11px] text-white/60">
                  Protección ante averías o siniestros en faena (+3.5%)
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown & Total Card */}
          <div className="rounded-3xl border border-[#f6c400]/40 bg-gradient-to-b from-[#202528] to-[#171a1c] p-6 sm:p-8 shadow-2xl relative">
            <div className="border-b border-white/10 pb-5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#f6c400]">
                Presupuesto Estimado
              </span>
              <h3 className="text-xl font-black mt-1 text-white">{selectedMachine.name}</h3>
              <p className="text-xs text-white/50">{selectedMachine.detail}</p>
            </div>

            {/* Line Items */}
            <div className="my-6 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/70">
                  Alquiler base ({days} {days === 1 ? 'día' : 'días'} x {formatCOP(selectedMachine.dailyRate)}):
                </span>
                <span className="font-semibold">{formatCOP(rawMachineSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Percent className="size-3" /> Descuento obra ({discountRate * 100}%):
                  </span>
                  <span className="font-bold">-{formatCOP(discountAmount)}</span>
                </div>
              )}

              {withOperator && (
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Operador SENA ({days} turnos):</span>
                  <span className="font-semibold">{formatCOP(operatorCost)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-white/70">Flete cama baja ({selectedCity.name}):</span>
                <span className="font-semibold">{formatCOP(freightCost)}</span>
              </div>

              {withInsurance && (
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Póliza Todo Riesgo TREC:</span>
                  <span className="font-semibold">{formatCOP(insuranceCost)}</span>
                </div>
              )}

              <div className="border-t border-white/10 pt-3 flex items-center justify-between text-white/60">
                <span>Subtotal neto:</span>
                <span>{formatCOP(subtotalNeto)}</span>
              </div>

              <div className="flex items-center justify-between text-white/60">
                <span>IVA (19%):</span>
                <span>{formatCOP(iva)}</span>
              </div>
            </div>

            {/* Total Box */}
            <div className="rounded-2xl bg-[#141719] p-5 border border-white/10 mb-6">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-white/70 uppercase">Total Estimado</span>
                <span className="text-2xl sm:text-3xl font-black text-[#f6c400]">
                  {formatCOP(totalEstimado)}
                </span>
              </div>
              <p className="mt-1 text-[10px] text-white/40">
                * Valores orientativos sujetos a confirmación de sitio y disponibilidad mecánica.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleApply}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#f6c400] bg-[#f6c400]/10 py-3.5 text-xs font-bold text-[#f6c400] transition hover:bg-[#f6c400] hover:text-[#141719]"
              >
                {appliedNotice ? (
                  <>
                    <Check className="size-4" /> ¡Agregado a tu Cotización!
                  </>
                ) : (
                  <>Añadir esta Simulación a mi Cotización</>
                )}
              </button>

              <button
                onClick={handleSendToContact}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#f6c400] py-4 text-xs font-black text-[#141719] shadow-lg shadow-[#f6c400]/20 transition hover:bg-[#ffd52b]"
              >
                Formalizar Cotización con este Presupuesto
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
