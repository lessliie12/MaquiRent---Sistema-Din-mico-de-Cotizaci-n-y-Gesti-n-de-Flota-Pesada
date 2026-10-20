'use client';

import { QuoteRequest, QuoteStatus, MachineFleetControl } from '@/types/quote';

const QUOTES_STORAGE_KEY = 'maqui_rent_quotes_v1';
const FLEET_STORAGE_KEY = 'maqui_rent_fleet_v1';

const INITIAL_DEMO_QUOTES: QuoteRequest[] = [
  {
    id: 'COT-2026-8941',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 min ago
    fullName: 'Ing. Alejandro Morales',
    company: 'Consorcio Vial Magdalena Medio',
    email: 'a.morales@consorciovial.com.co',
    phone: '3124567890',
    city: 'Barrancabermeja, Santander',
    machineName: 'CAT 320 Excavadora Hidráulica',
    duration: '25 días',
    withOperator: true,
    estimatedBudget: 48750000,
    message: 'Requerimos la excavadora para apertura de zanjas en proyecto de tubería de gas. El terreno es arcilloso con pendiente moderada. Requerimos operador certificado.',
    status: 'Pendiente',
    assignedAdvisor: 'Ing. Carlos Mendoza'
  },
  {
    id: 'COT-2026-8812',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    fullName: 'Dra. Sandra Milena Pineda',
    company: 'Inversiones y Canteras del Valle',
    email: 'spineda@canterasvalle.com',
    phone: '3157891234',
    city: 'Yumbo, Valle del Cauca',
    machineName: 'CAT 745 Camión Articulado',
    duration: '45 días',
    withOperator: true,
    estimatedBudget: 162000000,
    message: 'Transporte de material de cantera hacia planta de trituración. Obra continua a doble turno.',
    status: 'En Revisión',
    assignedAdvisor: 'Ing. Carlos Mendoza',
    advisorNotes: 'Validando disponibilidad de cama baja desde patio Yumbo. Confirmando póliza todo riesgo TREC.'
  },
  {
    id: 'COT-2026-8650',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    fullName: 'Arq. Andrés Felipe Ruiz',
    company: 'Constructora Capital Andina',
    email: 'andres.ruiz@capitalandina.co',
    phone: '3189012345',
    city: 'Bogotá D.C. / Cota',
    machineName: 'CAT 950 Cargador Frontal de Ruedas',
    duration: '15 días',
    withOperator: false,
    estimatedBudget: 35250000,
    message: 'Cargue de áridos en patio de acopio para centro logístico Cota. Disponemos de operador propio certificado.',
    status: 'Cotizada',
    assignedAdvisor: 'Ing. Laura Beltrán',
    advisorNotes: 'Cotización enviada con descuento del 5%. Pendiente firma de contrato y depósito.',
    responseSentAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    responseChannel: 'WhatsApp'
  },
  {
    id: 'COT-2026-8320',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    fullName: 'Ing. Hernando Gómez',
    company: 'Pavimentos de Colombia S.A.S.',
    email: 'hgomez@pavimentoscolombia.com',
    phone: '3203456789',
    city: 'Villavicencio, Meta',
    machineName: 'CAT CS56B Rodillo Compactador',
    duration: '30 días',
    withOperator: true,
    estimatedBudget: 46500000,
    message: 'Compactación de sub-base en variante Villavicencio. Contrato adjudicado por concesión vial.',
    status: 'Aprobada',
    assignedAdvisor: 'Ing. Carlos Mendoza',
    advisorNotes: 'Contrato firmado. Despacho programado para el lunes a primera hora desde patio Cota.',
    responseSentAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    responseChannel: 'Correo'
  }
];

const INITIAL_FLEET_STATUS: MachineFleetControl[] = [
  {
    machineId: 'cat-pl83',
    machineName: 'CAT PL83 Tiendetubos Heavy-Duty',
    status: 'Disponible',
    locationCity: 'Patio Central Cota (Bogotá)',
    horometerHours: 850
  },
  {
    machineId: 'cat-pl72',
    machineName: 'CAT PL72 Tiendetubos Mediano',
    status: 'Disponible',
    locationCity: 'Patio Yumbo (Valle)',
    horometerHours: 1200
  },
  {
    machineId: 'cat-320',
    machineName: 'CAT 320 Excavadora Hidráulica',
    status: 'Disponible',
    locationCity: 'Patio Central Cota (Bogotá)',
    horometerHours: 2450
  },
  {
    machineId: 'cat-336',
    machineName: 'CAT 336 Excavadora Heavy Duty',
    status: 'En Mantenimiento',
    currentProject: 'Mantenimiento Preventivo 2.000 Horas & Inspección Hidráulica',
    locationCity: 'Taller Central Cota (Cundinamarca)',
    returnDate: '2026-10-24',
    horometerHours: 5400,
    maintenanceType: 'Preventivo Mayor 2.000 Horas',
    technician: 'Téc. Jhon Jairo Moreno (Especialista CAT®)',
    maintenanceParts: 'Kit filtros hidráulicos 1R-0716, aceite Cat HYDO Advanced 10W, sellos de pistón de brazo',
    entryDate: '2026-10-18',
    maintenanceNotes: 'Equipo en banco de pruebas de presión hidráulica. Calibración de bomba completada al 80%. Salida proyectada para entrega el 24 de Octubre.'
  },
  {
    machineId: 'cat-308',
    machineName: 'CAT 308 CR Miniexcavadora Compacta',
    status: 'Disponible',
    locationCity: 'Patio Itagüí (Medellín)',
    horometerHours: 920
  },
  {
    machineId: 'cat-d6',
    machineName: 'CAT D6 Tractor de Cadenas Dozer',
    status: 'Disponible',
    locationCity: 'Patio Central Cota (Bogotá)',
    horometerHours: 1840
  },
  {
    machineId: 'cat-d8t',
    machineName: 'CAT D8T Tractor Dozer Pesado',
    status: 'Disponible',
    locationCity: 'Patio Vía 40 (Barranquilla)',
    horometerHours: 3400
  },
  {
    machineId: 'cat-745',
    machineName: 'CAT 745 Camión Articulado',
    status: 'Disponible',
    locationCity: 'Patio Yumbo (Valle)',
    horometerHours: 3120
  },
  {
    machineId: 'cat-777',
    machineName: 'CAT 777G Camión Minero Fuera de Carretera',
    status: 'Disponible',
    locationCity: 'Patio Vía 40 (Barranquilla)',
    horometerHours: 4100
  },
  {
    machineId: 'cat-950',
    machineName: 'CAT 950 Cargador de Ruedas',
    status: 'En Obra',
    currentProject: 'Consorcio Vial Andes - Girardot',
    locationCity: 'Girardot, Cundinamarca',
    returnDate: '2026-11-15',
    horometerHours: 4210
  },
  {
    machineId: 'cat-950gc',
    machineName: 'CAT 950 GC Cargador de Eficiencia',
    status: 'Disponible',
    locationCity: 'Patio Vía 40 (Barranquilla)',
    horometerHours: 1650
  },
  {
    machineId: 'cat-420',
    machineName: 'CAT 420 Retroexcavadora (Pivote Central)',
    status: 'Disponible',
    locationCity: 'Patio Central Cota (Bogotá)',
    horometerHours: 1350
  },
  {
    machineId: 'cat-426',
    machineName: 'CAT 426F2 Retroexcavadora (Desplazamiento Lateral)',
    status: 'Disponible',
    locationCity: 'Patio Itagüí (Medellín)',
    horometerHours: 1100
  },
  {
    machineId: 'cat-259d3',
    machineName: 'CAT 259D3 Cargador Compacto de Orugas (CTL)',
    status: 'Disponible',
    locationCity: 'Patio Itagüí (Medellín)',
    horometerHours: 780
  },
  {
    machineId: 'cat-140',
    machineName: 'CAT 140 Motoniveladora con Cat Cross Slope',
    status: 'Disponible',
    locationCity: 'Patio Central Cota (Bogotá)',
    horometerHours: 2100
  },
  {
    machineId: 'cat-cs56b',
    machineName: 'CAT CS56B Rodillo Compactador de Suelos',
    status: 'Disponible',
    locationCity: 'Patio Itagüí (Medellín)',
    horometerHours: 1890
  },
  {
    machineId: 'cat-th357',
    machineName: 'CAT TH357D Manipulador Telescópico',
    status: 'Disponible',
    locationCity: 'Patio Central Cota (Bogotá)',
    horometerHours: 1120
  },
  {
    machineId: 'cat-pm310',
    machineName: 'CAT PM310 Fresadora de Pavimento en Frío',
    status: 'Disponible',
    locationCity: 'Patio Central Cota (Bogotá)',
    horometerHours: 1420
  }
];

export const quotesService = {
  getQuotes(): QuoteRequest[] {
    if (typeof window === 'undefined') return INITIAL_DEMO_QUOTES;
    const stored = localStorage.getItem(QUOTES_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_QUOTES));
      return INITIAL_DEMO_QUOTES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_DEMO_QUOTES;
    }
  },

  saveQuote(quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'> & { id?: string }): QuoteRequest {
    const quotes = this.getQuotes();
    const newQuote: QuoteRequest = {
      ...quote,
      id: quote.id || `COT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Pendiente',
      assignedAdvisor: 'Ing. Carlos Mendoza (Asignado)'
    };

    const updated = [newQuote, ...quotes];
    if (typeof window !== 'undefined') {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('maqui_quotes_updated'));
    }
    return newQuote;
  },

  updateQuote(id: string, updates: Partial<QuoteRequest>): QuoteRequest | null {
    const quotes = this.getQuotes();
    const index = quotes.findIndex((q) => q.id === id);
    if (index === -1) return null;

    quotes[index] = { ...quotes[index], ...updates };
    if (typeof window !== 'undefined') {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes));
      window.dispatchEvent(new Event('maqui_quotes_updated'));
    }
    return quotes[index];
  },

  deleteQuote(id: string): boolean {
    const quotes = this.getQuotes();
    const filtered = quotes.filter((q) => q.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event('maqui_quotes_updated'));
    }
    return true;
  },

  // Fleet Control
  getFleet(): MachineFleetControl[] {
    if (typeof window === 'undefined') return INITIAL_FLEET_STATUS;
    const stored = localStorage.getItem(FLEET_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(INITIAL_FLEET_STATUS));
      return INITIAL_FLEET_STATUS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_FLEET_STATUS;
    }
  },

  updateFleetItem(machineId: string, updates: Partial<MachineFleetControl>): void {
    const fleet = this.getFleet();
    const index = fleet.findIndex((f) => f.machineId === machineId);
    if (index !== -1) {
      fleet[index] = { ...fleet[index], ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(fleet));
        window.dispatchEvent(new Event('maqui_fleet_updated'));
      }
    }
  }
};
