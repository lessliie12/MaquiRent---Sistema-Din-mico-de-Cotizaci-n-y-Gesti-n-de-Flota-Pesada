export type MachineCategory =
  | 'Excavadoras'
  | 'Tractores Dozer'
  | 'Cargadores'
  | 'Retroexcavadoras'
  | 'Minicargadores'
  | 'Motoniveladoras'
  | 'Volquetas y Camiones'
  | 'Compactadores'
  | 'Tiendetubos'
  | 'Manipuladores Telescópicos'
  | 'Pavimentación y Fresado';

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
  liftCapacity?: string; // Capacidad de elevación / punto de vuelco (Tiendetubos, manipuladores)
  boomLength?: string; // Longitud de pluma (Tiendetubos)
  maxReach?: string; // Alcance máximo horizontal / vertical
  bladeCapacity?: string; // Capacidad o ancho de hoja vertedera (Dozers, Motoniveladoras)
  millingWidth?: string; // Ancho de fresado / pavimentación
}

export interface Machine {
  id: string;
  slug: string;
  name: string;
  type: MachineCategory;
  subtype: string; // e.g. 'Tiendetubos Pesados', 'Miniexcavadoras', 'Dozers Medianos'
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

export interface CategoryMetadata {
  id: MachineCategory;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  catUrl: string; // Link to Caterpillar official equipment page
  subtypes: string[];
  sampleImage: string;
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
