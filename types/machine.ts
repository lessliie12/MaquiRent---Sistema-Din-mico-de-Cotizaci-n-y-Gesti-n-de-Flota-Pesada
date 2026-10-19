export type MachineCategory = 'Excavadoras' | 'Cargadores' | 'Volquetas' | 'Compactadores';

export interface MachineSpecs {
  operatingWeight: string;
  power: string;
  fuelCapacity: string;
  year: number;
  maxDepth?: string;
  bucketCapacity?: string;
  payload?: string;
  drumWidth?: string;
  engineModel?: string;
  topSpeed?: string;
}

export interface Machine {
  id: string;
  slug: string;
  name: string;
  type: MachineCategory;
  dailyRate: number; // in COP
  monthlyRate: number; // in COP
  salePrice: string; // informative sale price
  detail: string;
  description: string;
  image: string;
  badge?: string;
  availability: 'Inmediata' | 'Disponible en 24h' | 'Disponible en 48h';
  specs: MachineSpecs;
  features: string[];
  idealFor: string[];
}

export interface QuoteItem {
  machineId: string;
  machineName: string;
  machineType: string;
  dailyRate: number;
  days: number;
  withOperator: boolean;
  notes?: string;
}

export interface CityFreight {
  name: string;
  freightCost: number; // COP cama baja
  estimatedHours: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'alquiler' | 'operacion' | 'pagos';
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  project: string;
  comment: string;
  rating: number;
}
