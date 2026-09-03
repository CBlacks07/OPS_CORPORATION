import type { Metadata } from 'next'
import { IBM_Plex_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap'
})

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'OPS CORPORATION — Lomé, Togo',
  description: "Infrastructure, sécurité, applications web & mobiles sur mesure. OPS CORPORATION accompagne entreprises, écoles, cliniques et institutions à Lomé, Togo.",
  icons: {
    icon: '/ops-logo.png',
    apple: '/ops-logo.png',
  },
  openGraph: {
    title: 'OPS CORPORATION — Lomé, Togo',
    description: 'Infra · Sécurité · Applications web & mobiles',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPS CORPORATION — Lomé, Togo',
    description: 'Infra · Sécurité · Applications web & mobiles'
  }
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning className={`${plex.variable} ${space.variable}`}>
      <body className="min-h-screen bg-white text-slate-900">{children}</body>
    </html>
  )
}