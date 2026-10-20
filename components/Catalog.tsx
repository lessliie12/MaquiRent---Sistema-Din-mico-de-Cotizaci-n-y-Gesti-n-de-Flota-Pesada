import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  Eye,
  Plus,
  Check,
  SlidersHorizontal,
  AlertCircle,
  Wrench,
  Clock,
  Truck,
  ExternalLink,
  ChevronRight,
  TableProperties,
  LayoutGrid,
  Layers,
  ArrowLeft,
  Sparkles,
  Zap,
  Scale,
  Gauge
} from 'lucide-react';
import { categories, categoriesMetadata, machinesData } from '@/lib/data/machines';
import { quotesService } from '@/lib/services/quotesService';
import { Machine, MachineCategory } from '@/types/machine';
import { MachineFleetControl } from '@/types/quote';

interface CatalogProps {
  onSelectMachine: (machine: Machine) => void;
  onAddToQuote: (machine: Machine) => void;
  quotedMachineIds: string[];
}

export function Catalog({ onSelectMachine, onAddToQuote, quotedMachineIds }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Toda la maquinaria');
  const [activeSubtype, setActiveSubtype] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [fleet, setFleet] = useState<MachineFleetControl[]>([]);

  useEffect(() => {
    setFleet(quotesService.getFleet());
    const handleFleetUpdate = () => {
      setFleet(quotesService.getFleet());
    };
    window.addEventListener('maqui_fleet_updated', handleFleetUpdate);
    return () => window.removeEventListener('maqui_fleet_updated', handleFleetUpdate);
  }, []);

  // When changing category, reset the active subtype to the first item of that category
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'Toda la maquinaria') {
      setActiveSubtype('Todos');
    } else {
      const meta = categoriesMetadata.find((m) => m.id === category);
      setActiveSubtype(meta?.subtypes[0] || 'Todos');
    }
  };

  // Active category metadata if one is specifically selected
  const activeCategoryMeta = useMemo(() => {
    if (activeCategory === 'Toda la maquinaria') return null;
    return categoriesMetadata.find((m) => m.id === activeCategory) || null;
  }, [activeCategory]);

  // Available subtypes for current category
  const availableSubtypes = useMemo(() => {
    if (!activeCategoryMeta) return [];
    return activeCategoryMeta.subtypes;
  }, [activeCategoryMeta]);

  // Filtered machines
  const filteredMachines = useMemo(() => {
    const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    return machinesData
      .filter((machine) => {
        // Category check
        const matchesCategory =
          activeCategory === 'Toda la maquinaria' || machine.type === activeCategory;

        // Subtype check
        const isAll =
          activeSubtype === 'Todos' ||
          activeSubtype === 'Todas' ||
          activeSubtype.toLowerCase().startsWith('todo') ||
          activeSubtype.toLowerCase().startsWith('toda');

        const matchesSubtype =
          isAll ||
          machine.subtype === activeSubtype ||
          norm(machine.subtype).includes(norm(activeSubtype)) ||
          norm(activeSubtype).includes(norm(machine.subtype));

        // Search check
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === '' ||
          machine.name.toLowerCase().includes(q) ||
          machine.detail.toLowerCase().includes(q) ||
          machine.type.toLowerCase().includes(q) ||
          (machine.subtype && machine.subtype.toLowerCase().includes(q)) ||
          machine.specs.power.toLowerCase().includes(q) ||
          machine.specs.operatingWeight.toLowerCase().includes(q) ||
          (machine.specs.engineModel && machine.specs.engineModel.toLowerCase().includes(q));

        return matchesCategory && matchesSubtype && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOrder === 'price-asc') return a.dailyRate - b.dailyRate;
        if (sortOrder === 'price-desc') return b.dailyRate - a.dailyRate;
        return 0;
      });
  }, [activeCategory, activeSubtype, searchQuery, sortOrder]);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="equipment" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      {/* Title & Description Header */}
      <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f6c400]/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#916c00] mb-3">
            <Sparkles className="size-3.5" /> Flota Oficial Caterpillar® Colombia
          </div>
          <h2 className="text-3xl sm:text-5xl text-[#141719] tracking-tight">
            <span className="font-serif italic font-normal">Catálogo de</span>{' '}
            <span className="font-sans font-black tracking-tight">Maquinaria & Equipos</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-[#5a6268] font-sans font-normal">
          Gama completa de equipos pesados y especializados Caterpillar®. Mantenimientos oficiales al día, telemetría Cat Product Link™ y entrega inmediata en obra.
        </p>
      </div>

      {/* Category Navigation Pills (Horizontal Scroll - Without count numbers) */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-bold transition flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#141719] text-[#f6c400] shadow-md ring-2 ring-[#f6c400]/30'
                  : 'bg-white text-[#5a6268] ring-1 ring-[#e1e4e6] hover:ring-[#f6c400] hover:text-[#141719]'
              }`}
            >
              <span>{category}</span>
            </button>
          );
        })}
      </div>

      {/* SPECIFIC CATEGORY SPOTLIGHT BANNER (When a category is active, like backhoe-loaders.html on CAT) */}
      {activeCategoryMeta && (
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#141719] via-[#1c2023] to-[#252b30] text-white shadow-xl border border-[#2e3438] animate-in fade-in duration-300">
          <div className="grid gap-6 lg:grid-cols-12 items-center p-6 sm:p-8">
            <div className="lg:col-span-8 space-y-4">
              {/* Breadcrumb Navigation */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                <button
                  onClick={() => handleCategoryChange('Toda la maquinaria')}
                  className="hover:text-[#f6c400] flex items-center gap-1 transition"
                >
                  <ArrowLeft className="size-3" /> Todas las categorías
                </button>
                <ChevronRight className="size-3 text-white/30" />
                <span className="text-[#f6c400] font-bold">{activeCategoryMeta.name}</span>
              </div>

              <div>
                <span className="inline-block rounded-full bg-[#f6c400] px-3 py-0.5 text-[10px] font-black uppercase text-[#141719] mb-2">
                  Línea Especializada CAT®
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {activeCategoryMeta.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#f6c400]">
                  {activeCategoryMeta.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
                {activeCategoryMeta.description}
              </p>

              {/* Caterpillar Official Portal Reference Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={activeCategoryMeta.catUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 text-xs font-bold text-white transition hover:text-[#f6c400]"
                >
                  <span>Ver especificaciones globales en portal Cat.com</span>
                  <ExternalLink className="size-3.5" />
                </a>

                <div className="flex items-center gap-3 text-xs text-white/60">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Disponibilidad en patios Colombia
                  </span>
                  <span>•</span>
                  <span>Telemetría satelital Product Link™</span>
                </div>
              </div>
            </div>

            {/* Category Banner Preview Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-xs overflow-hidden rounded-2xl bg-black/30 p-2 border border-white/10 shadow-inner">
                <img
                  src={activeCategoryMeta.sampleImage}
                  alt={activeCategoryMeta.name}
                  className="w-full h-44 object-contain rounded-xl hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 text-center rounded-lg bg-black/70 backdrop-blur-sm py-1 px-2 text-[10px] font-bold text-white/90">
                  Modelo Representativo CAT®
                </div>
              </div>
            </div>
          </div>

          {/* SUBTYPES SELECTION BAR (Like backhoe-loaders and pipelayers sub-type selector on Cat.com) */}
          {availableSubtypes.length > 0 && (
            <div className="border-t border-white/10 bg-black/40 px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#f6c400] shrink-0">
                  <Layers className="size-4" /> Seleccionar Tipo de Máquina:
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableSubtypes.map((st) => {
                    const isSelected =
                      activeSubtype === st ||
                      ((st === 'Todas' || st === 'Todos') &&
                        (activeSubtype === 'Todos' || activeSubtype === 'Todas'));
                    return (
                      <button
                        key={st}
                        onClick={() => setActiveSubtype(st)}
                        className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                          isSelected
                            ? 'bg-[#f6c400] text-[#141719] shadow-md ring-2 ring-white/20'
                            : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CATEGORY CARDS BROWSER (Shown when "Toda la maquinaria" is selected, without number counts) */}
      {activeCategory === 'Toda la maquinaria' && searchQuery === '' && (
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#8a9298] flex items-center gap-2">
              <Layers className="size-4 text-[#f6c400]" /> Familias de Maquinaria Caterpillar®
            </h3>
            <span className="text-xs text-[#8a9298]">Selecciona una categoría para explorar sus tipos</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesMetadata.map((cat) => {
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e1e4e6] bg-white p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#f6c400] hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="rounded-full bg-[#f6c400]/15 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#8a6800]">
                      Línea CAT®
                    </span>
                    <ArrowRight className="size-4 text-[#8a9298] transition group-hover:translate-x-1 group-hover:text-[#141719]" />
                  </div>

                  <div className="my-2 h-24 overflow-hidden rounded-xl bg-[#f4f6f7] flex items-center justify-center p-2">
                    <img
                      src={cat.sampleImage}
                      alt={cat.name}
                      className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-[#141719] group-hover:text-[#9e7600] transition">
                      {cat.name}
                    </h4>
                    <p className="mt-1 text-[11px] text-[#5a6268] line-clamp-1">
                      {cat.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-2xl border border-[#e1e4e6] shadow-sm">
        {/* Results Title & Reset - Without noisy count numbers */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#141719] flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-[#f6c400]" /> Equipos Disponibles
          </span>

          {(activeCategory !== 'Toda la maquinaria' ||
            (activeSubtype !== 'Todos' && activeSubtype !== 'Todas') ||
            searchQuery !== '') && (
            <button
              onClick={() => {
                setActiveCategory('Toda la maquinaria');
                setActiveSubtype('Todos');
                setSearchQuery('');
              }}
              className="rounded-full bg-[#f4f5f6] px-3 py-1 text-[11px] font-semibold text-[#5a6268] hover:bg-[#e1e4e6] hover:text-[#141719] transition"
            >
              Restablecer filtros
            </button>
          )}
        </div>

        {/* Search, Sort & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8a9298]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar modelo (ej: PL83, 320, D6)..."
              className="w-full rounded-full border border-[#dfe3e5] bg-[#fafbfc] pl-10 pr-4 py-2 text-xs text-[#141719] outline-none transition focus:border-[#f6c400] focus:bg-white focus:ring-2 focus:ring-[#f6c400]/20"
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

          {/* Sort Select */}
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="appearance-none rounded-full border border-[#dfe3e5] bg-[#fafbfc] px-4 py-2 pr-8 text-xs font-semibold text-[#5a6268] outline-none transition focus:border-[#f6c400]"
            >
              <option value="default">Orden por Defecto</option>
              <option value="price-asc">Menor Tarifa Diaria</option>
              <option value="price-desc">Mayor Tarifa Diaria</option>
            </select>
            <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3 text-[#8a9298]" />
          </div>

          {/* Grid vs Table View Mode */}
          <div className="hidden sm:flex items-center rounded-full border border-[#dfe3e5] bg-[#fafbfc] p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              title="Vista en tarjetas"
              className={`rounded-full p-1.5 transition ${
                viewMode === 'grid' ? 'bg-[#141719] text-[#f6c400]' : 'text-[#8a9298] hover:text-[#141719]'
              }`}
            >
              <LayoutGrid className="size-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              title="Vista comparativa técnica"
              className={`rounded-full p-1.5 transition ${
                viewMode === 'table' ? 'bg-[#141719] text-[#f6c400]' : 'text-[#8a9298] hover:text-[#141719]'
              }`}
            >
              <TableProperties className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* EMPTY RESULTS STATE */}
      {filteredMachines.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#dfe3e5] bg-white p-12 text-center shadow-sm">
          <AlertCircle className="mx-auto size-10 text-[#8a9298] mb-3" />
          <h3 className="text-lg font-bold text-[#141719]">No se encontraron máquinas para este criterio</h3>
          <p className="mt-1 text-xs text-[#687076]">
            Prueba ajustando el término de búsqueda o selecciona otra categoría de la flota.
          </p>
          <button
            onClick={() => {
              setActiveCategory('Toda la maquinaria');
              setActiveSubtype('Todos');
              setSearchQuery('');
            }}
            className="mt-4 rounded-full bg-[#141719] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#202326] transition"
          >
            Ver Toda la Maquinaria
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW OF MACHINES */
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
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#8a9298]">
                        {machine.type}
                      </p>
                      {machine.subtype && (
                        <span className="rounded-full bg-[#f4f5f6] px-2.5 py-0.5 text-[10px] font-bold text-[#5a6268]">
                          {machine.subtype}
                        </span>
                      )}
                    </div>

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

                    {/* Features and Specs Chips */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-[#f4f5f6] px-2 py-1 text-[10px] font-semibold text-[#5a6268] flex items-center gap-1">
                        <Zap className="size-3 text-[#f6c400]" /> {machine.specs.power}
                      </span>
                      <span className="rounded-md bg-[#f4f5f6] px-2 py-1 text-[10px] font-semibold text-[#5a6268] flex items-center gap-1">
                        <Scale className="size-3 text-[#f6c400]" /> {machine.specs.operatingWeight}
                      </span>
                      {machine.specs.liftCapacity && (
                        <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-1 text-[10px] font-bold text-amber-900">
                          {machine.specs.liftCapacity}
                        </span>
                      )}
                      {machine.specs.bucketCapacity && (
                        <span className="rounded-md bg-[#f4f5f6] px-2 py-1 text-[10px] font-semibold text-[#5a6268]">
                          {machine.specs.bucketCapacity}
                        </span>
                      )}
                      {machine.specs.bladeCapacity && (
                        <span className="rounded-md bg-[#f4f5f6] px-2 py-1 text-[10px] font-semibold text-[#5a6268]">
                          {machine.specs.bladeCapacity}
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
      ) : (
        /* TECHNICAL COMPARISON TABLE VIEW */
        <div className="overflow-hidden rounded-3xl border border-[#e1e4e6] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#141719] text-white">
                  <th className="p-4 font-bold uppercase tracking-wider text-[11px]">Máquina</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[11px]">Tipo / Subtipo</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[11px]">Potencia</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[11px]">Peso Operativo</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[11px]">Capacidad Clave</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[11px]">Tarifa Día</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[11px]">Tarifa Mes</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-[11px] text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0f1]">
                {filteredMachines.map((machine) => {
                  const isQuoted = quotedMachineIds.includes(machine.id);
                  const keyCapacity =
                    machine.specs.liftCapacity ||
                    machine.specs.bucketCapacity ||
                    machine.specs.bladeCapacity ||
                    machine.specs.payload ||
                    machine.specs.maxDepth ||
                    '-';

                  return (
                    <tr key={machine.id} className="hover:bg-[#fafbfc] transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={machine.image}
                            alt={machine.name}
                            className="size-12 rounded-lg object-contain bg-[#f0f2f3] p-1 shrink-0"
                          />
                          <div>
                            <div className="font-extrabold text-[#141719] text-sm">{machine.name}</div>
                            <div className="text-[10px] text-[#8a9298]">{machine.availability}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-[#141719] block">{machine.type}</span>
                        <span className="text-[10px] text-[#5a6268]">{machine.subtype}</span>
                      </td>
                      <td className="p-4 font-semibold text-[#5a6268]">{machine.specs.power}</td>
                      <td className="p-4 font-semibold text-[#5a6268]">{machine.specs.operatingWeight}</td>
                      <td className="p-4 font-bold text-[#141719]">{keyCapacity}</td>
                      <td className="p-4 font-black text-[#141719]">{formatCOP(machine.dailyRate)}</td>
                      <td className="p-4 font-bold text-emerald-700">{formatCOP(machine.monthlyRate)}</td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => onSelectMachine(machine)}
                            className="rounded-lg border border-[#dfe3e5] px-2.5 py-1.5 font-bold hover:bg-[#f4f5f6]"
                            title="Ficha Técnica"
                          >
                            <Eye className="size-3.5 text-[#5a6268]" />
                          </button>
                          <button
                            onClick={() => onAddToQuote(machine)}
                            className={`rounded-lg px-3 py-1.5 font-bold text-[11px] ${
                              isQuoted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#f6c400] text-[#141719] hover:bg-[#ffd52b]'
                            }`}
                          >
                            {isQuoted ? 'Cotizada' : 'Cotizar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
