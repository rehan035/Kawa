import { MessageCircle, Minus, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { WHATSAPP_EXPORT_NUMBER } from '../data/catalog';
import {
  buildWhatsAppInquiryUrl,
  formatBagWhatsAppMessage,
  formatUnitLabel,
  generateReferenceCode,
  validateOrderDocket,
  type BagTotals,
  type OrderDocketInput,
  type PricingMode,
} from '../utils/tanneryLogic';

interface SampleBagDrawerProps {
  open: boolean;
  totals: BagTotals;
  pricingMode: PricingMode;
  onClose: () => void;
  onUpdateQty: (articleId: string, delta: number) => void;
  onRemoveItem: (articleId: string) => void;
  onClearBag: () => void;
}

export function SampleBagDrawer({
  open,
  totals,
  pricingMode,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearBag,
}: SampleBagDrawerProps) {
  const [formState, setFormState] = useState<OrderDocketInput>({
    buyerName: '',
    phone: '',
    shippingDestination: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderDocketInput, string>>>({});
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [submittedTotal, setSubmittedTotal] = useState<number>(0);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const whatsappUrl = buildWhatsAppInquiryUrl(
    WHATSAPP_EXPORT_NUMBER,
    formatBagWhatsAppMessage(totals, pricingMode)
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateOrderDocket(formState);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const refCode = generateReferenceCode('ORD', Date.now());
    setSubmittedTotal(totals.grandTotalUsd);
    setConfirmedRef(refCode);
    onClearBag();
    setFormState({ buyerName: '', phone: '', shippingDestination: '' });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#1F1A17]/70"
      onClick={onClose}
    >
      <div
        className="hard-frame-shadow flex h-full w-full max-w-md flex-col border-l border-[#1F1A17] bg-[#FDFBF7]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#1F1A17] bg-[#EBE3D7] px-5 py-4">
          <div>
            <h2 id="bag-drawer-title" className="font-serif text-2xl font-semibold text-[#1F1A17]">
              Sample &amp; Order Bag
            </h2>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#544840]">
              {pricingMode === 'b2b' ? 'B2B Wholesale Tier Active' : 'Direct Factory Outlet Tier'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Sample Bag"
            className="flex h-8 w-8 items-center justify-center border border-[#1F1A17] bg-[#FDFBF7] text-[#1F1A17] hover:bg-[#1F1A17] hover:text-[#FDFBF7] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {confirmedRef ? (
            <div className="border border-[#1F1A17] bg-[#F5F0EB] p-5">
              <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#703816]">
                Dispatch Docket Logged
              </div>
              <h3 className="mt-1 font-serif text-2xl font-semibold text-[#1F1A17]">
                Order {confirmedRef} Confirmed
              </h3>
              <p className="mt-2 text-sm text-[#544840]">
                Our Sialkot export desk has queued your proforma invoice and hide inspection docket
                for <span className="tabular-nums font-bold text-[#1F1A17]">${submittedTotal} USD</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmedRef(null);
                  onClose();
                }}
                className="mt-4 w-full border border-[#1F1A17] bg-[#1F1A17] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#FDFBF7] cursor-pointer"
              >
                Return to Catalog
              </button>
            </div>
          ) : totals.lines.length === 0 ? (
            <div className="border border-[#D8CEBF] bg-[#F5F0EB] p-6 text-center">
              <p className="font-serif text-xl font-semibold text-[#1F1A17]">
                Your sample bag is empty
              </p>
              <p className="mt-1 text-sm text-[#544840]">
                Select hides, saddlery, or factory-outlet garments from the catalog to generate an export docket or WhatsApp quote.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <ul className="divide-y divide-[#D8CEBF] border border-[#D8CEBF]">
                {totals.lines.map((line) => (
                  <li key={line.article.id} className="bg-[#FDFBF7] p-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="tabular-nums text-[11px] font-bold uppercase tracking-[0.08em] text-[#703816]">
                          {line.article.sku}
                        </span>
                        <h3 className="font-serif text-lg font-semibold text-[#1F1A17]">
                          {line.article.title}
                        </h3>
                        <p className="text-xs text-[#544840]">
                          {line.tierApplied} <span aria-hidden="true">·</span> ${line.unitPrice}/
                          {line.article.unitLabel === 'pcs'
                            ? 'unit'
                            : formatUnitLabel(line.article.unitLabel, 1)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(line.article.id)}
                        aria-label={`Remove ${line.article.title}`}
                        className="p-1 text-[#544840] hover:text-[#9C3A27] cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#1F1A17]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(line.article.id, -1)}
                          aria-label={`Decrease quantity for ${line.article.title}`}
                          className="flex h-8 w-8 items-center justify-center border-r border-[#1F1A17] bg-[#F5F0EB] text-[#1F1A17] hover:bg-[#EBE3D7] cursor-pointer"
                        >
                          <Minus className="h-3 w-3" aria-hidden="true" />
                        </button>
                        <span className="tabular-nums px-3 text-xs font-bold text-[#1F1A17]">
                          {line.quantity} {formatUnitLabel(line.article.unitLabel, line.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(line.article.id, 1)}
                          aria-label={`Increase quantity for ${line.article.title}`}
                          className="flex h-8 w-8 items-center justify-center border-l border-[#1F1A17] bg-[#F5F0EB] text-[#1F1A17] hover:bg-[#EBE3D7] cursor-pointer"
                        >
                          <Plus className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="tabular-nums text-base font-bold text-[#1F1A17]">
                        ${line.lineTotal}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border border-[#1F1A17] bg-[#F5F0EB] p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.08em] text-[#544840]">
                  <span>Total Units</span>
                  <span className="tabular-nums font-bold text-[#1F1A17]">{totals.totalUnits}</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-[#D8CEBF] pt-2">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#1F1A17]">
                    Estimated Total (FOB / Outlet)
                  </span>
                  <span className="tabular-nums text-xl font-bold text-[#703816]">
                    ${totals.grandTotalUsd} USD
                  </span>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 border border-[#1F1A17] bg-[#FDFBF7] px-4 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#1F1A17] transition-colors hover:bg-[#1F1A17] hover:text-[#FDFBF7]"
              >
                <MessageCircle className="h-4 w-4 text-[#703816]" aria-hidden="true" />
                <span>Send Bag via WhatsApp</span>
              </a>

              <form onSubmit={handleSubmit} noValidate className="space-y-3 border-t border-[#1F1A17] pt-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-[#1F1A17]">
                  Submit Order / Proforma Docket
                </h3>

                <div>
                  <label htmlFor="docket-buyer" className="block text-xs font-semibold text-[#1F1A17]">
                    Buyer or Company Name
                  </label>
                  <input
                    id="docket-buyer"
                    type="text"
                    value={formState.buyerName}
                    onChange={(e) => setFormState((s) => ({ ...s, buyerName: e.target.value }))}
                    placeholder="e.g. Tariq Leather Co."
                    className="mt-1 w-full border border-[#1F1A17] bg-[#FDFBF7] px-3 py-2 text-sm text-[#1F1A17] placeholder:text-[#8C827A] focus:outline-2 focus:outline-[#703816]"
                  />
                  {errors.buyerName && (
                    <p className="mt-1 text-xs font-medium text-[#9C3A27]">{errors.buyerName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="docket-phone" className="block text-xs font-semibold text-[#1F1A17]">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="docket-phone"
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                    placeholder="+44 7700 900123"
                    className="mt-1 w-full border border-[#1F1A17] bg-[#FDFBF7] px-3 py-2 text-sm text-[#1F1A17] placeholder:text-[#8C827A] focus:outline-2 focus:outline-[#703816]"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs font-medium text-[#9C3A27]">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="docket-dest" className="block text-xs font-semibold text-[#1F1A17]">
                    Shipping Address or Destination Port
                  </label>
                  <input
                    id="docket-dest"
                    type="text"
                    value={formState.shippingDestination}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, shippingDestination: e.target.value }))
                    }
                    placeholder="Hamburg Port / Lahore Gulberg"
                    className="mt-1 w-full border border-[#1F1A17] bg-[#FDFBF7] px-3 py-2 text-sm text-[#1F1A17] placeholder:text-[#8C827A] focus:outline-2 focus:outline-[#703816]"
                  />
                  {errors.shippingDestination && (
                    <p className="mt-1 text-xs font-medium text-[#9C3A27]">
                      {errors.shippingDestination}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mechanical-hover w-full border border-[#703816] bg-[#703816] px-4 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#FDFBF7] hover:border-[#1F1A17] hover:bg-[#1F1A17] cursor-pointer"
                >
                  Confirm Proforma Docket
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
