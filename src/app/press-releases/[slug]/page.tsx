import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPostBySlug } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'
import { notFound } from 'next/navigation'

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  
  if (!post) {
    return {
      title: 'Press Media Not Found',
      description: 'The requested press media could not be found.',
    }
  }

  return buildPageMetadata({
    path: `/press-releases/${slug}`,
    title: post.title,
    description: post.summary || `Read the latest press media from ${SITE_CONFIG.name}`,
    openGraphTitle: post.title,
    openGraphDescription: post.summary,
    image: post.media?.[0]?.url || '/og-default.png',
    keywords: ['press media', 'announcement', 'news', ...(post.tags || [])],
  })
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const relatedPosts: SitePost[] = [
  {
    id: '1',
    title: 'Q4 Financial Results Show Strong Growth',
    summary: 'Company reports record revenue and expansion into new markets with positive outlook for 2024.',
    slug: 'q4-financial-results',
    publishedAt: new Date('2024-01-15').toISOString(),
    media: [{ url: '/placeholder.jpg?height=400&width=600' }],
    tags: ['Finance', 'Earnings'],
    content: {},
  },
  {
    id: '2',
    title: 'New Partnership Announced with Tech Leader',
    summary: 'Strategic collaboration aims to accelerate innovation and deliver enhanced solutions to global customers.',
    slug: 'tech-partnership',
    publishedAt: new Date('2024-01-10').toISOString(),
    media: [{ url: '/placeholder.jpg?height=400&width=600' }],
    tags: ['Partnership', 'Technology'],
    content: {},
  },
  {
    id: '3',
    title: 'Sustainability Initiative Receives Industry Recognition',
    summary: 'Environmental program honored for outstanding contribution to corporate responsibility and green practices.',
    slug: 'sustainability-award',
    publishedAt: new Date('2024-01-05').toISOString(),
    media: [{ url: '/placeholder.jpg?height=400&width=600' }],
    tags: ['Sustainability', 'Awards'],
    content: {},
  },
]

export default async function PressReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  
  if (!post) {
    notFound()
  }

  const publishDate = new Date(post.publishedAt || post.createdAt || Date.now())
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  const authorName = (content as any).author || 'Worldreporter 24 X 7'
  const featuredImage = (post.media?.[0]?.url as string) || '/placeholder.jpg?height=600&width=1200'

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: post.title,
      description: post.summary,
      image: featuredImage,
      datePublished: publishDate.toISOString(),
      author: {
        '@type': 'Organization',
        name: authorName,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        logo: `${SITE_CONFIG.baseUrl}/logo.png`,
      },
      url: `${SITE_CONFIG.baseUrl}/press-releases/${post.slug}`,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#171717]">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      
      <main>
        {/* Breadcrumb */}
        <section className="border-b border-[#ececec] bg-white py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-[#5f5f5f] transition-colors hover:text-[#ea004f]">
                Home
              </Link>
              <span className="text-[#b5b5b5]">/</span>
              <Link href="/press-releases" className="text-[#5f5f5f] transition-colors hover:text-[#ea004f]">
                Press Media
              </Link>
              <span className="text-[#b5b5b5]">/</span>
              <span className="font-medium text-[#1c1c1c]">{post.title}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <article className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8">
              <Link
                href="/press-releases"
                className="inline-flex items-center gap-2 text-[#5f5f5f] transition-colors hover:text-[#ea004f]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Press Media
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,2.15fr)_minmax(280px,0.85fr)] xl:gap-10">
              {/* Main Content */}
              <div className="space-y-8">
                {/* Title and Meta */}
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-[#1c1c1c] sm:text-4xl lg:text-5xl">
                    {post.title}
                  </h1>
                  
                  <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-[#5f5f5f]">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{authorName}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#ea004f]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ea004f]">
                        Press Media
                      </span>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                {featuredImage && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                    <ContentImage
                      src={featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      intrinsicWidth={1200}
                      intrinsicHeight={675}
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {post.summary && (
                    <div className="rounded-xl bg-[#f6f6f6] p-6 text-lg leading-relaxed text-[#5f5f5f]">
                      {post.summary}
                    </div>
                  )}
                  
                  {post.content && typeof post.content === 'object' && (post.content as any).body ? (
                    <div 
                      className="article-content leading-relaxed text-[#303030]"
                      dangerouslySetInnerHTML={{ __html: (post.content as any).body }}
                    />
                  ) : (
                    <div className="leading-relaxed text-[#303030]">
                      <p>
                        This is a press media from {authorName}. For more information about this announcement, 
                        please contact our media relations team or visit our website for additional details.
                      </p>
                      <p className="mt-4">
                        {post.summary || 'Stay tuned for more updates and developments from our organization.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Social Share */}
                <div className="border-t border-[#ececec] pt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-[#1c1c1c]">Share this Press Media</h3>
                      <div className="flex gap-3">
                        <Link
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_CONFIG.baseUrl}/press-releases/${post.slug}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700"
                        >
                          <Facebook className="h-5 w-5" />
                        </Link>
                        <Link
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${SITE_CONFIG.baseUrl}/press-releases/${post.slug}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-sky-500 p-3 text-white transition-colors hover:bg-sky-600"
                        >
                          <Twitter className="h-5 w-5" />
                        </Link>
                        <Link
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_CONFIG.baseUrl}/press-releases/${post.slug}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-blue-700 p-3 text-white transition-colors hover:bg-blue-800"
                        >
                          <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link
                          href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${SITE_CONFIG.baseUrl}/press-releases/${post.slug}`)}`}
                          className="rounded-lg bg-gray-600 p-3 text-white transition-colors hover:bg-gray-700"
                        >
                          <Mail className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#f2f2f2] px-4 py-2 text-sm font-medium text-[#5f5f5f]">
                        <Share2 className="h-4 w-4" />
                        Share
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Quick Actions */}
                <div className="rounded-xl border border-[#ececec] bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-[#1c1c1c]">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="flex items-center justify-between rounded-lg bg-[#ea004f] p-3 text-white transition-colors hover:bg-[#d00046]"
                    >
                      <span className="font-medium">Contact Media Relations</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center justify-between rounded-lg border border-[#d4d4d4] bg-white p-3 text-[#1c1c1c] transition-colors hover:border-[#ea004f] hover:text-[#ea004f]"
                    >
                      <span className="font-medium">Submit a Press Media</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Categories */}
                {post.tags && post.tags.length > 0 && (
                  <div className="rounded-xl border border-[#ececec] bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-[#1c1c1c]">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="rounded-full bg-[#f2f2f2] px-3 py-1 text-sm font-medium text-[#5f5f5f]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Download */}
                <div className="rounded-xl border border-[#ececec] bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-[#1c1c1c]">Download</h3>
                  <div className="space-y-3">
                    <button className="w-full rounded-lg border border-[#d4d4d4] bg-white p-3 text-[#1c1c1c] transition-colors hover:border-[#ea004f] hover:text-[#ea004f]">
                      Download PDF Version
                    </button>
                    <button className="w-full rounded-lg border border-[#d4d4d4] bg-white p-3 text-[#1c1c1c] transition-colors hover:border-[#ea004f] hover:text-[#ea004f]">
                      Download Images
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* Related Press Releases */}
        <section className="bg-[#f6f6f6] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1c1c1c]">More Press Media</h2>
              <p className="mt-2 text-lg text-[#5f5f5f]">
                Stay updated with more company announcements and industry news
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <TaskPostCard
                  key={relatedPost.id}
                  post={relatedPost}
                  href={`/press-releases/${relatedPost.slug}`}
                  taskKey="mediaDistribution"
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link
                href="/press-releases"
                className="inline-flex items-center gap-2 rounded-full bg-[#ea004f] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#d00046]"
              >
                View All Press Media
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
