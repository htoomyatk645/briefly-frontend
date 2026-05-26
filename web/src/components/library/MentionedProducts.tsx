import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSavedClipsContext } from './SavedClipsContext'
import { LibrarySection } from './LibrarySection'
import { LibrarySectionReveal } from './LibrarySectionReveal'
import { MentionPreview } from './MentionPreview'
import ProductCard from './ProductCard'
import { ProductDetailSheet } from './ProductDetailSheet'
import { IconCart } from './icons'
import {
  MENTIONED_PRODUCTS,
  PRODUCTS_RAIL_LIMIT,
  type MentionedProduct,
} from './libraryProductsData'
import { MentionPreviewAudioEngine } from './mentionPreviewAudio'
import { SkeletonShimmer } from './SkeletonShimmer'
import './mentionedProducts.css'

export type MentionedProductsProps = {
  layout?: 'rail' | 'grid'
  showSectionHead?: boolean
}

export default function MentionedProducts({
  layout = 'rail',
  showSectionHead = true,
}: MentionedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef(new MentionPreviewAudioEngine())
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const { playMoment } = useSavedClipsContext()

  const [isLoading, setIsLoading] = useState(true)
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null)
  const [previewPlayback, setPreviewPlayback] = useState<
    Awaited<ReturnType<MentionPreviewAudioEngine['play']>> | null
  >(null)
  const [detailProduct, setDetailProduct] = useState<MentionedProduct | null>(null)

  const products = MENTIONED_PRODUCTS
  const railProducts = products.slice(0, PRODUCTS_RAIL_LIMIT)
  const isEmpty = !isLoading && products.length === 0
  const listProducts = layout === 'rail' ? railProducts : products
  const activeProduct = products.find((p) => p.id === activePreviewId)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    return () => {
      audioRef.current.dispose()
    }
  }, [])

  const closePreview = useCallback(async () => {
    await audioRef.current.stop()
    setActivePreviewId(null)
    setPreviewPlayback(null)
  }, [])

  useEffect(() => {
    if (!activePreviewId) return

    const handleScroll = () => {
      void closePreview()
    }

    const rail = scrollRef.current
    rail?.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      rail?.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activePreviewId, closePreview])

  const handleHearMention = useCallback(
    async (product: MentionedProduct) => {
      if (activePreviewId === product.id) {
        await closePreview()
        return
      }

      await closePreview()
      const playback = await audioRef.current.play(
        product.id,
        product.episodeId,
        product.mentionOffsetSeconds,
      )
      setActivePreviewId(product.id)
      setPreviewPlayback(playback)
    },
    [activePreviewId, closePreview],
  )

  const handleOpenClip = useCallback(() => {
    if (!activeProduct) return
    void closePreview()
    playMoment({
      episodeId: activeProduct.episodeId,
      seekSeconds: Math.max(0, activeProduct.mentionOffsetSeconds - 4),
    })
  }, [activeProduct, closePreview, playMoment])

  const content = isLoading ? (
    <div
      className={`products-rail products-rail--loading${layout === 'grid' ? ' products-grid--loading' : ''}`}
      role="presentation"
    >
      {Array.from({ length: layout === 'rail' ? 4 : 6 }, (_, index) => (
        <SkeletonShimmer key={index} className="product-card__skeleton" />
      ))}
    </div>
  ) : isEmpty ? (
    <div className="products-empty" role="status">
      <IconCart />
      <p className="products-empty__title">
        Products mentioned in your listened clips will collect here.
      </p>
      <p className="products-empty__caption">Listen to a few clips first.</p>
    </div>
  ) : (
    <div
      ref={scrollRef}
      className={layout === 'rail' ? 'products-rail library-rail' : 'products-grid'}
      role="list"
      aria-label="Products mentioned in clips"
    >
      {listProducts.map((product) => (
        <div
          key={product.id}
          role="listitem"
          className={layout === 'rail' ? 'products-rail__item' : 'products-grid__item'}
          ref={(node) => {
            if (node) cardRefs.current.set(product.id, node)
            else cardRefs.current.delete(product.id)
          }}
        >
          <ProductCard
            product={product}
            isPreviewOpen={activePreviewId === product.id}
            onOpenDetail={setDetailProduct}
            onHearMention={handleHearMention}
          />
          <AnimatePresence>
            {activePreviewId === product.id && previewPlayback ? (
              <div className="mention-preview-wrap">
                <MentionPreview
                  mentionLabel={product.title}
                  hostName={product.hostName}
                  episodeTitle={product.episodeTitle}
                  playback={previewPlayback}
                  onClose={() => void closePreview()}
                  onOpenClip={handleOpenClip}
                />
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )

  const section = (
    <>
      {content}
      <ProductDetailSheet
        product={detailProduct}
        open={detailProduct != null}
        onClose={() => setDetailProduct(null)}
      />
    </>
  )

  if (!showSectionHead) {
    return <div className="mentioned-products mentioned-products--embedded">{section}</div>
  }

  return (
    <LibrarySectionReveal>
      <LibrarySection
        id="shop-the-show"
        title="Shop the show"
        subtitle="Things mentioned in clips you've listened to."
        seeAllHref={products.length > 0 ? '/library/shop' : undefined}
      >
        {section}
      </LibrarySection>
    </LibrarySectionReveal>
  )
}
