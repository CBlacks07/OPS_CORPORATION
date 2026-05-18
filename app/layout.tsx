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
  title: 'OPS CORPORATION - Portfolio',
  description: 'OPS CORPORATION — Infra, Sécurité, Applications web sur mesure.',
  openGraph: {
    title: 'OPS CORPORATION - Portfolio',
    description: 'Infra - Sécurité - Applications web',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPS CORPORATION - Portfolio',
    description: 'Infra - Sécurité - Applications web'
  }
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning className={`${plex.variable} ${space.variable}`}>
      <body className="min-h-screen bg-[#0B1220] text-slate-100">{children}</body>
    </html>
  )
}