import type { Metadata } from 'next'
import Link from 'next/link'
import { Send, ArrowRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/contact',
    title: 'Contact Us - Worldreporter 24 X 7',
    description: 'Get in touch with Worldreporter 24 X 7 media relations team. Contact us for press inquiries, partnerships, and media opportunities.',
    keywords: ['contact', 'media relations', 'press inquiries', 'partnerships', 'customer support'],
  })
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />

      <main>
        {/* Hero Section */}
        <section className="bg-[#ea004f] text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Get in Touch
              </h1>
              <p className="mt-6 text-xl text-white/90">
                Connect with our team for media inquiries, partnerships, and press opportunities
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-[#ececec] bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-[#1c1c1c]">Send us a Message</h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#4d4d4d]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-[#d9d9d9] px-4 py-3 text-[#1c1c1c] placeholder-[#8a8a8a] focus:border-[#ea004f] focus:outline-none focus:ring-2 focus:ring-[#ea004f]/20"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#4d4d4d]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-[#d9d9d9] px-4 py-3 text-[#1c1c1c] placeholder-[#8a8a8a] focus:border-[#ea004f] focus:outline-none focus:ring-2 focus:ring-[#ea004f]/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[#4d4d4d]">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full rounded-lg border border-[#d9d9d9] px-4 py-3 text-[#1c1c1c] placeholder-[#8a8a8a] focus:border-[#ea004f] focus:outline-none focus:ring-2 focus:ring-[#ea004f]/20"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#4d4d4d]">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full rounded-lg border border-[#d9d9d9] px-4 py-3 text-[#1c1c1c] placeholder-[#8a8a8a] focus:border-[#ea004f] focus:outline-none focus:ring-2 focus:ring-[#ea004f]/20"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#ea004f] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#d00046]"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                  <span className="text-sm text-[#5f5f5f]">We'll respond within 24 hours</span>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#f6f6f6] py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-[#1c1c1c]">
              Ready to Share Your Story?
            </h2>
            <p className="mb-8 text-xl text-[#5f5f5f]">
              Join thousands of organizations who trust us with their press media distribution
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/press-releases"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#d4d4d4] bg-white px-8 py-3 font-semibold text-[#1c1c1c] transition-colors hover:border-[#ea004f] hover:text-[#ea004f]"
              >
                Browse Press Media
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
