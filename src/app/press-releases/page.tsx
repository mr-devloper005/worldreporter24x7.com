import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, Filter, Calendar, ArrowRight } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/press-releases',
    title: 'Press Media - Worldreporter 24 X 7',
    description: 'Latest press media and company announcements from Worldreporter 24 X 7. Stay updated with industry news and corporate communications.',
    keywords: ['press media', 'company announcements', 'news', 'media', 'corporate communications'],
  })
}

const categories = [
  'All Categories',
  'Business',
  'Technology',
  'Healthcare',
  'Finance',
  'Entertainment',
  'Sports',
  'Education',
  'Government',
  'Non-Profit',
]

const dateRanges = [
  'All Time',
  'Today',
  'This Week',
  'This Month',
  'This Quarter',
  'This Year',
]

export default async function PressReleasesPage() {
  const posts = await fetchTaskPosts('mediaDistribution', 12, { allowMockFallback: false, fresh: false, revalidate: 120 })
  
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Press Media',
      description: 'Latest press media and company announcements',
      url: `${SITE_CONFIG.baseUrl}/press-releases`,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#171717]">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      
      <main>
        {/* Hero Section */}
        <section className="bg-[#ea004f] text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Press Media
              </h1>
              <p className="mt-6 text-xl text-white/90">
                Stay updated with the latest company announcements and industry news
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="border-b border-[#ececec] bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9a9a9a]" />
                  <input
                    type="text"
                    placeholder="Search press media..."
                    className="w-full rounded-lg border border-[#d9d9d9] py-3 pl-12 pr-4 text-[#1c1c1c] placeholder-[#8a8a8a] focus:border-[#ea004f] focus:outline-none focus:ring-2 focus:ring-[#ea004f]/20"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 lg:flex-nowrap">
                {/* Category Filter */}
                <div className="relative">
                  <select className="appearance-none rounded-lg border border-[#d9d9d9] bg-white py-3 pl-10 pr-10 text-[#1c1c1c] focus:border-[#ea004f] focus:outline-none focus:ring-2 focus:ring-[#ea004f]/20">
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9a9a]" />
                </div>

                {/* Date Range Filter */}
                <div className="relative">
                  <select className="appearance-none rounded-lg border border-[#d9d9d9] bg-white py-3 pl-10 pr-10 text-[#1c1c1c] focus:border-[#ea004f] focus:outline-none focus:ring-2 focus:ring-[#ea004f]/20">
                    {dateRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9a9a]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Header */}
        <section className="bg-[#f6f6f6] py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#1c1c1c]">
                  Latest Press Media
                </h2>
                <p className="mt-1 text-[#5f5f5f]">
                  Showing {posts.length} recent press media
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#5f5f5f]">Sort by:</span>
                <select className="rounded-lg border border-[#d9d9d9] bg-white px-4 py-2 text-[#1c1c1c] focus:border-[#ea004f] focus:outline-none focus:ring-2 focus:ring-[#ea004f]/20">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <TaskPostCard
                    key={post.id}
                    post={post}
                    href={`/press-releases/${post.slug}`}
                    taskKey="mediaDistribution"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="mx-auto max-w-md">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#f2f2f2]">
                    <Search className="h-12 w-12 text-[#9a9a9a]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-[#1c1c1c]">
                    No press media found
                  </h3>
                  <p className="mb-6 text-[#5f5f5f]">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <button className="inline-flex items-center gap-2 rounded-full bg-[#ea004f] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#d00046]">
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Pagination */}
        {posts.length > 0 && (
          <section className="border-t border-[#ececec] bg-[#f6f6f6] py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-[#5f5f5f]">
                  Showing 1-{Math.min(posts.length, 12)} of {posts.length} results
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-lg border border-[#d4d4d4] bg-white px-4 py-2 text-[#5f5f5f] transition-colors hover:border-[#ea004f] hover:text-[#ea004f] disabled:cursor-not-allowed disabled:opacity-50"
                    disabled
                  >
                    Previous
                  </button>
                  <button
                    className="rounded-lg border border-[#d4d4d4] bg-white px-4 py-2 text-[#5f5f5f] transition-colors hover:border-[#ea004f] hover:text-[#ea004f] disabled:cursor-not-allowed disabled:opacity-50"
                    disabled
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-[#ea004f] py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Need Help with Your Press Media?
            </h2>
            <p className="mt-4 text-xl text-white/90">
              Our team of experts is here to help you get maximum exposure for your announcements
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-[#ea004f] transition-colors hover:bg-gray-100"
              >
                Contact Our Team
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#ea004f]"
              >
                View Pricing Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
