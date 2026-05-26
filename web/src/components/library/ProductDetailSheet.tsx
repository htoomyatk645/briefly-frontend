import { BottomSheet } from '../feed/player/BottomSheet'
import { useBodyScrollLock } from '../feed/player/BottomSheet'
import type { MentionedProduct } from './libraryProductsData'

export type ProductDetailSheetProps = {
  product: MentionedProduct | null
  open: boolean
  onClose: () => void
}

export function ProductDetailSheet({ product, open, onClose }: ProductDetailSheetProps) {
  useBodyScrollLock(open)

  return (
    <BottomSheet open={open} title={product?.title ?? 'Product'} onClose={onClose}>
      {product ? (
        <div className="product-detail-sheet">
          <div className="product-detail-sheet__media">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt="" className="product-detail-sheet__image" />
            ) : (
              <div className="product-detail-sheet__image product-detail-sheet__image--placeholder" />
            )}
          </div>

          <p className="product-detail-sheet__brand">{product.brand}</p>
          <p className="product-detail-sheet__price">{product.price}</p>

          <blockquote className="product-detail-sheet__context">
            {product.contextSentence}
          </blockquote>

          <p className="product-detail-sheet__meta">
            Mentioned on <strong>{product.showName}</strong> — {product.episodeTitle}
          </p>

          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="product-detail-sheet__cta"
          >
            View product
          </a>
        </div>
      ) : null}
    </BottomSheet>
  )
}
