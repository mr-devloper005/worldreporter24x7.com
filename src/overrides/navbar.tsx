'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const topBarFeatures = [
  'Global Distribution',
  'Real Media Reach',
  '24/7 Submission',
]

const navLinks = [
  { label: 'Latest News', href: '/press-releases' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top utility bar */}
      <div className="bg-[#c8003a] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
            {SITE_CONFIG.domain}
          </span>
          <div className="hidden items-center gap-6 sm:flex">
            {topBarFeatures.map((feature) => (
              <span key={feature} className="text-[11px] font-medium text-white/80">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-[#1a0010] text-white shadow-lg">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo + site name */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <span className="block text-[15px] font-bold leading-tight text-white">
                {SITE_CONFIG.name}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50">
                Independent Media Updates
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'rounded px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right side: search + CTA */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Link>

            <Link
              href="/login"
              className="hidden rounded-full bg-[#e8620a] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#cf5509] sm:inline-flex"
            >
              Submit Release
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#1a0010] lg:hidden">
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/8 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-full bg-[#e8620a] px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#cf5509]"
                >
                  Submit Release
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
