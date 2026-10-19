import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maqui-Rent Colombia | Alquiler de Maquinaria Pesada CAT®',
  description: 'Alquiler y venta de maquinaria pesada Caterpillar en Colombia: excavadoras, cargadores frontales, volquetas articuladas y rodillos compactadores con operador certificado y asistencia técnica 24/7 en obra.',
  keywords: [
    'alquiler maquinaria pesada colombia',
    'renta de excavadoras cat 320',
    'alquiler volquetas articuladas cat 745',
    'cargador de ruedas cat 950',
    'maquinaria para vias 4g',
    'maqui-rent colombia'
  ],
  authors: [{ name: 'Maqui-Rent Colombia S.A.S.' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Maqui-Rent Colombia | Alquiler de Maquinaria Pesada CAT®',
    description: 'Soluciones integrales de maquinaria pesada para infraestructura, minería y construcción civil en Colombia.',
    type: 'website',
    locale: 'es_CO',
  }
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#141719' },
    { media: '(prefers-color-scheme: dark)', color: '#141719' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased bg-[#f4f5f6] text-[#141719] font-sans selection:bg-[#f6c400] selection:text-[#141719]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
