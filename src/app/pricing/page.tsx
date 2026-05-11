import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight, Globe2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Pricing Plans - Worldreporter 24 X 7',
    description: 'Choose the perfect pricing plan for your press media distribution needs. Basic, Pro, and Premium options available.',
    keywords: ['pricing', 'press media', 'media distribution', 'basic plan', 'pro plan', 'premium plan'],
  })
}

const pricingPlans = [
  {
    name: 'Basic',
    price: '$199',
    period: 'per release',
    description: 'Perfect for small businesses and occasional announcements',
    features: [
      'Single press media distribution',
      'Basic media outlet coverage',
      'Standard SEO optimization',
      'Email support',
      '7-day distribution window',
    ],
    highlighted: false,
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$475',
    period: 'per release',
    description: 'Ideal for growing companies with regular announcements',
    features: [
      'Everything in Basic',
      'Extended media outlet coverage',
      'Premium SEO optimization',
      'Social media promotion',
      'Priority email support',
      '14-day distribution window',
      'Analytics dashboard',
      'Media monitoring alerts',
    ],
    highlighted: true,
    cta: 'Most Popular',
  },
  {
    name: 'Premium',
    price: '$899',
    period: 'per release',
    description: 'Complete solution for enterprises and high-volume campaigns',
    features: [
      'Everything in Pro',
      'Maximum media outlet coverage',
      'White-glove service',
      'Dedicated account manager',
      'Phone support',
      '30-day distribution window',
      'Advanced analytics',
      'Custom targeting options',
      'Guaranteed placement options',
    ],
    highlighted: false,
    cta: 'Contact Sales',
  },
]

const addOns = [
  {
    name: 'Express Distribution',
    price: '$150',
    description: 'Get your press media distributed within 24 hours',
  },
  {
    name: 'Translation Services',
    price: '$250',
    description: 'Professional translation to 5 languages',
  },
  {
    name: 'Video Production',
    price: '$500',
    description: 'Professional video content creation',
  },
]

const faqs = [
  {
    question: 'What is included in the distribution?',
    answer: 'Our distribution includes major news outlets, industry-specific publications, and online media platforms. The coverage varies by plan, with Premium offering the widest reach.',
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.',
  },
  {
    question: 'Do you offer refunds?',
    answer: "We offer a 30-day money-back guarantee for new customers. If you're not satisfied with our service, we'll provide a full refund.",
  },
  {
    question: 'How quickly will my press media be distributed?',
    answer: 'Standard distribution takes 3-5 business days. Express distribution is available as an add-on for 24-hour delivery.',
  },
  {
    question: 'Can I target specific industries or regions?',
    answer: 'Yes, Premium plan includes advanced targeting options for specific industries, geographic regions, and audience demographics.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#171717]">
      <NavbarShell />

      <main>
        {/* Hero Section — matches homepage #ea004f brand */}
        <section className="bg-[#ea004f] text-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                <Globe2 className="h-3.5 w-3.5" />
                Press wire distribution
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-6 text-lg text-white/85 sm:text-xl">
                Choose the perfect plan for your press media distribution needs
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border-2 p-8 transition-all duration-300 ${
                    plan.highlighted
                      ? 'scale-105 border-[#ea004f] bg-[#fff5f8] shadow-2xl'
                      : 'border-[#ececec] bg-white shadow-sm'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#ea004f] px-4 py-1 text-sm font-semibold text-white">
                        {plan.cta}
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#171717]">{plan.name}</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-[#171717]">{plan.price}</span>
                      <span className="text-[#626262]">/{plan.period}</span>
                    </div>
                    <p className="mt-4 text-[#626262]">{plan.description}</p>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 flex-shrink-0 text-[#ea004f]" />
                        <span className="text-[#424242]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      href={plan.name === 'Premium' ? '/contact' : '/signup'}
                      className={`block w-full rounded-full px-6 py-3 text-center font-semibold transition-colors ${
                        plan.highlighted
                          ? 'bg-[#ea004f] text-white hover:bg-[#c8003a]'
                          : 'border-2 border-[#ececec] text-[#171717] hover:border-[#ea004f] hover:text-[#ea004f]'
                      }`}
                    >
                      {plan.name === 'Premium' ? 'Contact Sales' : 'Get Started'}
                      <ArrowRight className="ml-2 inline-block h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="border-y border-[#ececec] bg-[#f3f3f3] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#171717]">Enhance Your Distribution</h2>
              <p className="mt-4 text-lg text-[#626262]">
                Add these services to any plan for maximum impact
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {addOns.map((addOn, index) => (
                <div key={index} className="rounded-xl border border-[#ececec] bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#171717]">{addOn.name}</h3>
                  <p className="mt-2 text-2xl font-bold text-[#ea004f]">{addOn.price}</p>
                  <p className="mt-2 text-[#626262]">{addOn.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#171717]">Frequently Asked Questions</h2>
              <p className="mt-4 text-lg text-[#626262]">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="mt-12 space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-xl border border-[#ececec] bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#171717]">{faq.question}</h3>
                  <p className="mt-3 text-[#626262]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section — matches homepage bottom CTA band */}
        <section className="bg-[#ea004f] py-10 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              Ready to Amplify Your Message?
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#121212] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                Start a release
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Talk to Expert
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
