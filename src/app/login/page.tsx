import Link from 'next/link'
import { Globe2, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#171717]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">

          {/* Left panel */}
          <div className="rounded-[2rem] bg-[#ea004f] p-8 text-white">
            <Globe2 className="h-8 w-8 text-white/80" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">
              Sign in to your account
            </h1>
            <p className="mt-5 text-sm leading-8 text-white/80">
              Submit press media, track distribution, and manage your media presence on {SITE_CONFIG.name}.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                'Global press media distribution',
                'Real-time media reach tracking',
                '24/7 submission support',
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/20 bg-white/10 px-4 py-4 text-sm text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel — form */}
          <div className="rounded-[2rem] border border-[#ececec] bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#626262]">Welcome back</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#171717]">Sign in</h2>
            <form className="mt-6 grid gap-4">
              <input
                className="h-12 rounded-xl border border-[#ececec] bg-[#f6f6f6] px-4 text-sm text-[#171717] placeholder:text-[#9a9a9a] focus:border-[#ea004f] focus:outline-none"
                placeholder="Email address"
                type="email"
              />
              <input
                className="h-12 rounded-xl border border-[#ececec] bg-[#f6f6f6] px-4 text-sm text-[#171717] placeholder:text-[#9a9a9a] focus:border-[#ea004f] focus:outline-none"
                placeholder="Password"
                type="password"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#ea004f] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#c8003a]"
              >
                Sign in
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between text-sm text-[#626262]">
              <Link href="/forgot-password" className="hover:text-[#ea004f] hover:underline">
                Forgot password?
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#ea004f] hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  )
}
