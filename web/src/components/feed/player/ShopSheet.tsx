import type { EpisodeProduct } from './playerMocks'
import { BottomSheet } from './BottomSheet'

type ShopSheetProps = {
  open: boolean
  products: EpisodeProduct[]
  onClose: () => void
}

export const ShopSheet = ({ open, products, onClose }: ShopSheetProps) => (
  <BottomSheet open={open} title="Mentioned in this episode" onClose={onClose}>
    {products.length === 0 ? (
      <p className="player-sheet__empty">No products were detected in this episode.</p>
    ) : (
      <ul className="player-shop-list">
        {products.map((p) => (
          <li key={p.id}>
            <a
              href={p.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="player-shop-item"
            >
              <span className="player-shop-item__thumb" aria-hidden />
              <span className="player-shop-item__text">
                <span className="player-shop-item__name">{p.name}</span>
                <span className="player-shop-item__desc">{p.description}</span>
              </span>
              <span className="player-shop-item__cta">View</span>
            </a>
          </li>
        ))}
      </ul>
    )}
  </BottomSheet>
)
