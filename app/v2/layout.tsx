import type { Metadata } from 'next'
import './v2.css'

export const metadata: Metadata = {
  title: 'PEPTIDE ANALYTICA v3.0 | Clinical Edition',
  description: 'Research-Grade Peptide Reference Vault - Stripe-Inspired SaaS Design',
}

export default function V2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
