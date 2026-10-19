'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Shield,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  FileText,
  Printer,
  ChevronRight,
  TrendingUp,
  Truck,
  Users,
  Building,
  Calendar,
  Lock,
  LogOut,
  Send,
  Eye,
  Check,
  RefreshCw,
  Edit3,
  Sliders,
  DollarSign,
  Wrench,
  ShieldAlert
} from 'lucide-react';
import { quotesService } from '@/lib/services/quotesService';
import { QuoteRequest, QuoteStatus, MachineFleetControl } from '@/types/quote';

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState('asesor@maqui-rent.com.co');
  const [authPassword, setAuthPassword] = useState('admin123');

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<'crm' | 'fleet' | 'metrics'>('crm');
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [fleet, setFleet] = useState<MachineFleetControl[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todas');

  // Selected Quote Modal State
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [advisorNotes, setAdvisorNotes] = useState('');
  const [newStatus, setNewStatus] = useState<QuoteStatus>('Pendiente');
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Maintenance Order Modal State
  const [selectedFleetForMaintenance, setSelectedFleetForMaintenance] = useState<MachineFleetControl | null>(null);
  const [maintenanceTech, setMaintenanceTech] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('');
  const [maintenanceReturnDate, setMaintenanceReturnDate] = useState('');
  const [maintenanceParts, setMaintenanceParts] = useState('');
  const [maintenanceNotes, setMaintenanceNotes] = useState('');

  // Load quotes and fleet
  const reloadData = () => {
    setQuotes(quotesService.getQuotes());
    setFleet(quotesService.getFleet());
  };

  const handleOpenMaintenance = (item: MachineFleetControl) => {
    setSelectedFleetForMaintenance(item);
    setMaintenanceTech(item.technician || 'Téc. Jhon Jairo Moreno (Especialista CAT®)');
    setMaintenanceType(item.maintenanceType || 'Preventivo Mayor 2.000 Horas');
    setMaintenanceReturnDate(item.returnDate || '2026-10-24');
    setMaintenanceParts(item.maintenanceParts || 'Kit filtros 1R-0716, aceite Cat HYDO Advanced 10W');
    setMaintenanceNotes(item.maintenanceNotes || 'Inspección de presiones de bomba principal y ajuste de orugas.');
  };

  const handleSaveMaintenanceOrder = () => {
    if (!selectedFleetForMaintenance) return;
    quotesService.updateFleetItem(selectedFleetForMaintenance.machineId, {
      status: 'En Mantenimiento',
      technician: maintenanceTech,
      maintenanceType,
      returnDate: maintenanceReturnDate,
      maintenanceParts,
      maintenanceNotes,
      currentProject: `Mantenimiento: ${maintenanceType}`
    });
    setSelectedFleetForMaintenance(null);
    reloadData();
  };

  const handleReleaseFromMaintenance = (machineId: string) => {
    quotesService.updateFleetItem(machineId, {
      status: 'Disponible',
      currentProject: '',
      returnDate: ''
    });
    if (selectedFleetForMaintenance) {
      setSelectedFleetForMaintenance(null);
    }
    reloadData();
  };

  useEffect(() => {
    reloadData();

    // Listen to real-time events from user submissions
    const handleQuotesUpdated = () => reloadData();
    window.addEventListener('maqui_quotes_updated', handleQuotesUpdated);
    window.addEventListener('maqui_fleet_updated', handleQuotesUpdated);

    return () => {
      window.removeEventListener('maqui_quotes_updated', handleQuotesUpdated);
      window.removeEventListener('maqui_fleet_updated', handleQuotesUpdated);
    };
  }, []);

  // Brute force protection states
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (lockoutSeconds > 0) {
      const timer = setInterval(() => {
        setLockoutSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutSeconds]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    // Strict authentication check
    if (authPassword === 'admin123') {
      setFailedAttempts(0);
      setLoginError(null);
      setIsAuthenticated(true);
    } else {
      const nextCount = failedAttempts + 1;
      setFailedAttempts(nextCount);
      if (nextCount >= 4) {
        setLockoutSeconds(60);
        setLoginError('Demasiados intentos fallidos. Panel bloqueado temporalmente por 60 segundos (Protección Anti-Fuerza Bruta).');
      } else {
        setLoginError(`Credenciales incorrectas. Intentos restantes antes del bloqueo: ${4 - nextCount}.`);
      }
    }
  };

  const handleQuickDemoLogin = () => {
    setAuthEmail('carlos.mendoza@maqui-rent.com.co');
    setAuthPassword('admin123');
    setFailedAttempts(0);
    setLockoutSeconds(0);
    setLoginError(null);
    setIsAuthenticated(true);
  };

  const handleOpenQuoteModal = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setNewStatus(quote.status);
    setAdvisorNotes(quote.advisorNotes || '');
  };

  const handleSaveChanges = () => {
    if (!selectedQuote) return;
    const updated = quotesService.updateQuote(selectedQuote.id, {
      status: newStatus,
      advisorNotes
    });
    if (updated) {
      setSelectedQuote(updated);
      setActionNotice('¡Cambios guardados exitosamente!');
      setTimeout(() => setActionNotice(null), 2500);
      reloadData();
    }
  };

  const handleSendWhatsAppResponse = () => {
    if (!selectedQuote) return;
    const message = encodeURIComponent(
      `Estimado(a) ${selectedQuote.fullName}, le habla el Ing. Carlos Mendoza de Maqui-Rent Colombia.\n\nEn atención a su solicitud de cotización con radicado ${selectedQuote.id} para la máquina ${selectedQuote.machineName} con destino a ${selectedQuote.city}:\n\nLe confirmamos que contamos con disponibilidad para despacho inmediato con operador certificado y transporte en cama baja.\n\n¿Desea que coordinemos la firma de contrato y despacho? Quedo a su completa disposición.`
    );

    quotesService.updateQuote(selectedQuote.id, {
      status: 'Cotizada',
      responseSentAt: new Date().toISOString(),
      responseChannel: 'WhatsApp'
    });

    setNewStatus('Cotizada');
    setActionNotice('¡Respuesta registrada por WhatsApp!');
    setTimeout(() => setActionNotice(null), 2500);
    reloadData();

    window.open(`https://wa.me/57${selectedQuote.phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const handleSendEmailResponse = () => {
    if (!selectedQuote) return;
    quotesService.updateQuote(selectedQuote.id, {
      status: 'Cotizada',
      responseSentAt: new Date().toISOString(),
      responseChannel: 'Correo'
    });
    setNewStatus('Cotizada');
    setActionNotice(`¡Propuesta formal enviada a ${selectedQuote.email}!`);
    setTimeout(() => setActionNotice(null), 2500);
    reloadData();
  };

  const handleUpdateFleet = (machineId: string, status: any, project?: string, returnDate?: string) => {
    quotesService.updateFleetItem(machineId, {
      status,
      currentProject: project || '',
      returnDate: returnDate || ''
    });
    reloadData();
  };

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // KPI Calculations
  const totalQuotesCount = quotes.length;
  const pendingQuotesCount = quotes.filter((q) => q.status === 'Pendiente').length;
  const inReviewCount = quotes.filter((q) => q.status === 'En Revisión').length;
  const quotedOrApprovedCount = quotes.filter((q) => q.status === 'Cotizada' || q.status === 'Aprobada').length;
  const totalPipelineValue = quotes.reduce((acc, q) => acc + (q.estimatedBudget || 0), 0);

  // Filtered quotes
  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchesStatus = statusFilter === 'Todas' || q.status === statusFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        q.id.toLowerCase().includes(query) ||
        q.fullName.toLowerCase().includes(query) ||
        (q.company && q.company.toLowerCase().includes(query)) ||
        q.machineName.toLowerCase().includes(query) ||
        q.city.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [quotes, statusFilter, searchQuery]);

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#111315] text-white flex items-center justify-center p-6 selection:bg-[#f6c400] selection:text-[#111315]">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#191c1e] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#f6c400] via-[#ffd52b] to-[#f6a000]" />

          <div className="flex items-center gap-3 mb-6">
            <div className="grid size-10 place-items-center rounded-xl bg-[#f6c400] text-[#111315] font-black text-xl">
              M
            </div>
            <div>
              <h1 className="text-lg font-black leading-tight text-white">MAQUI-RENT</h1>
              <span className="text-[10px] font-bold tracking-wider text-[#f6c400] uppercase">
                Portal de Asesores & CRM
              </span>
            </div>
          </div>

          <h2 className="text-xl font-black mb-1">Acceso Administrativo</h2>
          <p className="text-xs text-white/60 mb-5">
            Inicia sesión con tu cuenta corporativa para gestionar las cotizaciones y disponibilidad de maquinaria.
          </p>

          {loginError && (
            <div className="mb-4 rounded-xl bg-red-500/15 border border-red-500/30 p-3 text-xs font-bold text-red-400 flex items-center gap-2 animate-in fade-in">
              <ShieldAlert className="size-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {lockoutSeconds > 0 && (
            <div className="mb-4 rounded-xl bg-amber-500/15 border border-amber-500/30 p-3 text-xs font-bold text-amber-400 flex items-center gap-2 animate-in fade-in">
              <Clock className="size-4 shrink-0 animate-pulse" />
              <span>Bloqueo temporal de seguridad: {lockoutSeconds}s restantes.</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5">
                Correo Corporativo
              </label>
              <input
                type="email"
                required
                disabled={lockoutSeconds > 0}
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="asesor@maqui-rent.com.co"
                className="w-full rounded-xl border border-white/10 bg-[#111315] px-4 py-3 text-xs text-white outline-none focus:border-[#f6c400] transition disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                required
                disabled={lockoutSeconds > 0}
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-[#111315] px-4 py-3 text-xs text-white outline-none focus:border-[#f6c400] transition disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={lockoutSeconds > 0}
              className="w-full rounded-xl bg-[#f6c400] py-3.5 text-xs font-black text-[#111315] hover:bg-[#ffd52b] transition shadow-lg shadow-[#f6c400]/20 disabled:opacity-50"
            >
              {lockoutSeconds > 0 ? `Bloqueado (${lockoutSeconds}s)` : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Quick Demo Access for Teacher Presentation */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <span className="block text-[10px] uppercase font-bold text-[#f6c400] text-center mb-2">
              Modo Académico / Sustentación
            </span>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#f6c400]/50 bg-[#f6c400]/10 py-3 text-xs font-bold text-[#f6c400] hover:bg-[#f6c400] hover:text-[#111315] transition"
            >
              <Shield className="size-4" />
              Ingresar como Asesor Demo (1 Clic)
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-white/50 hover:text-white transition">
              ← Volver al sitio público de Maqui-Rent
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111315] text-white flex flex-col selection:bg-[#f6c400] selection:text-[#111315]">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#191c1e]/95 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-[#f6c400] text-[#111315] font-black text-lg">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight leading-none text-white">
                  MAQUI<span className="text-[#f6c400]">-RENT</span>
                </span>
                <span className="text-[9px] font-bold tracking-wider text-[#f6c400] uppercase">
                  CRM & Panel Comercial
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline text-white/20">|</span>

            {/* Tabs Selector */}
            <nav className="hidden sm:flex items-center gap-1 text-xs font-bold">
              <button
                onClick={() => setActiveTab('crm')}
                className={`rounded-xl px-3.5 py-2 transition ${
                  activeTab === 'crm'
                    ? 'bg-[#f6c400] text-[#111315]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                Bandeja de Cotizaciones ({totalQuotesCount})
              </button>
              <button
                onClick={() => setActiveTab('fleet')}
                className={`rounded-xl px-3.5 py-2 transition ${
                  activeTab === 'fleet'
                    ? 'bg-[#f6c400] text-[#111315]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                Control de Flota y Patios
              </button>
              <button
                onClick={() => setActiveTab('metrics')}
                className={`rounded-xl px-3.5 py-2 transition ${
                  activeTab === 'metrics'
                    ? 'bg-[#f6c400] text-[#111315]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                Métricas & Rendimiento
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-white">Ing. Carlos Mendoza</span>
              <span className="text-[10px] text-[#f6c400]">Asesor Comercial Senior</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="hidden lg:flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
            >
              <Eye className="size-3.5 text-[#f6c400]" />
              Ver Portal Público
            </Link>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="grid size-9 place-items-center rounded-xl bg-white/5 text-white/70 hover:bg-red-500/20 hover:text-red-400 transition"
              title="Cerrar sesión"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Pills */}
        <div className="flex sm:hidden gap-1 mt-3 overflow-x-auto text-xs font-bold pt-2 border-t border-white/5">
          <button
            onClick={() => setActiveTab('crm')}
            className={`rounded-lg px-3 py-1.5 whitespace-nowrap ${
              activeTab === 'crm' ? 'bg-[#f6c400] text-[#111315]' : 'text-white/60'
            }`}
          >
            Cotizaciones ({totalQuotesCount})
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`rounded-lg px-3 py-1.5 whitespace-nowrap ${
              activeTab === 'fleet' ? 'bg-[#f6c400] text-[#111315]' : 'text-white/60'
            }`}
          >
            Flota
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`rounded-lg px-3 py-1.5 whitespace-nowrap ${
              activeTab === 'metrics' ? 'bg-[#f6c400] text-[#111315]' : 'text-white/60'
            }`}
          >
            Métricas
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 mx-auto max-w-7xl w-full p-6 lg:p-10">
        {/* TAB 1: CRM & Cotizaciones */}
        {activeTab === 'crm' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-white/10 bg-[#191c1e] p-5 shadow-sm">
                <div className="flex items-center justify-between text-white/50 text-xs mb-2">
                  <span>Total Solicitudes</span>
                  <FileText className="size-4 text-[#f6c400]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">{totalQuotesCount}</div>
                <span className="text-[10px] text-white/40 block mt-1">Radicados en plataforma</span>
              </div>

              <div className="rounded-2xl border border-[#f6c400]/40 bg-[#191c1e] p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs mb-2 text-[#f6c400]">
                  <span className="font-bold">Pendientes de Atención</span>
                  <Clock className="size-4 animate-pulse text-[#f6c400]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#f6c400]">{pendingQuotesCount}</div>
                <span className="text-[10px] text-white/40 block mt-1">Objetivo de respuesta: &lt; 2h</span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#191c1e] p-5 shadow-sm">
                <div className="flex items-center justify-between text-white/50 text-xs mb-2">
                  <span>Cotizadas / Aprobadas</span>
                  <CheckCircle className="size-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {quotedOrApprovedCount}
                </div>
                <span className="text-[10px] text-white/40 block mt-1">Tasa de respuesta: 85%</span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#191c1e] p-5 shadow-sm">
                <div className="flex items-center justify-between text-white/50 text-xs mb-2">
                  <span>Pipeline Estimado</span>
                  <DollarSign className="size-4 text-white/60" />
                </div>
                <div className="text-lg sm:text-xl font-black text-white truncate">
                  {formatCOP(totalPipelineValue)}
                </div>
                <span className="text-[10px] text-emerald-400 block mt-1">Valor en propuestas activas</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Status pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['Todas', 'Pendiente', 'En Revisión', 'Cotizada', 'Aprobada', 'Rechazada'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      statusFilter === st
                        ? 'bg-[#f6c400] text-[#111315]'
                        : 'bg-[#191c1e] text-white/60 hover:text-white border border-white/5'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por radicado, cliente, máquina..."
                  className="w-full rounded-xl border border-white/10 bg-[#191c1e] pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#f6c400] transition"
                />
              </div>
            </div>

            {/* Quotes Table */}
            <div className="rounded-3xl border border-white/10 bg-[#191c1e] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#141719] text-[10px] font-bold uppercase tracking-wider text-white/50 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4">Radicado / Fecha</th>
                      <th className="px-6 py-4">Cliente / Empresa</th>
                      <th className="px-6 py-4">Equipo Solicitado</th>
                      <th className="px-6 py-4">Ubicación Obra</th>
                      <th className="px-6 py-4">Presupuesto Est.</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-white/40">
                          No se encontraron cotizaciones con el filtro actual.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotes.map((q) => {
                        const statusColors: Record<QuoteStatus, string> = {
                          Pendiente: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
                          'En Revisión': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
                          Cotizada: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
                          Aprobada: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                          Rechazada: 'bg-red-500/15 text-red-400 border-red-500/30'
                        };

                        return (
                          <tr key={q.id} className="hover:bg-white/5 transition">
                            <td className="px-6 py-4">
                              <span className="font-extrabold text-white text-xs block">{q.id}</span>
                              <span className="text-[10px] text-white/40">{formatDate(q.createdAt)}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-bold text-white block">{q.fullName}</span>
                              <span className="text-[11px] text-white/50">{q.company || 'Persona Natural'}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-semibold text-white block">{q.machineName}</span>
                              <span className="text-[10px] text-[#f6c400]">
                                {q.duration} · {q.withOperator ? 'Con operador' : 'Sin operador'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-white/70">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="size-3 text-[#f6c400]" />
                                <span>{q.city}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-extrabold text-white">
                              {formatCOP(q.estimatedBudget)}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                                  statusColors[q.status]
                                }`}
                              >
                                <span className="size-1.5 rounded-full bg-current" />
                                {q.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleOpenQuoteModal(q)}
                                className="inline-flex items-center gap-1 rounded-xl bg-white/10 hover:bg-[#f6c400] hover:text-[#111315] px-3 py-1.5 text-xs font-bold transition"
                              >
                                <span>Expediente</span>
                                <ChevronRight className="size-3" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Control de Flota y Patios */}
        {activeTab === 'fleet' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">Control de Disponibilidad de Flota (Patios Colombia)</h2>
                <p className="text-xs text-white/60">
                  Actualiza el estado operativo de los equipos. Los cambios se reflejan en el catálogo público.
                </p>
              </div>
              <button
                onClick={reloadData}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold hover:bg-white/10 transition"
              >
                <RefreshCw className="size-3.5" /> Actualizar Horómetros
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fleet.map((item) => {
                const statusStyles = {
                  Disponible: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
                  'En Obra': 'border-[#f6c400]/40 bg-[#f6c400]/10 text-[#f6c400]',
                  'En Mantenimiento': 'border-red-500/40 bg-red-500/10 text-red-400'
                };

                return (
                  <div
                    key={item.machineId}
                    className="rounded-3xl border border-white/10 bg-[#191c1e] p-6 shadow-xl space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-white/40 block">
                          Identificador: {item.machineId.toUpperCase()}
                        </span>
                        <h3 className="font-extrabold text-base text-white mt-0.5">
                          {item.machineName}
                        </h3>
                      </div>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                          statusStyles[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-white/70 bg-[#141719] p-3.5 rounded-2xl border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-white/40">Ubicación Actual:</span>
                        <span className="font-semibold text-white">{item.locationCity || 'Patio Central'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Horómetro Cat Product Link:</span>
                        <span className="font-semibold text-[#f6c400]">{item.horometerHours} hrs</span>
                      </div>
                      {item.currentProject && (
                        <div className="flex justify-between">
                          <span className="text-white/40">Asignado a:</span>
                          <span className="font-semibold text-white truncate max-w-[160px]">
                            {item.currentProject}
                          </span>
                        </div>
                      )}
                      {item.returnDate && (
                        <div className="flex justify-between">
                          <span className="text-white/40">Retorno a Patio:</span>
                          <span className="font-semibold text-white">{item.returnDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Change status controls */}
                    <div className="pt-2 space-y-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-white/50 mb-1.5">
                          Cambiar Estado Operativo
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(['Disponible', 'En Obra', 'En Mantenimiento'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => {
                                if (st === 'En Mantenimiento') {
                                  handleOpenMaintenance(item);
                                } else {
                                  handleUpdateFleet(
                                    item.machineId,
                                    st,
                                    st === 'En Obra' ? 'Obra en Ejecución' : undefined
                                  );
                                }
                              }}
                              className={`rounded-lg py-1.5 text-[10px] font-bold border transition ${
                                item.status === st
                                  ? 'bg-white text-[#111315] border-white'
                                  : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                      {item.status === 'En Mantenimiento' && (
                        <button
                          onClick={() => handleOpenMaintenance(item)}
                          className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 py-2.5 text-xs font-bold text-amber-400 hover:bg-amber-500 hover:text-[#111315] transition"
                        >
                          <Wrench className="size-3.5" />
                          Gestionar Orden de Taller
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Métricas y Desempeño Comercial */}
        {activeTab === 'metrics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-black">Rendimiento Comercial & Tiempos de Respuesta</h2>
              <p className="text-xs text-white/60">
                Métricas operativas del equipo de asesores comerciales de Maqui-Rent.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-[#191c1e] p-6 space-y-4">
                <span className="text-[10px] uppercase font-bold text-[#f6c400]">Tiempo Promedio de Respuesta</span>
                <div className="text-3xl font-black text-white">1h 14m</div>
                <p className="text-xs text-white/50">
                  Meta corporativa: &lt; 2 horas. Cumplimiento del 94.2% en solicitudes de obras prioritarias.
                </p>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[94%]" />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#191c1e] p-6 space-y-4">
                <span className="text-[10px] uppercase font-bold text-[#f6c400]">Tasa de Conversión a Contrato</span>
                <div className="text-3xl font-black text-white">76.4%</div>
                <p className="text-xs text-white/50">
                  De cada 10 solicitudes de cotización radicadas, 7.6 se convierten en alquiler efectivo con operador.
                </p>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#f6c400] w-[76%]" />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#191c1e] p-6 space-y-4">
                <span className="text-[10px] uppercase font-bold text-[#f6c400]">Canal Preferido de Respuesta</span>
                <div className="text-3xl font-black text-white">WhatsApp 82%</div>
                <p className="text-xs text-white/50">
                  La comunicación directa por WhatsApp acelera el cierre de negocios de maquinaria en un 300%.
                </p>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[82%]" />
                </div>
              </div>
            </div>

            {/* Demanda por maquinaria */}
            <div className="rounded-3xl border border-white/10 bg-[#191c1e] p-6 space-y-4">
              <h3 className="font-extrabold text-sm text-white">Demanda de Alquiler por Modelo de Maquinaria</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold">CAT 320 Excavadora Hidráulica</span>
                    <span className="text-[#f6c400]">42% de la demanda</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-[#f6c400] w-[42%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold">CAT 950 Cargador Frontal de Ruedas</span>
                    <span className="text-white/70">28% de la demanda</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-white/50 w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold">CAT 745 Camión Articulado</span>
                    <span className="text-white/70">18% de la demanda</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-white/40 w-[18%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold">CAT CS56B Rodillo Compactador</span>
                    <span className="text-white/70">12% de la demanda</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-white/30 w-[12%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Expediente y Respuesta a Cotización */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedQuote(null)}
          />

          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#1c2022] text-white shadow-2xl border border-white/10 my-8 z-10 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141719]">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#f6c400] px-3 py-0.5 text-xs font-black uppercase text-[#111315]">
                  {selectedQuote.id}
                </span>
                <span className="text-xs text-white/50">{formatDate(selectedQuote.createdAt)}</span>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="grid size-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
              {actionNotice && (
                <div className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-3.5 text-xs font-bold text-emerald-400 flex items-center gap-2 animate-in fade-in">
                  <Check className="size-4 shrink-0" />
                  {actionNotice}
                </div>
              )}

              {/* Client Info Grid */}
              <div className="grid gap-4 sm:grid-cols-2 bg-[#141719] p-5 rounded-2xl border border-white/5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/40 block">Cliente / Solicitante</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">{selectedQuote.fullName}</span>
                  <span className="text-xs text-white/60">{selectedQuote.company || 'Persona Natural'}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-white/40 block">Contacto Directo</span>
                  <div className="flex items-center gap-2 text-xs text-white mt-1">
                    <Phone className="size-3.5 text-[#f6c400]" /> {selectedQuote.phone}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
                    <Mail className="size-3.5 text-[#f6c400]" /> {selectedQuote.email}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-white/40 block">Equipo y Duración</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{selectedQuote.machineName}</span>
                  <span className="text-[11px] text-[#f6c400]">
                    {selectedQuote.duration} · {selectedQuote.withOperator ? 'Con Operador SENA' : 'Sin Operador'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-white/40 block">Ciudad & Presupuesto</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{selectedQuote.city}</span>
                  <span className="text-sm font-black text-emerald-400">
                    {formatCOP(selectedQuote.estimatedBudget)}
                  </span>
                </div>
              </div>

              {/* Client Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  Mensaje y Requerimientos de la Obra
                </label>
                <div className="rounded-2xl bg-[#141719] p-4 text-xs leading-relaxed text-white/80 border border-white/5">
                  {selectedQuote.message}
                </div>
              </div>

              {/* Status and Advisor Notes */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                    Estado de la Cotización
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as QuoteStatus)}
                    className="w-full rounded-xl border border-white/15 bg-[#141719] px-4 py-3 text-xs font-bold text-white outline-none focus:border-[#f6c400]"
                  >
                    <option value="Pendiente">Pendiente (Nueva)</option>
                    <option value="En Revisión">En Revisión Técnica</option>
                    <option value="Cotizada">Cotizada (Propuesta Enviada)</option>
                    <option value="Aprobada">Aprobada (Contrato Cerrado)</option>
                    <option value="Rechazada">Rechazada / Sin Disponibilidad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                    Asesor Asignado
                  </label>
                  <input
                    readOnly
                    value={selectedQuote.assignedAdvisor || 'Ing. Carlos Mendoza'}
                    className="w-full rounded-xl border border-white/10 bg-[#141719] px-4 py-3 text-xs text-white/60 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  Bitácora Interna del Asesor Comercial
                </label>
                <textarea
                  rows={3}
                  value={advisorNotes}
                  onChange={(e) => setAdvisorNotes(e.target.value)}
                  placeholder="Escribe notas sobre condiciones de flete, descuentos autorizados, verificación de póliza o fecha de entrega pactada..."
                  className="w-full rounded-xl border border-white/15 bg-[#141719] p-4 text-xs text-white outline-none focus:border-[#f6c400]"
                />
              </div>

              {/* Action Buttons to Respond */}
              <div className="border-t border-white/10 pt-5 space-y-3">
                <span className="block text-xs font-bold text-white uppercase tracking-wider">
                  Acciones de Respuesta Inmediata al Cliente
                </span>

                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    onClick={handleSendWhatsAppResponse}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-xs font-bold text-white transition shadow-md"
                  >
                    <MessageCircle className="size-4" />
                    Responder WhatsApp
                  </button>

                  <button
                    onClick={handleSendEmailResponse}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 py-3 text-xs font-bold text-white transition"
                  >
                    <Send className="size-4 text-[#f6c400]" />
                    Enviar Propuesta Email
                  </button>

                  <button
                    onClick={() => setIsPrintModalOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 py-3 text-xs font-bold text-white transition"
                  >
                    <Printer className="size-4 text-[#f6c400]" />
                    Hoja de Cotización PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-white/10 bg-[#141719] px-6 py-4">
              <button
                onClick={() => setSelectedQuote(null)}
                className="rounded-xl border border-white/15 px-5 py-2.5 text-xs font-bold text-white/70 hover:text-white"
              >
                Cerrar
              </button>
              <button
                onClick={handleSaveChanges}
                className="rounded-xl bg-[#f6c400] px-6 py-2.5 text-xs font-black text-[#111315] hover:bg-[#ffd52b]"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE / FORMAL PDF MODAL */}
      {isPrintModalOpen && selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white text-[#111315] p-8 sm:p-10 shadow-2xl my-6">
            <div className="flex items-center justify-between border-b-2 border-[#111315] pb-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-xl bg-[#f6c400] text-[#111315] font-black text-2xl">
                  M
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight leading-none">MAQUI-RENT COLOMBIA S.A.S.</h2>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    NIT: 901.458.219-4 · Distribuidor Equipos CAT®
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-[#111315] block">{selectedQuote.id}</span>
                <span className="text-[10px] text-gray-500 block">{formatDate(selectedQuote.createdAt)}</span>
              </div>
            </div>

            <div className="mb-6 rounded-xl bg-gray-50 p-4 border border-gray-200 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Cliente:</span>
                <span className="font-bold text-gray-900">{selectedQuote.fullName}</span>
                <span className="block text-gray-600">{selectedQuote.company || 'Particular'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Lugar de Obra:</span>
                <span className="font-bold text-gray-900">{selectedQuote.city}</span>
                <span className="block text-gray-600">Tel: {selectedQuote.phone}</span>
              </div>
            </div>

            <table className="w-full text-xs border border-gray-200 mb-6">
              <thead className="bg-gray-100 text-gray-700 font-bold">
                <tr>
                  <th className="p-3 text-left">Ítem / Maquinaria</th>
                  <th className="p-3 text-center">Duración</th>
                  <th className="p-3 text-center">Operador</th>
                  <th className="p-3 text-right">Subtotal Estimado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 font-semibold">{selectedQuote.machineName}</td>
                  <td className="p-3 text-center">{selectedQuote.duration}</td>
                  <td className="p-3 text-center">{selectedQuote.withOperator ? 'SENA Incluido' : 'No'}</td>
                  <td className="p-3 text-right font-bold">{formatCOP(selectedQuote.estimatedBudget)}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between items-end border-t border-gray-200 pt-6 text-xs">
              <div>
                <span className="block text-[10px] text-gray-400 uppercase font-bold">Asesor Comercial:</span>
                <span className="font-bold text-gray-800">Ing. Carlos Mendoza</span>
                <span className="block text-[10px] text-gray-500">Móvil: +57 (310) 555-0190</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Total Propuesta con IVA:</span>
                <span className="text-xl font-black text-gray-900">{formatCOP(selectedQuote.estimatedBudget * 1.19)}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 print:hidden">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Cerrar Vista Previa
              </button>
              <button
                onClick={() => window.print()}
                className="rounded-xl bg-[#111315] px-5 py-2 text-xs font-bold text-white hover:bg-gray-800"
              >
                Imprimir Documento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ORDEN DE MANTENIMIENTO Y TALLER */}
      {selectedFleetForMaintenance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedFleetForMaintenance(null)}
          />

          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-[#1c2022] text-white shadow-2xl border border-amber-500/30 my-8 z-10 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141719]">
              <div className="flex items-center gap-2.5">
                <div className="grid size-8 place-items-center rounded-lg bg-amber-500 text-[#111315]">
                  <Wrench className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Orden de Mantenimiento & Taller</h3>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    {selectedFleetForMaintenance.machineName}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedFleetForMaintenance(null)}
                className="grid size-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid gap-3 sm:grid-cols-2 bg-[#141719] p-4 rounded-2xl border border-white/5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/40 block">Ubicación Actual</span>
                  <span className="font-bold text-white">{selectedFleetForMaintenance.locationCity || 'Taller Central Cota'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/40 block">Horómetro Cat Product Link</span>
                  <span className="font-bold text-[#f6c400]">{selectedFleetForMaintenance.horometerHours} Horas</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Tipo de Mantenimiento
                  </label>
                  <select
                    value={maintenanceType}
                    onChange={(e) => setMaintenanceType(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#141719] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#f6c400]"
                  >
                    <option value="Preventivo Mayor 2.000 Horas">Preventivo Mayor 2.000 Horas</option>
                    <option value="Preventivo Rutinario 500 Horas">Preventivo Rutinario 500 Horas</option>
                    <option value="Correctivo / Falla Mecánica">Correctivo / Falla Mecánica</option>
                    <option value="Cambio de Orugas / Rodamiento">Cambio de Orugas / Rodamiento</option>
                    <option value="Inspección de Fluidos SOS">Inspección de Fluidos SOS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Fecha Proyectada de Salida
                  </label>
                  <input
                    type="date"
                    value={maintenanceReturnDate}
                    onChange={(e) => setMaintenanceReturnDate(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#141719] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#f6c400]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/80 mb-1">
                  Técnico Especialista a Cargo
                </label>
                <input
                  type="text"
                  value={maintenanceTech}
                  onChange={(e) => setMaintenanceTech(e.target.value)}
                  placeholder="Téc. Jhon Jairo Moreno (Certificado Cat)"
                  className="w-full rounded-xl border border-white/15 bg-[#141719] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#f6c400]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/80 mb-1">
                  Repuestos CAT® e Insumos Utilizados
                </label>
                <input
                  type="text"
                  value={maintenanceParts}
                  onChange={(e) => setMaintenanceParts(e.target.value)}
                  placeholder="Filtros 1R-0716, aceite Cat HYDO Advanced 10W..."
                  className="w-full rounded-xl border border-white/15 bg-[#141719] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#f6c400]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/80 mb-1">
                  Observaciones Técnicas de Salida
                </label>
                <textarea
                  rows={3}
                  value={maintenanceNotes}
                  onChange={(e) => setMaintenanceNotes(e.target.value)}
                  placeholder="Detalles de calibración de presiones hidráulicas, prueba de carga..."
                  className="w-full rounded-xl border border-white/15 bg-[#141719] p-3 text-xs text-white outline-none focus:border-[#f6c400]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 bg-[#141719] px-6 py-4">
              <button
                onClick={() => handleReleaseFromMaintenance(selectedFleetForMaintenance.machineId)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-black text-white transition shadow-md"
              >
                <Check className="size-4" />
                Dar de Alta / Habilitar Inmediatamente
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedFleetForMaintenance(null)}
                  className="rounded-xl border border-white/15 px-4 py-2.5 text-xs font-bold text-white/70 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveMaintenanceOrder}
                  className="rounded-xl bg-[#f6c400] px-5 py-2.5 text-xs font-black text-[#111315] hover:bg-[#ffd52b]"
                >
                  Guardar Orden
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
