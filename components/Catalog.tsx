import { useState, useMemo, useEffect } from 'react';
import { Search, ArrowRight, Eye, Plus, Check, SlidersHorizontal, AlertCircle, Wrench, Clock, Truck } from 'lucide-react';
import { categories, machinesData } from '@/lib/data/machines';
import { quotesService } from '@/lib/services/quotesService';
import { Machine } from '@/types/machine';
import { MachineFleetControl } from '@/types/quote';

interface CatalogProps {
  onSelectMachine: (machine: Machine) => void;
  onAddToQuote: (machine: Machine) => void;
  quotedMachineIds: string[];
}

export function Catalog({ onSelectMachine, onAddToQuote, quotedMachineIds }: CatalogProps) {
  // CRITICAL FIX: Initialize with 'Toda la maquinaria', NOT 'All equipment'
  const [activeCategory, setActiveCategory] = useState<string>('Toda la maquinaria');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [fleet, setFleet] = useState<MachineFleetControl[]>([]);

  useEffect(() => {
    setFleet(quotesService.getFleet());
    const handleFleetUpdate = () => {
      setFleet(quotesService.getFleet());
    };
    window.addEventListener('maqui_fleet_updated', handleFleetUpdate);
    return () => window.removeEventListener('maqui_fleet_updated', handleFleetUpdate);
  }, []);

  const filteredMachines = useMemo(() => {
    return machinesData
      .filter((machine) => {
        const matchesCategory =
          activeCategory === 'Toda la maquinaria' || machine.type === activeCategory;

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === '' ||
          machine.name.toLowerCase().includes(q) ||
          machine.detail.toLowerCase().includes(q) ||
          machine.type.toLowerCase().includes(q) ||
          machine.specs.power.toLowerCase().includes(q) ||
          machine.specs.operatingWeight.toLowerCase().includes(q);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOrder === 'price-asc') return a.dailyRate - b.dailyRate;
        if (sortOrder === 'price-desc') return b.dailyRate - a.dailyRate;
        return 0;
      });
  }, [activeCategory, searchQuery, sortOrder]);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="equipment" className="scroll-mt-20 mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      {/* Title & Description */}
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f6c400]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9e7600] mb-3">
            Flota Certificada Caterpillar®
          </div>
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl text-[#141719]">
            Catálogo de Maquinaria
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-[#5a6268]">
          Equipos inspeccionados con mantenimientos al día, horómetros certificados y soporte técnico en sitio para cualquier frente de trabajo.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-bold transition ${
                activeCategory === category
                  ? 'bg-[#141719] text-[#f6c400] shadow-md'
                  : 'bg-white text-[#687076] ring-1 ring-[#e1e4e6] hover:ring-[#f6c400] hover:text-[#141719]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search input & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8a9298]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar modelo o potencia..."
              className="w-full rounded-full border border-[#dfe3e5] bg-white pl-10 pr-4 py-2.5 text-xs text-[#141719] outline-none transition focus:border-[#f6c400] focus:ring-2 focus:ring-[#f6c400]/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8a9298] hover:text-[#141719]"
              >
                ✕
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="appearance-none rounded-full border border-[#dfe3e5] bg-white px-4 py-2.5 pr-8 text-xs font-semibold text-[#5a6268] outline-none transition focus:border-[#f6c400]"
            >
              <option value="default">Orden por Defecto</option>
              <option value="price-asc">Menor Tarifa Diaria</option>
              <option value="price-desc">Mayor Tarifa Diaria</option>
            </select>
            <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3 text-[#8a9298]" />
          </div>
        </div>
      </div>

      {/* Grid of Machines */}
      {filteredMachines.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#dfe3e5] bg-white p-12 text-center">
          <AlertCircle className="mx-auto size-10 text-[#8a9298] mb-3" />
          <h3 className="text-lg font-bold text-[#141719]">No se encontraron máquinas con este filtro</h3>
          <p className="mt-1 text-xs text-[#687076]">
            Prueba buscando con otro término o selecciona "Toda la maquinaria".
          </p>
          <button
            onClick={() => {
              setActiveCategory('Toda la maquinaria');
              setSearchQuery('');
            }}
            className="mt-4 rounded-full bg-[#141719] px-5 py-2 text-xs font-bold text-white hover:bg-[#202326]"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMachines.map((machine) => {
            const isQuoted = quotedMachineIds.includes(machine.id);
            const fleetItem = fleet.find((f) => f.machineId === machine.id);
            const isUnderMaintenance = fleetItem?.status === 'En Mantenimiento';
            const isInProject = fleetItem?.status === 'En Obra';

            return (
              <article
                key={machine.id}
                className={`group flex flex-col justify-between overflow-hidden rounded-3xl bg-white border transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isUnderMaintenance
                    ? 'border-amber-300 ring-2 ring-amber-400/20'
                    : 'border-[#e3e5e7]'
                }`}
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-60 overflow-hidden bg-[#eef0f1]">
                    <img
                      src={machine.image}
                      alt={machine.name}
                      className={`size-full object-cover transition duration-500 group-hover:scale-105 ${
                        isUnderMaintenance ? 'grayscale-[0.35]' : ''
                      }`}
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-[#f6c400] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#141719] shadow-sm">
                      {machine.badge || 'CAT®'}
                    </span>

                    {/* Operational Status Badge */}
                    {isUnderMaintenance ? (
                      <span className="absolute right-4 top-4 rounded-full bg-amber-500/95 backdrop-blur-sm px-3 py-1 text-[10px] font-extrabold text-white flex items-center gap-1 shadow-md">
                        <Wrench className="size-3" /> En Taller (Regresa {fleetItem?.returnDate ? fleetItem.returnDate.slice(5) : '24 Oct'})
                      </span>
                    ) : isInProject ? (
                      <span className="absolute right-4 top-4 rounded-full bg-blue-600/90 backdrop-blur-sm px-3 py-1 text-[10px] font-extrabold text-white flex items-center gap-1 shadow-md">
                        <Truck className="size-3" /> En Obra / Alquilada
                      </span>
                    ) : (
                      <span className="absolute right-4 top-4 rounded-full bg-[#141719]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white">
                        {machine.availability}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#8a9298]">
                      {machine.type}
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-tight text-[#141719]">
                      {machine.name}
                    </h3>
                    <p className="mt-2 text-xs text-[#5a6268] leading-relaxed line-clamp-2">
                      {machine.detail}
                    </p>

                    {/* Maintenance Notice Box if applicable */}
                    {isUnderMaintenance && (
                      <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
                        <Wrench className="size-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>En Mantenimiento Preventivo:</strong> Reincorporación proyectada:{' '}
                          <span className="font-bold underline">{fleetItem?.returnDate || '24 de Octubre'}</span>.
                        </div>
                      </div>
                    )}

                    {/* Features preview */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-[#f4f5f6] px-2 py-1 text-[10px] font-semibold text-[#5a6268]">
                        {machine.specs.power}
                      </span>
                      <span className="rounded-md bg-[#f4f5f6] px-2 py-1 text-[10px] font-semibold text-[#5a6268]">
                        {machine.specs.operatingWeight}
                      </span>
                      {machine.specs.bucketCapacity && (
                        <span className="rounded-md bg-[#f4f5f6] px-2 py-1 text-[10px] font-semibold text-[#5a6268]">
                          {machine.specs.bucketCapacity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Pricing and Actions */}
                <div className="border-t border-[#edf0f1] p-6 bg-[#fafafa]">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a9298] block">
                        Alquiler diario desde
                      </span>
                      <span className="text-xl font-black text-[#141719]">
                        {formatCOP(machine.dailyRate)}
                      </span>
                      <span className="text-[10px] text-[#8a9298] block">+ IVA</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a9298] block">
                        Tarifa Mensual
                      </span>
                      <span className="text-xs font-bold text-[#2e7d32]">
                        {formatCOP(machine.monthlyRate)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectMachine(machine)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-[#dfe3e5] bg-white py-2.5 text-xs font-bold text-[#141719] transition hover:border-[#141719] hover:bg-[#f4f5f6]"
                    >
                      <Eye className="size-3.5 text-[#5a6268]" />
                      Ficha Técnica
                    </button>

                    <button
                      onClick={() => onAddToQuote(machine)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-extrabold transition ${
                        isQuoted
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : isUnderMaintenance
                          ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                          : 'bg-[#f6c400] text-[#141719] hover:bg-[#ffd52b]'
                      }`}
                    >
                      {isQuoted ? (
                        <>
                          <Check className="size-3.5" /> Cotizada
                        </>
                      ) : isUnderMaintenance ? (
                        <>
                          <Clock className="size-3.5" /> Pre-reservar
                        </>
                      ) : (
                        <>
                          <Plus className="size-3.5" /> Cotizar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
