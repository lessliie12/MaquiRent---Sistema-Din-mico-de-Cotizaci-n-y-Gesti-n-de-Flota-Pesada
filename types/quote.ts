export type QuoteStatus = 'Pendiente' | 'En Revisión' | 'Cotizada' | 'Aprobada' | 'Rechazada';

export interface QuoteRequest {
  id: string; // e.g. "COT-2026-8492"
  createdAt: string; // ISO date or formatted
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  city: string;
  machineName: string;
  duration: string;
  withOperator: boolean;
  estimatedBudget: number; // in COP
  message: string;
  status: QuoteStatus;
  assignedAdvisor?: string;
  advisorNotes?: string;
  responseSentAt?: string;
  responseChannel?: 'WhatsApp' | 'Correo' | 'Llamada';
}

export type MachineOperationalStatus = 'Disponible' | 'En Obra' | 'En Mantenimiento';

export interface MachineFleetControl {
  machineId: string;
  machineName: string;
  status: MachineOperationalStatus;
  currentProject?: string;
  locationCity?: string;
  returnDate?: string;
  horometerHours: number;
  maintenanceType?: string;
  technician?: string;
  maintenanceParts?: string;
  maintenanceCost?: number;
  entryDate?: string;
  maintenanceNotes?: string;
}
