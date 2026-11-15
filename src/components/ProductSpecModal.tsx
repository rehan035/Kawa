import { MessageCircle, X } from 'lucide-react';
import { useEffect } from 'react';
import { WHATSAPP_EXPORT_NUMBER } from '../data/catalog';
import {
  buildWhatsAppInquiryUrl,
  formatProductWhatsAppMessage,
  formatUnitLabel,
  getMinimumOrderQty,
  type LeatherArticle,
  type PricingMode,
} from '../utils/tanneryLogic';
import { HideGaugeIndicator } from './HideGaugeIndicator';

interface ProductSpecModalProps {
  article: LeatherArticle | null;
  pricingMode: PricingMode;
  onClose: () => void;
  onAddToBag: (article: LeatherArticle) => void;
}

export function ProductSpecModal({
  article,
  pricingMode,
  onClose,
  onAddToBag,
}: ProductSpecModalProps) {
  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  const whatsappUrl = buildWhatsAppInquiryUrl(
    WHATSAPP_EXPORT_NUMBER,
    formatProductWhatsAppMessage(article, pricingMode)
  );
  const minQty = getMinimumOrderQty(article, pricingMode);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="spec-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1A17]/70 p-4"
      onClick={onClose}
    >
      <div
        className="hard-frame-shadow relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-[#1F1A17] bg-[#FDFBF7]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#1F1A17] bg-[#EBE3D7] px-5 py-3.5">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-[#1F1A17]">
            <span className="tabular-nums text-[#703816]">{article.sku}</span>
            <span aria-hidden="true">/</span>
            <span>Technical Spec Sheet</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close specification sheet"
            className="flex h-8 w-8 items-center justify-center border border-[#1F1A17] bg-[#FDFBF7] text-[#1F1A17] hover:bg-[#1F1A17] hover:text-[#FDFBF7] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="border-b border-[#D8CEBF] bg-[#EBE3D7] md:col-span-5 md:border-r md:border-b-0">
            <img
              src={article.image}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between p-6 md:col-span-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#703816]">
                {article.status} <span aria-hidden="true">·</span> {article.portOfOrigin}
              </p>
              <h2
                id="spec-modal-title"
                className="mt-1 font-serif text-3xl font-semibold text-[#1F1A17]"
              >
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#544840]">
                {article.description}
              </p>

              <div className="mt-4">
                <HideGaugeIndicator
                  thicknessLabel={article.thicknessLabel}
                  thicknessMm={article.thicknessMm}
                />
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#D8CEBF] pt-4 text-sm">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#544840]">
                    Hide Type
                  </dt>
                  <dd className="font-medium text-[#1F1A17]">{article.leatherType}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#544840]">
                    Tanning Method
                  </dt>
                  <dd className="font-medium text-[#1F1A17]">{article.tanningMethod}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#544840]">
                    Temper
                  </dt>
                  <dd className="font-medium text-[#1F1A17]">{article.temper}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#544840]">
                    Hardware / Trim
                  </dt>
                  <dd className="font-medium text-[#1F1A17]">{article.hardware}</dd>
                </div>
              </dl>

              <div className="mt-5 border border-[#D8CEBF] bg-[#F5F0EB] p-3.5">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#544840]">
                  Factory Pricing Schedule (USD)
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-[#544840]">Outlet (1+)</div>
                    <div className="tabular-nums text-base font-bold text-[#1F1A17]">
                      ${article.outletPriceUsd}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#544840]">B2B ({article.moq}+)</div>
                    <div className="tabular-nums text-base font-bold text-[#703816]">
                      ${article.b2bTier1Usd}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#544840]">Volume ({article.moq * 4}+)</div>
                    <div className="tabular-nums text-base font-bold text-[#1F1A17]">
                      ${article.b2bTier2Usd}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  onAddToBag(article);
                  onClose();
                }}
                className="mechanical-hover flex-1 border border-[#703816] bg-[#703816] px-4 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#FDFBF7] hover:border-[#1F1A17] hover:bg-[#1F1A17] whitespace-nowrap cursor-pointer"
              >
                Add {minQty} {formatUnitLabel(article.unitLabel, minQty)} to Bag
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#1F1A17] bg-[#FDFBF7] px-4 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#1F1A17] transition-colors hover:bg-[#1F1A17] hover:text-[#FDFBF7] whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 text-[#703816]" aria-hidden="true" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
