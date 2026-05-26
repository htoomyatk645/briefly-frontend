import type { MouseEvent } from 'react'
import { IconPlay } from './icons'
import type { MentionedProduct } from './libraryProductsData'

export type ProductCardProps = {
  product: MentionedProduct
  isPreviewOpen?: boolean
  onOpenDetail: (product: MentionedProduct) => void
  onHearMention: (product: MentionedProduct) => void
}

export default function ProductCard({
  product,
  isPreviewOpen = false,
  onOpenDetail,
  onHearMention,
}: ProductCardProps) {
  const handleBodyClick = () => {
    onOpenDetail(product)
  }

  const handlePlayClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onHearMention(product)
  }

  return (
    <article className={`product-card${isPreviewOpen ? ' product-card--preview-open' : ''}`}>
      <button
        type="button"
        className="product-card__body-hit"
        onClick={handleBodyClick}
        aria-label={`View ${product.title} by ${product.brand}`}
      >
        <div className="product-card__image-wrap">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt="" className="product-card__image" />
          ) : (
            <div className="product-card__image product-card__image--placeholder" aria-hidden />
          )}
        </div>

        <div className="product-card__copy">
          <h3 className="product-card__title">{product.title}</h3>
          <div className="product-card__meta-row">
            <span className="product-card__brand">{product.brand}</span>
            <span className="product-card__price">{product.price}</span>
          </div>
        </div>
      </button>

      <div className="product-card__footer">
        <img
          src={product.hostAvatarSrc}
          alt=""
          className="product-card__avatar"
          width={24}
          height={24}
        />
        <span className="product-card__mention-label">
          Mentioned by {product.hostFirstName}
        </span>
        <button
          type="button"
          className="product-card__play"
          onClick={handlePlayClick}
          aria-label="Hear it mentioned"
          aria-expanded={isPreviewOpen}
        >
          <IconPlay />
        </button>
      </div>
    </article>
  )
}
