import { useState } from 'react';
import {
  formatUnitLabel,
  getEffectiveUnitPrice,
  getMinimumOrderQty,
  type LeatherArticle,
  type PricingMode,
} from '../utils/tanneryLogic';
import { HideGaugeIndicator } from './HideGaugeIndicator';

interface ProductCardProps {
  article: LeatherArticle;
  pricingMode: PricingMode;
  onInspect: (article: LeatherArticle) => void;
  onAddToBag: (article: LeatherArticle) => void;
}

export function ProductCard({
  article,
  pricingMode,
  onInspect,
  onAddToBag,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const minQty = getMinimumOrderQty(article, pricingMode);
  const { unitPrice, tierLabel } = getEffectiveUnitPrice(article, pricingMode, minQty);

  return (
    <article className="flex flex-col border border-[#D8CEBF] bg-[#FDFBF7]">
      <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-[#D8CEBF] bg-[#EBE3D7]">
        {!imgError && article.image ? (
          <img
            src={article.image}
            alt={article.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#EBE3D7] p-6 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#703816]">
              {article.sku}
            </span>
            <span className="mt-2 font-serif text-xl font-semibold text-[#1F1A17]">
              {article.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[#544840]">
            <span className="tabular-nums font-bold uppercase tracking-[0.08em] text-[#703816]">
              {article.sku}
            </span>
            <span className="uppercase tracking-[0.06em]">{article.status}</span>
          </div>

          <h3 className="mt-1.5 font-serif text-[22px] font-semibold leading-tight text-[#1F1A17]">
            {article.title}
          </h3>

          <p className="mt-1 text-sm text-[#544840]">
            {article.leatherType} <span aria-hidden="true">·</span> {article.temper}
          </p>

          <div className="mt-4">
            <HideGaugeIndicator
              thicknessLabel={article.thicknessLabel}
              thicknessMm={article.thicknessMm}
            />
          </div>
        </div>

        <div className="mt-5 border-t border-[#1F1A17] pt-4">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#544840]">
                {tierLabel}
              </div>
              <div className="tabular-nums mt-0.5 text-xl font-bold text-[#1F1A17]">
                ${unitPrice}{' '}
                <span className="text-xs font-normal text-[#544840]">
                  / {article.unitLabel === 'pcs' ? 'unit' : formatUnitLabel(article.unitLabel, 1)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#544840]">
                Min Qty
              </div>
              <div className="tabular-nums mt-0.5 text-sm font-semibold text-[#1F1A17]">
                {minQty} {formatUnitLabel(article.unitLabel, minQty)}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onInspect(article)}
              className="border border-[#1F1A17] bg-[#FDFBF7] px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.06em] text-[#1F1A17] transition-colors hover:bg-[#1F1A17] hover:text-[#FDFBF7] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#703816]"
            >
              Inspect Specs
            </button>
            <button
              type="button"
              onClick={() => onAddToBag(article)}
              className="mechanical-hover border border-[#703816] bg-[#703816] px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.06em] text-[#FDFBF7] hover:border-[#1F1A17] hover:bg-[#1F1A17] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1F1A17]"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
