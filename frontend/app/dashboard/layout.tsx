'use client'

import { Navbar } from '@/components/layout/navbar'
import { useActivityTracker } from '@/hooks/useActivityTracker'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useActivityTracker()

  return (
    <div className="min-h-screen bg-[#09090b]">
      <div className="relative z-50">
        <Navbar />
      </div>
      <main className="relative z-10">{children}</main>
    </div>
  )
}
