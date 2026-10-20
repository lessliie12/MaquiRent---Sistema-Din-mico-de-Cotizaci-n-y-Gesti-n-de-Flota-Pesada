import { Machine, CategoryMetadata, CityFreight, FAQItem, Testimonial } from '@/types/machine';

export const categories = [
  'Toda la maquinaria',
  'Excavadoras',
  'Tractores Dozer',
  'Cargadores',
  'Retroexcavadoras',
  'Minicargadores',
  'Motoniveladoras',
  'Volquetas y Camiones',
  'Compactadores',
  'Tiendetubos',
  'Manipuladores Telescópicos',
  'Pavimentación y Fresado'
] as const;

export const categoriesMetadata: CategoryMetadata[] = [
  {
    id: 'Tiendetubos',
    name: 'Tiendetubos (Pipelayers)',
    shortName: 'Tiendetubos',
    tagline: 'Líder mundial en tendido de tuberías, oleoductos y gasoductos',
    description: 'Los tiendetubos Cat® han sido el estándar indiscutible de la industria de oleoductos y gasoductos durante décadas. Creados para responder a las exigencias de contratistas de tuberías en todo el mundo, ofrecen capacidad de elevación insuperable, diseño de centro de gravedad bajo y cabinas certificadas con visión directa a la zanja.',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/pipelayers/pipelayers.html',
    subtypes: ['Todos', 'Tiendetubos Medianos', 'Tiendetubos Pesados'],
    sampleImage: '/images/cat-pl83-pipelayer.png'
  },
  {
    id: 'Excavadoras',
    name: 'Excavadoras Hidráulicas',
    shortName: 'Excavadoras',
    tagline: 'Potencia hidráulica de nueva generación con telemática Cat GRADE',
    description: 'Desde miniexcavadoras compactas para zanjas urbanas hasta gigantes de más de 37 toneladas para demolición y minería en roca. Con hasta un 20% menos de consumo de combustible y sistemas de pesaje dinámico.',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/excavators.html',
    subtypes: ['Todas', 'Miniexcavadoras', 'Excavadoras Medianas', 'Excavadoras Grandes'],
    sampleImage: '/images/cat-320-excavator.png'
  },
  {
    id: 'Tractores Dozer',
    name: 'Tractores de Cadenas (Dozers)',
    shortName: 'Tractores Dozer',
    tagline: 'Máxima fuerza de empuje, nivelación 3D y tracción en pendientes extremas',
    description: 'Los buldóceres Cat combinan tren de rodaje de rueda motriz elevada con tecnología automatizada Cat GRADE 3D. Ideales para descapote, corte masivo de montaña y apertura de frentes viales.',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/dozers.html',
    subtypes: ['Todos', 'Dozers Medianos', 'Dozers Grandes'],
    sampleImage: '/images/cat-d6-dozer.png'
  },
  {
    id: 'Cargadores',
    name: 'Cargadores de Ruedas Frontales',
    shortName: 'Cargadores',
    tagline: 'Ciclos rápidos de cargue de volquetas con pesaje a bordo Cat Payload',
    description: 'Rendimiento probado en canteras, plantas de trituración y patios de acopio. Cucharones de geometría avanzada que aumentan el factor de llenado hasta en un 10%.',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/wheel-loaders.html',
    subtypes: ['Todos', 'Cargadores Medianos', 'Cargadores Grandes'],
    sampleImage: '/images/cat-950-loader.png'
  },
  {
    id: 'Retroexcavadoras',
    name: 'Retroexcavadoras Cargadoras',
    shortName: 'Retroexcavadoras',
    tagline: 'Configuraciones de Pivote Central y Desplazamiento Lateral',
    description: 'Las retroexcavadoras cargadoras Cat® ofrecen una capacidad superior de excavación, apertura de zanjas, relleno y manipulación de materiales. Disponibles en configuración de Pivote Central (Center-Pivot con estabilizadores abatibles hacia afuera) y Desplazamiento Lateral (Side-Shift montado sobre riel transversal con estabilizadores verticales para excavar al ras de muros y andenes sin invadir carriles).',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/backhoe-loaders.html',
    subtypes: ['Todas', 'Pivote Central', 'Desplazamiento Lateral'],
    sampleImage: '/images/cat-420-backhoe.png'
  },
  {
    id: 'Minicargadores',
    name: 'Minicargadores y Orugas Compactas (CTL)',
    shortName: 'Minicargadores',
    tagline: 'Maniobrabilidad insuperable en espacios reducidos y terrenos blandos',
    description: 'Equipos compactos de alta productividad para urbanismo, pavimentación, demoliciones interiores y movimiento de materiales con bajísima presión sobre el suelo.',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/skid-steer-and-compact-track-loaders.html',
    subtypes: ['Todos', 'Minicargadores de Ruedas', 'Cargadores Compactos de Orugas'],
    sampleImage: '/images/cat-259d3-skidsteer.png'
  },
  {
    id: 'Motoniveladoras',
    name: 'Motoniveladoras de Precisión',
    shortName: 'Motoniveladoras',
    tagline: 'Acabado milimétrico de rasantes y conformación de taludes con Cat Cross Slope',
    description: 'El estándar de oro en conformación y conservación vial. Cabina de máxima visibilidad y vertederas de giro 360° para garantizar bombeos y peraltes exactos en proyectos 4G/5G.',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/motor-graders.html',
    subtypes: ['Todas', 'Motoniveladoras Viales', 'Motoniveladoras Pesadas'],
    sampleImage: '/images/cat-140-grader.png'
  },
  {
    id: 'Volquetas y Camiones',
    name: 'Camiones Articulados y Fuera de Carretera',
    shortName: 'Camiones y Volquetas',
    tagline: 'Acarreo de alto tonelaje en barriales extremos y frentes mineros',
    description: 'Flota pesada de volcado diseñada para mantener los ciclos de producción activos bajo lluvia intensa o barro gracias a su tracción 6x6 y control automático de tracción ATC.',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/articulated-trucks.html',
    subtypes: ['Todos', 'Camiones Articulados', 'Camiones Mineros Fuera de Carretera'],
    sampleImage: '/images/cat-745-hauler.png'
  },
  {
    id: 'Compactadores',
    name: 'Rodillos Compactadores de Suelo y Asfalto',
    shortName: 'Compactadores',
    tagline: 'Densidad óptima certificada con medición Machine Drive Power (MDP)',
    description: 'Equipos para sub-bases de suelo granular y carpetas asfálticas de rodadura en autopistas y pistas aeroportuarias. Sistemas de vibración de amplitud y frecuencia variable.',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/compactors.html',
    subtypes: ['Todos', 'Compactadores de Suelo', 'Compactadores de Asfalto'],
    sampleImage: '/images/cat-cs56-compactor.png'
  },
  {
    id: 'Manipuladores Telescópicos',
    name: 'Manipuladores Telescópicos (Telehandlers)',
    shortName: 'Manipuladores',
    tagline: 'Elevación, colocación y alcance en altura con tracción todoterreno',
    description: 'La solución más eficiente para el izaje de materiales, formaletería, perfiles estructurales y estibas en proyectos residenciales, bodegas y montajes industriales.',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/telehandlers.html',
    subtypes: ['Todos', 'Construcción y Alcance', 'Alta Capacidad de Carga'],
    sampleImage: '/images/cat-th357-telehandler.png'
  },
  {
    id: 'Pavimentación y Fresado',
    name: 'Pavimentadoras y Fresadoras en Frío',
    shortName: 'Pavimentación',
    tagline: 'Rehabilitación y tendido asfáltico continuo con control de rasante 3D',
    description: 'Equipos de precisión para la remoción controlada de pavimentos deteriorados y colocación homogénea de mezcla asfáltica en caliente con reglas calefactadas eléctricas.',
    catUrl: 'https://www.cat.com/es_US/products/new/equipment/cold-planers.html',
    subtypes: ['Todos', 'Fresadoras en Frío', 'Pavimentadoras de Asfalto'],
    sampleImage: '/images/cat-pm310-planer.png'
  }
];

export const machinesData: Machine[] = [
  // ===================== TIENDETUBOS (PIPELAYERS) =====================
  {
    id: 'cat-pl83',
    slug: 'cat-pl83-tiendetubos-pipelayer',
    name: 'CAT PL83 Tiendetubos Heavy-Duty',
    type: 'Tiendetubos',
    subtype: 'Tiendetubos Pesados',
    dailyRate: 4900000,
    monthlyRate: 105000000,
    salePrice: '$2.850.000.000 – $3.200.000.000 COP',
    detail: 'Cap. de elevación: 77.111 kg (170.000 lb) · Potencia: 238 kW (319 HP) · Pluma: 7,3 m',
    description: 'El CAT PL83 es la máquina insignia a nivel mundial para el tendido de oleoductos y gasoductos de gran calibre (>36"-48"). Ofrece control hidráulico electroasistido de cabrestante, contrapeso extensible hidráulico y certificación de seguridad antivuelco ROPS.',
    image: '/images/cat-pl83-pipelayer.png',
    badge: 'Especializado Gas/Petróleo',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '47.900 kg',
      power: '238 kW (319 HP) Cat C15',
      fuelCapacity: '415 L',
      year: 2024,
      engineModel: 'Cat C15 ACERT',
      topSpeed: '10,8 km/h',
      liftCapacity: '77.111 kg (170.000 lb) en punto de vuelco',
      boomLength: '7,3 m (24 ft) pluma de servicio pesado'
    },
    features: [
      'Indicador de Momento de Carga (LMI) digital con advertencias acústicas',
      'Contrapeso extensible hidráulico de accionamiento continuo',
      'Cabrestantes hidráulicos independientes con frenos de discos húmedos sellados',
      'Tren de rodaje de rueda motriz elevada para máxima durabilidad en fango y roca',
      'Cabina cerrada presurizada con vista panorámica directa a la línea de zanja'
    ],
    idealFor: [
      'Tendido de líneas troncales de gasoductos y oleoductos',
      'Cruces dirigidos bajo ríos e infraestructura vial mayor',
      'Obras de plantas de compresión y refinerías',
      'Izaje coordinado en tándem de sartas de tubería pesada'
    ]
  },
  {
    id: 'cat-pl72',
    slug: 'cat-pl72-tiendetubos-mediano',
    name: 'CAT PL72 Tiendetubos Mediano',
    type: 'Tiendetubos',
    subtype: 'Tiendetubos Medianos',
    dailyRate: 3800000,
    monthlyRate: 82000000,
    salePrice: '$2.150.000.000 – $2.420.000.000 COP',
    detail: 'Cap. de elevación: 40.823 kg (90.000 lb) · Potencia: 175 kW (235 HP) · Pluma: 6,1 m',
    description: 'Diseñado con precisión para líneas de distribución regional de 16" a 32", cruces urbanos y terrenos con fuertes pendientes. Su ancho de transporte optimizado facilita el traslado en cama baja sin desmontaje de orugas.',
    image: '/images/cat-pl83-pipelayer.png',
    badge: 'Alta Maniobrabilidad',
    availability: 'Disponible en 24h',
    specs: {
      operatingWeight: '30.500 kg',
      power: '175 kW (235 HP) Cat C9.3B',
      fuelCapacity: '380 L',
      year: 2024,
      engineModel: 'Cat C9.3B ACERT',
      topSpeed: '11,2 km/h',
      liftCapacity: '40.823 kg (90.000 lb)',
      boomLength: '6,1 m (20 ft)'
    },
    features: [
      'Controles ergonómicos integrados en un único joystick multifuncional',
      'Bomba de caudal variable para operación simultánea de gancho y pluma',
      'Estructura ROPS integrada y protección contra caídas de objetos',
      'Sistema telemático Cat Product Link™ con seguimiento de horómetros e inclinómetro'
    ],
    idealFor: [
      'Gasoductos urbanos y ramales de distribución secundaria',
      'Grandes acueductos metropolitanos de tubería de acero o polietileno',
      'Derechos de vía estrechos en zonas montañosas'
    ]
  },

  // ===================== EXCAVADORAS =====================
  {
    id: 'cat-320',
    slug: 'cat-320-excavadora',
    name: 'CAT 320 Excavadora Hidráulica',
    type: 'Excavadoras',
    subtype: 'Excavadoras Medianas',
    dailyRate: 1950000,
    monthlyRate: 42000000,
    salePrice: '$720.000.000 – $845.000.000 COP',
    detail: 'Peso: 22.000 kg · Potencia: 145 kW (195 HP) · Profundidad máx.: 6,7 m',
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
    id: 'cat-336',
    slug: 'cat-336-excavadora-pesada',
    name: 'CAT 336 Excavadora Heavy Duty',
    type: 'Excavadoras',
    subtype: 'Excavadoras Grandes',
    dailyRate: 2850000,
    monthlyRate: 62000000,
    salePrice: '$1.120.000.000 – $1.320.000.000 COP',
    detail: 'Peso: 37.400 kg · Potencia: 202 kW (271 HP) · Profundidad máx.: 7,4 m',
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
    id: 'cat-308',
    slug: 'cat-308-miniexcavadora',
    name: 'CAT 308 CR Miniexcavadora Compacta',
    type: 'Excavadoras',
    subtype: 'Miniexcavadoras',
    dailyRate: 980000,
    monthlyRate: 21500000,
    salePrice: '$385.000.000 – $440.000.000 COP',
    detail: 'Peso: 8.360 kg · Potencia: 51,8 kW (70 HP) · Giro de voladizo compacto',
    description: 'La opción ideal para obras urbanas, canalizaciones subterráneas y espacios con tránsito activo. Su diseño de radio compacto (CR) permite girar a escasos centímetros de muros sin riesgo de impacto.',
    image: '/images/cat-308-miniexcavator.png',
    badge: 'Radio Compacto',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '8.360 kg',
      power: '51,8 kW (70 HP)',
      maxDepth: '4,15 m',
      bucketCapacity: '0,35 m³',
      fuelCapacity: '147 L',
      year: 2024,
      engineModel: 'Cat C3.3B Turbo',
      topSpeed: '4,9 km/h'
    },
    features: [
      'Hoja empujadora frontal con función de flotación para nivelación rápida',
      'Dirección mediante palanca tipo joystick Stick Steer exclusiva de Caterpillar',
      'Líneas hidráulicas auxiliares bidireccionales para ahoyador o martillo',
      'Cabina con aire acondicionado, radio Bluetooth y monitor LCD'
    ],
    idealFor: [
      'Instalación de redes de fibra óptica, agua potable y alcantarillado',
      'Cimentaciones y micropilotaje en sótanos de edificios',
      'Adecuación de predios residenciales y paisajismo'
    ]
  },

  // ===================== TRACTORES DOZER =====================
  {
    id: 'cat-d6',
    slug: 'cat-d6-tractor-dozer',
    name: 'CAT D6 Tractor de Cadenas Dozer',
    type: 'Tractores Dozer',
    subtype: 'Dozers Medianos',
    dailyRate: 2400000,
    monthlyRate: 52000000,
    salePrice: '$1.450.000.000 – $1.680.000.000 COP',
    detail: 'Potencia: 161 kW (215 HP) · Peso: 22.900 kg · Cuchilla SU 5,7 m³',
    description: 'El tractor de orugas más versátil de su categoría con transmisión automática de 4 velocidades y Cat GRADE con 3D integrado. Empuja hasta un 20% más material con menos esfuerzo de combustión.',
    image: '/images/cat-d6-dozer.png',
    badge: 'Nivelación 3D',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '22.900 kg',
      power: '161 kW (215 HP)',
      fuelCapacity: '341 L',
      year: 2024,
      engineModel: 'Cat C7.1 ACERT',
      topSpeed: '11,7 km/h',
      bladeCapacity: '5,7 m³ (Cuchilla Semi-Universal con inclinación hidráulica)'
    },
    features: [
      'Tecnología Cat GRADE 3D con receptores GPS/GNSS integrados de fábrica',
      'Transmisión continua que ajusta automáticamente torque y velocidad',
      'Desgarrador trasero (Ripper) paralelogramo de 3 dientes para suelo duro',
      'Tren de rodaje Heavy Duty Extended Life con bujes lubricados'
    ],
    idealFor: [
      'Apertura de vías y banqueo de montaña',
      'Descapote inicial y conformación de plataformas industriales',
      'Vertederos sanitarios y conformación de terrazas agrícolas'
    ]
  },
  {
    id: 'cat-d8t',
    slug: 'cat-d8t-tractor-pesado',
    name: 'CAT D8T Tractor Dozer Grande',
    type: 'Tractores Dozer',
    subtype: 'Dozers Grandes',
    dailyRate: 3950000,
    monthlyRate: 86000000,
    salePrice: '$2.300.000.000 – $2.650.000.000 COP',
    detail: 'Potencia: 264 kW (354 HP) · Peso: 39.800 kg · Cuchilla Universal 8,7 m³',
    description: 'Fuerza masiva de empuje para minería, presas hidroeléctricas y cortes de suelo rocoso de gran envergadura. Tren de rodaje sobredimensionado y convertidor de par con embrague de traba.',
    image: '/images/cat-d6-dozer.png',
    badge: 'Dozers Grandes',
    availability: 'Disponible en 48h',
    specs: {
      operatingWeight: '39.800 kg',
      power: '264 kW (354 HP)',
      fuelCapacity: '627 L',
      year: 2023,
      engineModel: 'Cat C15 ACERT',
      topSpeed: '11,3 km/h',
      bladeCapacity: '8,7 m³ (Hoja U de alto volumen)'
    },
    features: [
      'Ripper monovástago para fractura de formaciones rocosas',
      'Dirección por diferencial para potencia ininterrumpida en ambas orugas al girar',
      'Cabina con aislamiento acústico reforzado y filtración para polvo denso',
      'Sistema de enfriamiento con radiador de aluminio modular de núcleos individuales'
    ],
    idealFor: [
      'Explotación de carbón, oro y calizas a cielo abierto',
      'Cierre de presas y terraplenes masivos',
      'Corte de taludes rocosos en autopistas de montaña'
    ]
  },

  // ===================== CARGADORES =====================
  {
    id: 'cat-950',
    slug: 'cat-950-cargador-ruedas',
    name: 'CAT 950 Cargador Frontal de Ruedas',
    type: 'Cargadores',
    subtype: 'Cargadores Medianos',
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
    id: 'cat-950gc',
    slug: 'cat-950gc-cargador-eficiente',
    name: 'CAT 950 GC Cargador de Eficiencia',
    type: 'Cargadores',
    subtype: 'Cargadores Medianos',
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
  },
  {
    id: 'cat-966m',
    slug: 'cat-966m-cargador-grande',
    name: 'CAT 966M Cargador de Ruedas Grande',
    type: 'Cargadores',
    subtype: 'Cargadores Grandes',
    dailyRate: 2890000,
    monthlyRate: 63000000,
    salePrice: '$1.580.000.000 – $1.790.000.000 COP',
    detail: 'Cucharón: 5,0 m³ · Potencia: 232 kW (311 HP) · Peso: 23.200 kg',
    description: 'Cargador pesado de alta producción para canteras, puertos y plantas de cemento. Equipado con convertidor de par con embrague de traba y sistema Cat Payload.',
    image: '/images/cat-966m-loader.png',
    badge: 'Cargadores Grandes',
    availability: 'Disponible en 24h',
    specs: {
      operatingWeight: '23.200 kg',
      power: '232 kW (311 HP)',
      bucketCapacity: '5,0 m³',
      fuelCapacity: '313 L',
      year: 2024,
      engineModel: 'Cat C9.3 ACERT',
      topSpeed: '39,5 km/h'
    },
    features: [
      'Sistema de pesaje dinámico Cat CPM integrado de fábrica',
      'Transmisión Powershift de 4 velocidades con cambio suave',
      'Cabina premium con suspensión y aislamiento acústico',
      'Ejes con diferenciales de deslizamiento limitado'
    ],
    idealFor: [
      'Cargue intensivo de camiones mineros y volquetas doble troque',
      'Operaciones en canteras de caliza y grava',
      'Terminales marítimas de carbón y áridos'
    ]
  },

  // ===================== RETROEXCAVADORAS =====================
  {
    id: 'cat-420',
    slug: 'cat-420-retroexcavadora-pivote-central',
    name: 'CAT 420 Retroexcavadora (Pivote Central)',
    type: 'Retroexcavadoras',
    subtype: 'Pivote Central',
    dailyRate: 1150000,
    monthlyRate: 25000000,
    salePrice: '$460.000.000 – $520.000.000 COP',
    detail: 'Pivote central con estabilizadores abatibles · Potencia: 74,5 kW (100 HP) · Profundidad máx.: 5,6 m',
    description: 'Configuración clásica de pivote central con patas estabilizadoras de apertura en ala hacia afuera. Brinda máxima estabilidad en suelos blandos, zanjado de redes primarias y alta fuerza de rompimiento.',
    image: '/images/cat-420-backhoe.png',
    badge: 'Pivote Central',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '8.450 kg',
      power: '74,5 kW (100 HP) Cat C3.6',
      maxDepth: '5,63 m (con brazo extensible desplegado)',
      bucketCapacity: '1,0 m³ (frontal) / 0,24 m³ (posterior)',
      fuelCapacity: '160 L',
      year: 2024,
      engineModel: 'Cat C3.6',
      topSpeed: '40 km/h'
    },
    features: [
      'Estabilizadores abatibles hacia afuera de amplia huella de sustentación',
      'Controles piloto ergonómicos tipo excavadora',
      'Sistema de amortiguación de marcha Ride Control para traslados suaves',
      'Brazo excavador curvo de diseño Cat con extensible hidráulico'
    ],
    idealFor: [
      'Zanjeo masivo para redes de alcantarillado y agua potable',
      'Cargue de volquetas y movimiento de tierra en áreas despejadas',
      'Obras viales rurales y explanaciones de terrenos'
    ]
  },
  {
    id: 'cat-426',
    slug: 'cat-426f2-retroexcavadora-desplazamiento-lateral',
    name: 'CAT 426F2 Retroexcavadora (Desplazamiento Lateral)',
    type: 'Retroexcavadoras',
    subtype: 'Desplazamiento Lateral',
    dailyRate: 1190000,
    monthlyRate: 26000000,
    salePrice: '$485.000.000 – $545.000.000 COP',
    detail: 'Carro sobre riel transversal y estabilizadores verticales · Potencia: 68,5 kW (93 HP) · Ideal para zanjas junto a muros',
    description: 'Diseñada con mecanismo de desplazamiento lateral (Side Shift) sobre riel transversal trasero y estabilizadores que descienden verticalmente en línea recta. Permite excavar exactamente al ras de paredes, andenes y bermas sin invadir carriles de tráfico vehicular.',
    image: '/images/cat-426-sideshift.png',
    badge: 'Desplazamiento Lateral',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '8.760 kg',
      power: '68,5 kW (93 HP) Cat 3054C DIT',
      maxDepth: '5,25 m (con brazo extensible desplegado)',
      bucketCapacity: '1,05 m³ (frontal) / 0,26 m³ (posterior)',
      fuelCapacity: '160 L',
      year: 2024,
      engineModel: 'Cat 3054C Turbo',
      topSpeed: '40 km/h'
    },
    features: [
      'Carro de desplazamiento lateral hidráulico sobre riel transversal',
      'Estabilizadores de descenso vertical directo que no invaden carriles vecinos',
      'Capacidad de excavar pegado a muros, cercas y linderos de propiedad',
      'Transmisión Powershuttle de 4 velocidades sincronizadas'
    ],
    idealFor: [
      'Obras de acueducto y gas en vías urbanas angostas con tránsito activo',
      'Zanjado perimetral contra muros de bodegas y cerramientos',
      'Reparaciones de redes públicas en aceras y bermas'
    ]
  },

  // ===================== MINICARGADORES =====================
  {
    id: 'cat-226d3',
    slug: 'cat-226d3-minicargador-ruedas',
    name: 'CAT 226D3 Minicargador de Ruedas',
    type: 'Minicargadores',
    subtype: 'Minicargadores de Ruedas',
    dailyRate: 780000,
    monthlyRate: 16900000,
    salePrice: '$290.000.000 – $330.000.000 COP',
    detail: 'Capacidad nominal: 703 kg · Ruedas neumáticas 10x16.5 · Potencia: 49,6 kW (67 HP)',
    description: 'Minicargador ágil de ruedas para sótanos de edificios, bodegas y pavimentación urbana. Su radio de giro cero y diseño compacto permiten trabajar en pasillos estrechos.',
    image: '/images/cat-226d3-skidsteer.png',
    badge: 'Minicargadores de Ruedas',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '2.653 kg',
      power: '49,6 kW (67 HP)',
      bucketCapacity: '0,40 m³',
      fuelCapacity: '57 L',
      year: 2024,
      engineModel: 'Cat C2.2 Turbo',
      topSpeed: '17,8 km/h',
      payload: '703 kg'
    },
    features: [
      'Controles electrohidráulicos integrados en el asiento del operador',
      'Cabina sellada y presurizada con aire acondicionado',
      'Acoplador rápido de herramientas universal Cat',
      'Cámara de visión trasera de alta definición'
    ],
    idealFor: [
      'Limpieza y nivelación en sótanos de parqueaderos',
      'Cargue de escombros en volquetas sencillas',
      'Mantenimiento de zonas verdes y obras residenciales'
    ]
  },
  {
    id: 'cat-259d3',
    slug: 'cat-259d3-cargador-compacto-orugas',
    name: 'CAT 259D3 Cargador Compacto de Orugas (CTL)',
    type: 'Minicargadores',
    subtype: 'Cargadores Compactos de Orugas',
    dailyRate: 990000,
    monthlyRate: 21800000,
    salePrice: '$390.000.000 – $445.000.000 COP',
    detail: 'Capacidad nominal: 1.330 kg · Orugas de caucho · Potencia: 55,4 kW (74 HP)',
    description: 'Excelente flotación y tracción sobresaliente en lodo, pendientes resbaladizas y arena. Su tren de orugas con suspensión por barra de torsión proporciona un viaje suave y protección del suelo.',
    image: '/images/cat-259d3-skidsteer.png',
    badge: 'Cargadores de Orugas',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '4.076 kg',
      power: '55,4 kW (74 HP)',
      bucketCapacity: '0,55 m³',
      fuelCapacity: '105 L',
      year: 2024,
      engineModel: 'Cat C3.3B DIT Turbo',
      topSpeed: '13,7 km/h',
      payload: '1.330 kg (50% carga de vuelco)'
    },
    features: [
      'Cabina sellada y presurizada de una sola pieza (One-piece cab design)',
      'Levantamiento vertical para máxima altura de vaciado sobre volquetas',
      'Pantalla táctil de 5 pulgadas con cámara de retroceso',
      'Circuito hidráulico auxiliar de alto caudal (High Flow XPS)'
    ],
    idealFor: [
      'Trabajos en terrenos blandos y lodazales donde las ruedas patinan',
      'Nivelación fina de pisos para naves industriales y parqueaderos',
      'Fresado localizado de pavimentos y limpieza de frentes de obra'
    ]
  },

  // ===================== MOTONIVELADORAS =====================
  {
    id: 'cat-120',
    slug: 'cat-120-motoniveladora-vial',
    name: 'CAT 120 Motoniveladora Vial Eficiente',
    type: 'Motoniveladoras',
    subtype: 'Motoniveladoras Viales',
    dailyRate: 2150000,
    monthlyRate: 47000000,
    salePrice: '$1.150.000.000 – $1.320.000.000 COP',
    detail: 'Potencia: 108 kW (145 HP) · Vertedera: 3,7 m · Peso: 14.200 kg',
    description: 'La máquina de conformación vial predilecta para municipios y concesiones terciarias. Ofrece bajo consumo y excelente radio de giro para trazados de caminos rurales.',
    image: '/images/cat-140-grader.png',
    badge: 'Motoniveladoras Viales',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '14.200 kg',
      power: '108 kW (145 HP)',
      fuelCapacity: '246 L',
      year: 2024,
      engineModel: 'Cat C7.1',
      topSpeed: '45 km/h',
      bladeCapacity: '3,7 m de vertedera con giro 360°'
    },
    features: [
      'Controles de palanca tradicionales o joysticks electrohidráulicos',
      'Círculo de giro con embrague de deslizamiento para protección contra impactos',
      'Escarificador frontal de 5 dientes para sub-bases granulares',
      'Cabina panorámica con vidrios tintados y aire acondicionado'
    ],
    idealFor: [
      'Mantenimiento periódico de vías terciarias y rurales',
      'Escarificado y reperfilado de caminos de acceso en fincas y parcelaciones',
      'Nivelación de rasantes en plataformas de bodegas'
    ]
  },
  {
    id: 'cat-140',
    slug: 'cat-140-motoniveladora',
    name: 'CAT 140 Motoniveladora Pesada con Cat Cross Slope',
    type: 'Motoniveladoras',
    subtype: 'Motoniveladoras Pesadas',
    dailyRate: 2650000,
    monthlyRate: 58000000,
    salePrice: '$1.380.000.000 – $1.590.000.000 COP',
    detail: 'Potencia: 147 kW (197 HP) · Vertedera: 4,3 m · Peso: 17.500 kg',
    description: 'El referente indiscutible en ingeniería vial colombiana. Equipada con transmisión servoasistida Powershift de 8 adelante y 6 atrás, y sistema Cat Cross Slope para control automático de la pendiente transversal.',
    image: '/images/cat-140-grader.png',
    badge: 'Motoniveladoras Pesadas',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '17.500 kg',
      power: '147 kW (197 HP)',
      fuelCapacity: '394 L',
      year: 2024,
      engineModel: 'Cat C7.1 ACERT',
      topSpeed: '46,6 km/h',
      bladeCapacity: '4,27 m de longitud de vertedera con giro 360°'
    },
    features: [
      'Sistema Cat Grade Cross Slope para acabados viales según planos 3D',
      'Desgarrador trasero / Escarificador delantero para romper sub-bases',
      'Articulación de bastidor de 20° para radios de giro cerrados',
      'Cabina con palancas de control joystick electrohidráulicas avanzadas'
    ],
    idealFor: [
      'Conformación de sub-bases y bases estabilizadas en carreteras 4G/5G',
      'Mantenimiento continuo de corredores mineros y pistas de acarreo',
      'Limpieza y reperfilado de cunetas y taludes laterales'
    ]
  },

  // ===================== VOLQUETAS Y CAMIONES =====================
  {
    id: 'cat-745',
    slug: 'cat-745-volqueta-articulada',
    name: 'CAT 745 Camión Articulado 6x6',
    type: 'Volquetas y Camiones',
    subtype: 'Camiones Articulados',
    dailyRate: 3600000,
    monthlyRate: 78000000,
    salePrice: '$1.950.000.000 – $2.160.000.000 COP',
    detail: 'Carga útil: 45,2 t (25 m³) · Potencia: 381 kW (511 HP) · Tracción total 6x6',
    description: 'Diseñado para terrenos agrestes, barro extremo y pendientes pronunciadas en canteras y megaproyectos. Su tracción automática ATC y retardo hidráulico brindan máxima seguridad.',
    image: '/images/cat-745-hauler.png',
    badge: 'Camiones Articulados',
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
    id: 'cat-777',
    slug: 'cat-777-camion-minero',
    name: 'CAT 777G Camión Minero Fuera de Carretera',
    type: 'Volquetas y Camiones',
    subtype: 'Camiones Mineros Fuera de Carretera',
    dailyRate: 7200000,
    monthlyRate: 155000000,
    salePrice: '$4.100.000.000 – $4.650.000.000 COP',
    detail: 'Carga útil: 96,4 toneladas (60 m³) · Potencia: 765 kW (1.025 HP)',
    description: 'El gigante indiscutible del transporte minero de alta velocidad. Equipado con motor Cat C32 ACERT, frenos enfriados por aceite en las 4 ruedas y sistema de pesaje TPMS.',
    image: '/images/cat-777-truck.png',
    badge: 'Minería Pesada',
    availability: 'Disponible en 48h',
    specs: {
      operatingWeight: '67.000 kg (vacío) / 164.000 kg (cargado)',
      power: '765 kW (1.025 HP) Cat C32',
      payload: '96,4 toneladas / 60,0 m³ colmado',
      fuelCapacity: '1.136 L',
      year: 2023,
      engineModel: 'Cat C32 ACERT V12',
      topSpeed: '65,9 km/h'
    },
    features: [
      'Control Automático de Retardador (ARC) para pendientes descendentes a plena carga',
      'Sistema de Gestión de Carga Útil TPMS con lámparas indicadoras externas',
      'Cabina ergonómica con filtración presurizada y ROPS/FOPS minero',
      'Frenos multidisco de servicio pesado enfriados continuamente por líquido'
    ],
    idealFor: [
      'Grandes concesiones mineras de carbón, níquel y oro',
      'Proyectos de presas y desvío de cauces de gran volumen',
      'Canteras industriales de agregados de alta producción continua'
    ]
  },

  // ===================== COMPACTADORES =====================
  {
    id: 'cat-cs56b',
    slug: 'cat-cs56b-compactador-suelo',
    name: 'CAT CS56B Rodillo Compactador de Suelos',
    type: 'Compactadores',
    subtype: 'Compactadores de Suelo',
    dailyRate: 1550000,
    monthlyRate: 33000000,
    salePrice: '$610.000.000 – $708.000.000 COP',
    detail: 'Ancho de tambor: 2.134 mm · Peso operativo: 10.900 kg · Medición MDP',
    description: 'Líder en compactación de sub-bases granulares, afirmados y terraplenes. Incluye sistema Cat Compaction Control (MDP) para medir la rigidez del suelo en tiempo real.',
    image: '/images/cat-cs56-compactor.png',
    badge: 'Compactadores de Suelo',
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
    id: 'cat-cb25',
    slug: 'cat-cb25-compactador-asfalto',
    name: 'CAT CB2.5 Compactador en Tándem para Asfalto',
    type: 'Compactadores',
    subtype: 'Compactadores de Asfalto',
    dailyRate: 890000,
    monthlyRate: 19200000,
    salePrice: '$310.000.000 – $360.000.000 COP',
    detail: 'Doble tambor vibratorio: 1.000 mm · Peso: 2.500 kg · Sistema de rociado presurizado',
    description: 'Compactador tándem vibratorio para capas de rodadura asfáltica, parqueaderos y ciclorrutas. Doble frecuencia de vibración y tambores compensados.',
    image: '/images/cat-cb25-compactor.png',
    badge: 'Compactadores de Asfalto',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '2.500 kg',
      power: '22,9 kW (30,7 HP)',
      drumWidth: '1.000 mm de ancho de tambor',
      fuelCapacity: '35 L',
      year: 2024,
      engineModel: 'Cat C1.5',
      topSpeed: '12 km/h'
    },
    features: [
      'Sistema de rociado de agua presurizado con doble filtración',
      'Doble tambor liso vibratorio con bordes biselados para evitar marcas',
      'Puesto de mando con excelente visibilidad a los bordes del tambor',
      'Rociador continuo o intermitente para ahorro de agua'
    ],
    idealFor: [
      'Compactación final de asfalto en vías urbanas y parqueaderos',
      'Bacheo y reparaciones de pavimento',
      'Senderos peatonales y pistas deportivas'
    ]
  },

  // ===================== MANIPULADORES TELESCÓPICOS =====================
  {
    id: 'cat-th357',
    slug: 'cat-th357-manipulador-telescopico',
    name: 'CAT TH357D Manipulador Telescópico',
    type: 'Manipuladores Telescópicos',
    subtype: 'Construcción y Alcance',
    dailyRate: 1450000,
    monthlyRate: 31500000,
    salePrice: '$520.000.000 – $580.000.000 COP',
    detail: 'Capacidad máx.: 3.500 kg · Altura de elevación: 7,0 m · Alcance: 3,8 m',
    description: 'Máxima agilidad para elevación de estibas de mampostería, estructuras metálicas y vaciado en plantas altas. Dirección en las 4 ruedas con 3 modos: circular, delantera y cangrejo.',
    image: '/images/cat-th357-telehandler.png',
    badge: 'Construcción y Alcance',
    availability: 'Inmediata',
    specs: {
      operatingWeight: '8.400 kg',
      power: '74,5 kW (100 HP)',
      fuelCapacity: '150 L',
      year: 2024,
      engineModel: 'Cat C3.6',
      topSpeed: '32 km/h',
      liftCapacity: '3.500 kg de capacidad nominal',
      maxReach: '7,0 m de elevación vertical / 3,8 m de alcance horizontal'
    },
    features: [
      'Transmisión Powershift de 4 velocidades con cambio suave bajo carga',
      'Horquillas para estibas con desplazamiento lateral hidráulico',
      'Sistema de advertencia de estabilidad longitudinal LSI',
      'Línea auxiliar en la punta del brazo para balde o canastilla de personal'
    ],
    idealFor: [
      'Izaje de formaletas y acero en edificaciones residenciales',
      'Descargue rápido de tractomulas en centros de distribución',
      'Montaje de estructuras metálicas y cerramientos perimetrales'
    ]
  },
  {
    id: 'cat-tl1255',
    slug: 'cat-tl1255-manipulador-gran-altura',
    name: 'CAT TL1255D Manipulador de Gran Altura',
    type: 'Manipuladores Telescópicos',
    subtype: 'Alta Capacidad de Carga',
    dailyRate: 1850000,
    monthlyRate: 40500000,
    salePrice: '$690.000.000 – $760.000.000 COP',
    detail: 'Capacidad máx.: 5.443 kg · Altura de elevación: 16,6 m · Estabilizadores hidráulicos',
    description: 'Manipulador telescópico de gran altura y servicio pesado. Alcanza hasta 5 pisos con estabilizadores hidráulicos de fábrica y autonivelación de bastidor.',
    image: '/images/cat-th357-telehandler.png',
    badge: 'Alta Capacidad de Carga',
    availability: 'Disponible en 24h',
    specs: {
      operatingWeight: '15.500 kg',
      power: '106 kW (142 HP) Cat C4.4 ACERT',
      fuelCapacity: '144 L',
      year: 2024,
      engineModel: 'Cat C4.4 ACERT',
      topSpeed: '33 km/h',
      liftCapacity: '5.443 kg (12.000 lb)',
      maxReach: '16,6 m de elevación vertical / 12,8 m de alcance horizontal'
    },
    features: [
      'Estabilizadores hidráulicos frontales para elevación segura a máxima altura',
      'Nivelación hidráulica de chasis hasta 10 grados a cada lado',
      'Pluma telescópica de 4 secciones de acero de alta resistencia',
      'Cabina con protección FOPS/ROPS y mandos electrohidráulicos por joystick'
    ],
    idealFor: [
      'Montaje de naves industriales de gran luz y altura',
      'Colocación de cerramientos y paneles en edificios de más de 4 pisos',
      'Operaciones portuarias e industriales pesadas'
    ]
  },

  // ===================== PAVIMENTACIÓN Y FRESADO =====================
  {
    id: 'cat-pm310',
    slug: 'cat-pm310-fresadora-en-frio',
    name: 'CAT PM310 Fresadora de Pavimento en Frío',
    type: 'Pavimentación y Fresado',
    subtype: 'Fresadoras en Frío',
    dailyRate: 3900000,
    monthlyRate: 85000000,
    salePrice: '$1.850.000.000 – $2.100.000.000 COP',
    detail: 'Ancho de corte: 1.000 mm · Profundidad máx.: 330 mm · Potencia: 246 kW (330 HP)',
    description: 'Remoción de asfalto de alta precisión para rehabilitación vial. Tambor rotor de dientes de carburo de tungsteno y cinta transportadora de descarga orientable hacia volquetas.',
    image: '/images/cat-pm310-planer.png',
    badge: 'Fresadoras en Frío',
    availability: 'Disponible en 24h',
    specs: {
      operatingWeight: '20.800 kg',
      power: '246 kW (330 HP)',
      fuelCapacity: '600 L',
      year: 2024,
      engineModel: 'Cat C9.3 ACERT',
      topSpeed: '5,9 km/h (traslado en orugas)',
      millingWidth: '1.000 mm de ancho de corte / 330 mm profundidad máx.'
    },
    features: [
      'Sistema de nivelación automática Cat GRADE con sensores sónicos',
      'Transportador de descarga plegable con velocidad y altura regulable',
      'Sistema de rociado de agua de alta presión para supresión de polvo',
      'Tren de 4 orugas con dirección independiente para curvas cerradas'
    ],
    idealFor: [
      'Fresado de baches y huellas de deformación en vías 4G',
      'Adecuación de juntas y transiciones de puentes vehiculares',
      'Fresado alrededor de pozos de alcantarillado y bordillos urbanos'
    ]
  },
  {
    id: 'cat-ap555',
    slug: 'cat-ap555-pavimentadora-asfalto',
    name: 'CAT AP555F Pavimentadora de Asfalto sobre Orugas',
    type: 'Pavimentación y Fresado',
    subtype: 'Pavimentadoras de Asfalto',
    dailyRate: 3400000,
    monthlyRate: 75000000,
    salePrice: '$1.650.000.000 – $1.900.000.000 COP',
    detail: 'Ancho estándar: 2,55 m – 5,0 m · Regla calefactada eléctrica SE50 V · Potencia: 106 kW',
    description: 'Pavimentadora de alta precisión sobre orugas de caucho Mobil-trac™. Su regla calefactada eléctrica proporciona un sellado y compactación inicial perfecta de la carpeta asfáltica.',
    image: '/images/cat-pm310-planer.png',
    badge: 'Pavimentadoras de Asfalto',
    availability: 'Disponible en 24h',
    specs: {
      operatingWeight: '14.200 kg',
      power: '106 kW (142 HP) Cat C4.4 ACERT',
      fuelCapacity: '189 L',
      year: 2024,
      engineModel: 'Cat C4.4 ACERT',
      topSpeed: '11 km/h',
      millingWidth: 'Ancho de pavimentación: 2,55 m – 5,0 m (extensible a 8,0 m)'
    },
    features: [
      'Regla con calefacción eléctrica de encendido rápido y bajo consumo',
      'Sistema de orugas de caucho Mobil-trac para tracción suave y sin dañar la base',
      'Consolas de operador duales e independientes de deslizamiento lateral',
      'Tolva frontal de gran capacidad con plegado hidráulico independiente'
    ],
    idealFor: [
      'Pavimentación de autopistas 4G/5G y vías departamentales',
      'Pistas de aeropuertos y plataformas de carga pesada',
      'Vías urbanas y circunvalares'
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
