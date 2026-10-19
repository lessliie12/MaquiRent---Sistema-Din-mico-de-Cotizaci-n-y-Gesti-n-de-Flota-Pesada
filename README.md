# 🚜 MAQUI-RENT COLOMBIA · Plataforma de Alquiler y Gestión de Maquinaria Pesada CAT®

> **Proyecto Final Académico — Materia de Introducción**  
> Sistema web integral de cotización, catálogo técnico interactivo, calculadora de tarifas y panel administrativo (CRM + Control de Flota) para maquinaria pesada Caterpillar en Colombia.

---

## 📌 Tabla de Contenidos
1. [Descripción General](#-descripción-general)
2. [Funcionalidades Principales](#-funcionalidades-principales)
3. [Módulo Administrativo y CRM (/admin)](#-módulo-administrativo-y-crm-admin)
4. [Arquitectura y Seguridad](#-arquitectura-y-seguridad)
5. [Stack Tecnológico](#-stack-tecnológico)
6. [Estructura del Proyecto](#-estructura-del-proyecto)
7. [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
8. [Credenciales de Demostración](#-credenciales-de-demostración)

---

## 📖 Descripción General

**Maqui-Rent Colombia** es una solución digital diseñada para resolver la logística de alquiler de maquinaria pesada en proyectos de infraestructura vial (4G/5G), minería y construcción civil en Colombia.

El sistema cierra el ciclo de negocio completo:
1. **El cliente** explora la flota Caterpillar®, consulta fichas técnicas y simula presupuestos en tiempo real (con operador SENA, seguro TREC y flete a su departamento).
2. **El sistema** emite un número oficial de radicado (ej: `COT-2026-8492`) y almacena la solicitud.
3. **El asesor comercial** recibe la cotización en tiempo real en el **Panel Administrativo (`/admin`)**, valida disponibilidad, cambia estados, responde automáticamente por WhatsApp o correo y genera la hoja oficial de cotización imprimible.

---

## ✨ Funcionalidades Principales

### 🚜 Portal Público del Cliente (`/`)
* **Catálogo Dinámico e Interactivo**:
  * Filtro por categorías: *Excavadoras, Cargadores de Ruedas, Camiones Articulados y Compactadores*.
  * Buscador en tiempo real por modelo, potencia en HP o tonelaje.
  * Ordenamiento por menor y mayor tarifa diaria en pesos colombianos ($ COP).
* **Fichas Técnicas Detalladas (Modal)**:
  * Especificaciones de fábrica: peso operativo, potencia del motor, capacidad de cucharón/caja, profundidad de excavación, año modelo y aplicaciones ideales en obra.
* **Calculadora / Simulador de Tarifas en Vivo**:
  * Selector de días de alquiler (1 a 90 días) con **descuentos automáticos por volumen** (>7 días: 5%, >30 días: 15%).
  * Switch para incluir **Operador Certificado SENA** con ARL de Riesgo V (+ $220.000 / día).
  * Switch para **Póliza Todo Riesgo Maquinaria y Equipo (TREC)** (+3.5%).
  * Selector de flete en cama baja según la ciudad de entrega (Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Cartagena, etc.).
  * Desglose financiero instantáneo con cálculo automático de IVA (19%).
* **Bolsa de Cotización Flotante ("Mi Cotización")**:
  * Permite acumular múltiples máquinas, ajustar períodos y totalizar la propuesta consolidada.
* **Radicación Oficial con Código Radicado**:
  * Emisión automática de radicado único, copia rápida y confirmación directa por WhatsApp.
* **Secciones Corporativas Completas**:
  * *Sobre Nosotros*: Trayectoria, certificaciones de calidad y garantía de reemplazo en < 12h.
  * *Servicios*: Mantenimiento móvil 24/7 en obra, transporte en cama baja y telemetría Cat Product Link™.
  * *Preguntas Frecuentes (FAQ)*: Acordeón interactivo con requisitos, pólizas y pagos.
  * *Testimonios*: Casos de éxito con directores de obra y consorcios colombianos.

---

## 👑 Módulo Administrativo y CRM (`/admin`)

El portal administrativo permite al equipo de operaciones y ventas gestionar el día a día del negocio:

* **Bandeja de Entrada en Tiempo Real (CRM)**:
  * Tablero con métricas clave (KPIs): Total de solicitudes, pendientes de atención (< 2h meta), cotizadas/cerradas y valor del pipeline comercial en juego.
  * Filtros por estado: `Pendiente`, `En Revisión`, `Cotizada`, `Aprobada`, `Rechazada`.
  * Buscador por código de radicado o nombre del cliente.
* **Expediente del Cliente y Herramientas de Cierre**:
  * Consulta de datos de contacto, proyecto y presupuesto solicitado.
  * Bitácora interna del asesor para notas de negociación.
  * **Respuesta por WhatsApp (1 Clic)**: Abre chat con plantilla formal pre-redactada.
  * **Envío de Propuesta por Email**: Registro de canal y fecha de envío.
  * **Generador de Ficha de Cotización Formal (PDF / Imprimir)**: Hoja membretada oficial con sellos de Maqui-Rent y firma comercial.
* **Control de Flota y Gestión de Taller**:
  * Monitoreo de disponibilidad en patios de Colombia (Cota, Itagüí, Yumbo, Barranquilla).
  * Horómetros satelitales en tiempo real.
  * **Gestión de Órdenes de Mantenimiento**: Registro de técnico asignado, repuestos CAT® utilizados y fecha de salida.
  * **Alta Mecánica**: Al dar de alta un equipo en taller, el catálogo público se actualiza automáticamente a *Disponible*.

---

## 🛡️ Arquitectura y Seguridad

La aplicación incorpora buenas prácticas de ciberseguridad recomendadas por **OWASP**:

1. **Cabeceras HTTP Estrictas (`next.config.mjs`)**:
   * `Content-Security-Policy (CSP)`: Bloquea inyecciones de código y Cross-Site Scripting (XSS).
   * `X-Frame-Options: DENY`: Previene ataques de Clickjacking.
   * `X-Content-Type-Options: nosniff`: Evita suplantación de tipos MIME.
   * `Strict-Transport-Security (HSTS)`: Fuerza conexiones cifradas HTTPS.
   * `X-Robots-Tag: noindex, nofollow`: Oculta el panel `/admin` de buscadores públicos.
2. **Honeypot Anti-Spam**:
   * Campo señuelo invisible en formularios para capturar y descartar robots de spam silenciosamente.
3. **Sanitización de Entradas (Anti-XSS)**:
   * Limpieza de tags HTML y secuencias de escape antes del almacenamiento de cotizaciones.
4. **Control de Frecuencia (Rate Limiting)**:
   * Cooldown de 20 segundos entre envíos de formulario para mitigar ataques de denegación de servicio.
5. **Protección Anti-Fuerza Bruta en el Login**:
   * Bloqueo automático por 60 segundos con temporizador tras 4 intentos fallidos de contraseña.
6. **Banner de Cookies Técnicas**:
   * Aviso informativo con persistencia en `localStorage`.

---

## 💻 Stack Tecnológico

* **Framework Principal**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
* **Biblioteca de UI**: [React](https://react.dev/)
* **Tipado Estricto**: [TypeScript](https://www.typescriptlang.org/)
* **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
* **Iconografía**: [Lucide React](https://lucide.dev/)
* **Control de Versiones**: Git & GitHub

---

## 📁 Estructura del Proyecto

```text
maqui-rent-project-development/
├── app/
│   ├── admin/
│   │   └── page.tsx              # Panel Administrativo, CRM y Flota
│   ├── globals.css               # Estilos globales y tokens
│   ├── layout.tsx                # Layout principal, SEO y metadatos en español
│   └── page.tsx                  # Página principal pública
├── components/
│   ├── AboutSection.tsx          # Sección Sobre Nosotros y certificaciones
│   ├── Catalog.tsx               # Catálogo de maquinaria con filtros y búsqueda
│   ├── ContactSection.tsx        # Formulario con honeypot y radicado oficial
│   ├── CookieBanner.tsx          # Banner de consentimiento de cookies
│   ├── FAQSection.tsx            # Acordeón de preguntas frecuentes
│   ├── Footer.tsx                # Pie de página corporativo
│   ├── Hero.tsx                  # Banner principal de impacto
│   ├── MachineDetailModal.tsx    # Ficha técnica detallada
│   ├── Navbar.tsx                # Barra de navegación con accesos rápidos
│   ├── QuoteDrawer.tsx           # Bolsa flotante de cotización
│   ├── RentalCalculator.tsx      # Simulador interactivo de tarifas
│   ├── ServicesSection.tsx       # Módulo de servicios de mantenimiento
│   ├── TestimonialsSection.tsx   # Casos de éxito y testimonios
│   └── WhatsAppButton.tsx        # Botón flotante de contacto
├── lib/
│   ├── data/
│   │   └── machines.ts           # Base de datos centralizada de equipos y ciudades
│   ├── services/
│   │   └── quotesService.ts      # Servicio de persistencia y sincronización en tiempo real
│   └── utils/
│       ├── security.ts           # Funciones de sanitización y rate limiting
│       └── utils.ts              # Utilidades de clases (cn)
├── types/
│   ├── machine.ts                # Interfaces de maquinaria, cotización y ciudades
│   └── quote.ts                  # Tipos de solicitudes CRM y órdenes de taller
├── public/                       # Imágenes oficiales de maquinaria CAT y assets
├── next.config.mjs               # Configuración de Next.js y cabeceras de seguridad
├── package.json                  # Dependencias y scripts del proyecto
└── tsconfig.json                 # Configuración del compilador TypeScript
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
* [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada, testeado en v22)
* [npm](https://www.npmjs.com/) o [pnpm](https://pnpm.io/)

### Pasos

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/maqui-rent-colombia.git
   cd maqui-rent-colombia
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   * Portal Público: [http://localhost:3000](http://localhost:3000)
   * Portal Administrativo: [http://localhost:3000/admin](http://localhost:3000/admin)

5. **Construir para producción (opcional)**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔑 Credenciales de Demostración

Para ingresar al **Panel Administrativo** ([`/admin`](http://localhost:3000/admin)):

* **Correo**: `carlos.mendoza@maqui-rent.com.co`
* **Contraseña**: `admin123`
* **Acceso Rápido**: También puedes usar el botón de **"Ingresar como Asesor Demo (1 Clic)"** diseñado para la sustentación frente al evaluador.

---

## 👨‍💻 Autor y Proyecto Académico

* **Proyecto**: Trabajo Final de Introducción
* **Año**: 2026
* **Territorio**: Colombia
