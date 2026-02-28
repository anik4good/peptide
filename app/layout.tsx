import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PEPTIDE ANALYTICA | Bio-Data Vault v3.0',
  description: 'Research-Grade Peptide Reference Vault',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
