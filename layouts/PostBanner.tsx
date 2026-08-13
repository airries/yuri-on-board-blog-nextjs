import { ReactNode } from 'react'
import Image from '@/components/Image'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ArticleMeta from '@/components/ArticleMeta'
import TableOfContents from '@/components/TableOfContents'
import RelatedPosts from '@/components/RelatedPosts'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  relatedPosts?: CoreContent<Blog>[]
}

export default function PostMinimal({ content, next, prev, relatedPosts, children }: LayoutProps) {
  const { slug, title, images, toc } = content
  const displayImage = images && images.length > 0 ? images[0] : '/static/images/twitter-card.png'

  return (
    <SectionContainer>
      <ScrollTopAndComment url={`${siteMetadata.siteUrl}/blog/${slug}`} title={title} />
      <article>
        <header className="border-b border-paper-border pb-9 dark:border-gray-800">
          <Bleed>
            <div className="relative aspect-[2/1] w-full">
              <Image src={displayImage} alt={title} fill className="object-cover" />
            </div>
          </Bleed>
          <div className="pt-10 text-left">
            <PageTitle>{title}</PageTitle>
            <ArticleMeta {...content} />
            <TableOfContents toc={toc} variant="mobile" />
          </div>
        </header>

        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-x-14">
          <div className="min-w-0">
            <div className="prose max-w-none py-10 dark:prose-invert">{children}</div>
            <RelatedPosts posts={relatedPosts} />
            {siteMetadata.comments && (
              <div className="pt-8 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )}
            <footer className="mt-8 border-t border-paper-border dark:border-gray-800">
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev?.path && (
                  <div className="pt-6">
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next?.path && (
                  <div className="pt-6">
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
          <TableOfContents toc={toc} variant="desktop" />
        </div>
      </article>
    </SectionContainer>
  )
}
