import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const FOOTER_OVERRIDE_ENABLED = true

const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}

export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

  return (
    <footer className="border-t border-[#ececec] bg-[#f6f6f6] text-[#171717]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Top row: logo + nav links */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-bold text-[#171717] hover:text-[#ea004f]">
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-1 text-sm text-[#626262]">Independent Media Updates</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#424242]">
            <Link href="/press-releases" className="hover:text-[#ea004f]">Press Media</Link>
            <Link href="/about" className="hover:text-[#ea004f]">About</Link>
            <Link href="/contact" className="hover:text-[#ea004f]">Contact</Link>
            <Link href="/privacy" className="hover:text-[#ea004f]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#ea004f]">Terms</Link>
          </div>
        </div>

        {/* Categories row */}
        {categories.length > 0 && (
          <div className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9a9a9a]">Categories</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/press-releases?category=${category.slug}`}
                  className="rounded-full border border-[#e0e0e0] bg-white px-3 py-1 text-sm text-[#424242] transition hover:border-[#ea004f] hover:text-[#ea004f]"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom row: copyright */}
        <div className="mt-8 border-t border-[#ececec] pt-6 text-sm text-[#9a9a9a]">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
