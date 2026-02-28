import type { Metadata } from 'next'
import './v1.css'

export const metadata: Metadata = {
  title: 'PEPTIDE ANALYTICA v1 | Clinical Journal Edition',
  description: 'Research-Grade Peptide Reference Vault - Clinical Journal Design',
}

export default function V1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
