import { Machine, CityFreight, FAQItem, Testimonial } from '@/types/machine';

export const categories = [
  'Toda la maquinaria',
  'Excavadoras',
  'Cargadores',
  'Volquetas',
  'Compactadores'
] as const;

export const machinesData: Machine[] = [
  {
    id: 'cat-320',
    slug: 'cat-320-excavadora',
    name: 'CAT 320 Excavadora Hidráulica',
    type: 'Excavadoras',
    dailyRate: 1950000,
    monthlyRate: 42000000,
    salePrice: '$720.000.000 – $845.000.000 COP',
    detail: 'Peso operativo: 22.000 kg · Potencia: 145 kW (195 HP) · Profundidad máx.: 6,7 m',
    description: 'La CAT 320 de nueva generación eleva el estándar de eficiencia en obras viales y civiles con tecnología Cat GRADE 2D integrada, reduciendo el consumo de combustible hasta en un 20%.',
    image: '/images/cat-320-excavator.png',
    badge: 'Más Solicitada',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '22.000 kg',
      power: '145 kW (195 HP) Cat C4.4',
      maxDepth: '6,72 m',
      bucketCapacity: '1,19 m³',
      fuelCapacity: '345 L',
      year: 2024,
      engineModel: 'Cat C4.4 ACERT',
      topSpeed: '5,7 km/h'
    },
    features: [
      'Sistema telemático Cat Product Link™ satelital',
      'Cat GRADE con 2D para nivelación automática',
      'Cabina sellada con aire acondicionado y ROPS/FOPS',
      'Cámara de visión trasera y lateral 360°',
      'Sistema hidráulico electroasistido para menor fatiga'
    ],
    idealFor: [
      'Movimiento masivo de tierras',
      'Zanjado para acueductos y gasoductos',
      'Construcción de vías terciarias y principales',
      'Demoliciones de mediano impacto'
    ]
  },
  {
    id: 'cat-745',
    slug: 'cat-745-volqueta-articulada',
    name: 'CAT 745 Camión Articulado',
    type: 'Volquetas',
    dailyRate: 3600000,
    monthlyRate: 78000000,
    salePrice: '$1.950.000.000 – $2.160.000.000 COP',
    detail: 'Carga útil: 45,2 t (25 m³) · Potencia: 381 kW (511 HP) · Tracción total 6x6',
    description: 'Diseñado para terrenos agrestes, barro extremo y pendientes pronunciadas en canteras y megaproyectos. Su tracción automática ATC y retardo hidráulico brindan máxima seguridad.',
    image: '/images/cat-745-hauler.png',
    badge: 'Alto Rendimiento',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '33.400 kg (vacío) / 78.600 kg (cargado)',
      power: '381 kW (511 HP)',
      payload: '45,2 toneladas / 25,0 m³',
      fuelCapacity: '550 L',
      year: 2024,
      engineModel: 'Cat C18 ACERT',
      topSpeed: '54,8 km/h'
    },
    features: [
      'Control Automático de Tracción (ATC sin intervención manual)',
      'Asistente de volcado Cat Detect Stability con alarma antivuelco',
      'Transmisión CX38B de 9 velocidades adelante y 2 atrás',
      'Retardador hidráulico de alta capacidad para descensos prolongados'
    ],
    idealFor: [
      'Acarreo pesado en canteras y minería a cielo abierto',
      'Presas hidroeléctricas y terraplenes masivos',
      'Obras viales de cuarta y quinta generación (4G/5G)'
    ]
  },
  {
    id: 'cat-950',
    slug: 'cat-950-cargador-ruedas',
    name: 'CAT 950 Cargador Frontal de Ruedas',
    type: 'Cargadores',
    dailyRate: 2350000,
    monthlyRate: 51000000,
    salePrice: '$1.220.000.000 – $1.460.000.000 COP',
    detail: 'Cucharón: 4,2 m³ · Potencia: 186 kW (249 HP) · Peso: 18.700 kg',
    description: 'Rendimiento sobresaliente en plantas de trituración, mezcla asfáltica y patios de acopio. Su sistema de pesaje a bordo Cat Payload evita sobrecargas y optimiza ciclos de camión.',
    image: '/images/cat-950-loader.png',
    badge: 'Mayor Productividad',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '18.700 kg',
      power: '186 kW (249 HP)',
      bucketCapacity: '4,2 m³ (con cuchilla de ataque)',
      fuelCapacity: '275 L',
      year: 2024,
      engineModel: 'Cat C7.1 ACERT',
      topSpeed: '40 km/h'
    },
    features: [
      'Pesaje dinámico Cat Production Measurement (CPM)',
      'Convertidor de par con embrague de traba (Lock-up clutch)',
      'Cinemática en Z con excelente fuerza de desprendimiento',
      'Palancas electrohidráulicas montadas en el asiento'
    ],
    idealFor: [
      'Carga rápida de volquetas sencillas, doble troques y mulas',
      'Alimentación de tolvas y plantas de asfalto/concreto',
      'Manejo de áridos, gravas y materiales granulares'
    ]
  },
  {
    id: 'cat-cs56b',
    slug: 'cat-cs56b-compactador-suelo',
    name: 'CAT CS56B Rodillo Compactador',
    type: 'Compactadores',
    dailyRate: 1550000,
    monthlyRate: 33000000,
    salePrice: '$610.000.000 – $708.000.000 COP',
    detail: 'Ancho de tambor: 2.134 mm · Peso operativo: 10.900 kg · Sistema de doble amplitud',
    description: 'Líder en compactación de sub-bases granulares, afirmados y terraplenes. Incluye sistema Cat Compaction Control (MDP) para medir la rigidez del suelo en tiempo real.',
    image: '/images/cat-cs56-compactor.png',
    badge: 'Económico',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '10.900 kg (peso estático en tambor: 6.200 kg)',
      power: '117 kW (157 HP)',
      drumWidth: '2.134 mm',
      fuelCapacity: '242 L',
      year: 2023,
      engineModel: 'Cat C4.4 con tecnología ACERT',
      topSpeed: '11,4 km/h'
    },
    features: [
      'Sistema de vibración encapsulado de doble frecuencia y amplitud',
      'Tecnología Machine Drive Power (MDP) para medición de densidad',
      'Doble bomba de propulsión para salvar pendientes de hasta 58%',
      'Cabina panorámica ROPS con aislamiento acústico y de vibración'
    ],
    idealFor: [
      'Compactación de bases y sub-bases para pavimentos',
      'Pistas de aeropuertos y plataformas logísticas',
      'Cimentaciones industriales y presas de tierra'
    ]
  },
  {
    id: 'cat-336',
    slug: 'cat-336-excavadora-pesada',
    name: 'CAT 336 Excavadora Heavy Duty',
    type: 'Excavadoras',
    dailyRate: 2850000,
    monthlyRate: 62000000,
    salePrice: '$1.120.000.000 – $1.320.000.000 COP',
    detail: 'Peso operativo: 37.400 kg · Potencia: 202 kW (271 HP) · Profundidad máx.: 7,4 m',
    description: 'Máxima potencia para roca dura, excavación profunda y alto volumen de remoción. Estructura reforzada y circuito hidráulico auxiliar para martillos de demolición pesados.',
    image: '/images/cat-336-excavator.png',
    badge: 'Trabajo Pesado',
    availability: 'Disponible en 24h',
    specs: {
      operatingWeight: '37.400 kg',
      power: '202 kW (271 HP)',
      maxDepth: '7,45 m',
      bucketCapacity: '2,27 m³ para roca',
      fuelCapacity: '600 L',
      year: 2024,
      engineModel: 'Cat C9.3B ACERT',
      topSpeed: '4,8 km/h'
    },
    features: [
      'Sistema de protección E-fence (límite de techo y laterales)',
      'Asistente de giro Swing Assist para ciclos rápidos y repetitivos',
      'Refrigeración con ventiladores reversibles independientes',
      'Líneas hidráulicas auxiliares de alta presión preinstaladas'
    ],
    idealFor: [
      'Extracción en canteras y frentes rocosos',
      'Túneles, cortes de montaña y estabilización de taludes',
      'Obras de dragado y profundización de canales fluviales'
    ]
  },
  {
    id: 'cat-950gc',
    slug: 'cat-950gc-cargador-eficiente',
    name: 'CAT 950 GC Cargador de Eficiencia',
    type: 'Cargadores',
    dailyRate: 1980000,
    monthlyRate: 44000000,
    salePrice: '$1.045.000.000 – $1.245.000.000 COP',
    detail: 'Potencia neta: 219 kW · Cucharón: 3,5 m³ · Peso: 18.500 kg',
    description: 'La opción predilecta para contratistas que buscan fiabilidad comprobada con bajo costo de operación por hora. Ideal para jornadas continuas de carga de material clasificado.',
    image: '/images/cat-950gc-loader.png',
    badge: 'Bajo Consumo',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '18.500 kg',
      power: '219 kW (294 HP)',
      bucketCapacity: '3,5 m³',
      fuelCapacity: '290 L',
      year: 2023,
      engineModel: 'Cat C7.1 mecánico con inyección common-rail',
      topSpeed: '36 km/h'
    },
    features: [
      'Mantenimiento centralizado con puntos de servicio a nivel del piso',
      'Enfriador de aceite hidráulico de alta eficiencia para climas cálidos',
      'Brazo de cargador de barra en Z para gran fuerza de rompimiento',
      'Cabina ergonómica y visibilidad frontal despejada'
    ],
    idealFor: [
      'Plantas de concreto premezclado',
      'Puertos fluviales y marítimos para graneles',
      'Acopios de agregados en concesiones viales'
    ]
  }
];

export const colombianCities: CityFreight[] = [
  { name: 'Bogotá D.C. / Cundinamarca', freightCost: 850000, estimatedHours: '4 - 6 horas' },
  { name: 'Medellín / Antioquia', freightCost: 1950000, estimatedHours: '10 - 14 horas' },
  { name: 'Cali / Valle del Cauca', freightCost: 2200000, estimatedHours: '12 - 16 horas' },
  { name: 'Barranquilla / Atlántico', freightCost: 3100000, estimatedHours: '18 - 24 horas' },
  { name: 'Bucaramanga / Santander', freightCost: 1800000, estimatedHours: '10 - 12 horas' },
  { name: 'Cartagena / Bolívar', freightCost: 3200000, estimatedHours: '20 - 26 horas' },
  { name: 'Pereira / Eje Cafetero', freightCost: 1600000, estimatedHours: '8 - 12 horas' },
  { name: 'Villavicencio / Meta', freightCost: 1300000, estimatedHours: '6 - 8 horas' },
  { name: 'Ibagué / Tolima', freightCost: 1100000, estimatedHours: '6 - 8 horas' },
  { name: 'Neiva / Huila', freightCost: 1700000, estimatedHours: '9 - 11 horas' }
];

export const operatorDailyRate = 220000; // COP per day per certified operator
export const insuranceRatePercentage = 0.035; // 3.5% insurance coverage per rental subtotal

export const faqData: FAQItem[] = [
  {
    question: '¿Qué requisitos legales y financieros se exigen para alquilar maquinaria?',
    answer: 'Para personas jurídicas solicitamos: RUT actualizado, Certificado de Cámara de Comercio (no mayor a 30 días), estados financieros del último periodo, cédula del representante legal y póliza de cumplimiento o depósito en garantía. Para personas naturales se requiere RUT, fotocopia de cédula y fiador con finca raíz.',
    category: 'alquiler'
  },
  {
    question: '¿El alquiler incluye operador certificado y combustible?',
    answer: 'El servicio base entrega la máquina con tanque lleno (debe restituirse igual) y sin operador. Sin embargo, en nuestra calculadora o cotización puedes incluir operador profesional certificado por el SENA con afiliación ARL de riesgo V y exámenes médicos de alturas/pesados.',
    category: 'operacion'
  },
  {
    question: '¿Cómo funciona el soporte técnico y mantenimiento en caso de varada en obra?',
    answer: 'Contamos con talleres móviles 4x4 y técnicos de guardia 24/7 en los principales corredores del país. Garantizamos un tiempo de respuesta en obra menor a 4 horas. Si la avería supera 12 horas continuas, sustituimos la máquina sin costo adicional de flete.',
    category: 'operacion'
  },
  {
    question: '¿Cómo se maneja el transporte (flete de cama baja) hacia mi proyecto?',
    answer: 'Disponemos de flota propia de camas bajas y tractomulas modulares. El costo del flete de ida y vuelta se calcula según la distancia desde nuestro patio más cercano (Bogotá, Medellín o Barranquilla) y se incluye de forma transparente en la cotización.',
    category: 'alquiler'
  },
  {
    question: '¿Qué descuentos aplican para alquileres de mediano y largo plazo?',
    answer: 'Aplicamos descuentos automáticos: 5% de descuento para períodos superiores a 7 días, 12% para más de 15 días, y hasta 20% para contratos mensuales o de duración de obra (>6 meses).',
    category: 'pagos'
  },
  {
    question: '¿Las máquinas cuentan con telemetría y monitoreo de horómetros?',
    answer: 'Sí, el 100% de nuestra flota CAT cuenta con Cat Product Link™. Desde nuestra app o enlace cliente puedes consultar en tiempo real las horas trabajadas, consumo de combustible, ubicación GPS y alertas mecánicas.',
    category: 'operacion'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    name: 'Ing. Carlos Mario Echeverri',
    role: 'Director de Obra Vía 4G',
    company: 'Consorcio Vial Andes',
    project: 'Doble Calzada Bogotá - Girardot',
    comment: 'Alquilamos 4 excavadoras CAT 320 y 2 volquetas articuladas durante 14 meses. La disponibilidad mecánica estuvo por encima del 98% y la respuesta del equipo técnico en obra fue impecable.',
    rating: 5
  },
  {
    name: 'Dra. Marcela Restrepo',
    role: 'Gerente de Proyectos',
    company: 'Constructora Urbana S.A.S.',
    project: 'Centro Logístico Funza Occidente',
    comment: 'La cotización transparente y la calculadora web nos permitieron presupuestar el movimiento de tierras en menos de 10 minutos. Entregaron las máquinas en sitio 24 horas después de radicar los documentos.',
    rating: 5
  },
  {
    name: 'Ing. Hernán Pardo',
    role: 'Superintendente de Mina',
    company: 'Agregados y Triturados del Norte',
    project: 'Cantera San Jerónimo',
    comment: 'Los cargadores CAT 950 con operador propio de Maqui-Rent incrementaron nuestra tasa de cargue diario en un 25%. Cuentan con todas las certificaciones de seguridad exigidas por la Agencia Nacional de Minería.',
    rating: 5
  }
];

export const companyStats = [
  { value: '+15', label: 'Años de Experiencia en Colombia', sub: 'Líderes en alquiler pesado' },
  { value: '+140', label: 'Máquinas en Flota Activa', sub: 'Modelos CAT 2022 - 2025' },
  { value: '99.2%', label: 'Disponibilidad Mecánica', sub: 'Mantenimiento preventivo estricto' },
  { value: '32', label: 'Departamentos con Cobertura', sub: 'Camas bajas propias a todo el país' }
];
