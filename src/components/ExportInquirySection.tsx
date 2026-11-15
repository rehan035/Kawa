import { MapPin, MessageCircle, Ship } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { CATALOG_ARTICLES, WHATSAPP_EXPORT_NUMBER } from '../data/catalog';
import {
  buildWhatsAppInquiryUrl,
  generateReferenceCode,
  validateExportInquiry,
  type ExportInquiryInput,
} from '../utils/tanneryLogic';

export function ExportInquirySection() {
  const [form, setForm] = useState<ExportInquiryInput>({
    companyName: '',
    email: '',
    orderType: 'b2b-contract',
    articleInterest: CATALOG_ARTICLES[0].sku,
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ExportInquiryInput, string>>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const directWhatsAppUrl = buildWhatsAppInquiryUrl(
    WHATSAPP_EXPORT_NUMBER,
    'Hello Riaz Tannery Export Desk — I would like to discuss B2B manufacturing, custom hide dyeing, or factory outlet dispatch.'
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateExportInquiry(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const code = generateReferenceCode('EXP', Date.now());
    setSubmittedRef(code);
    setForm({
      companyName: '',
      email: '',
      orderType: 'b2b-contract',
      articleInterest: CATALOG_ARTICLES[0].sku,
      notes: '',
    });
  };

  return (
    <section id="inquiry" className="scroll-mt-20 border-t border-[#1F1A17] bg-[#F5F0EB]">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#703816]">
                Export &amp; Private Label Desk
              </p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-[#1F1A17] [text-wrap:balance]">
                Direct Tannery Quotes &amp; Sample Dispatch
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#544840]">
                Submit technical specs for private-label leather garments, bulk wet-blue or crust
                hides, or direct factory-outlet dispatch from Sialkot Industrial Estate.
              </p>

              <dl className="mt-6 space-y-4 border-t border-[#D8CEBF] pt-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#703816]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#1F1A17]">
                      Tannery &amp; Cutting Floor
                    </dt>
                    <dd className="text-[#544840]">
                      Plot 14-B, Small Industrial Estate, Shahabpura Road, Sialkot 51310
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Ship className="mt-0.5 h-4 w-4 shrink-0 text-[#703816]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#1F1A17]">
                      Export Logistics
                    </dt>
                    <dd className="text-[#544840]">
                      FOB Karachi / Sialkot Dry Port · DHL Air Courier for 48h Swatch Books
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="mt-8 border border-[#1F1A17] bg-[#FDFBF7] p-5">
              <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#544840]">
                Immediate Trade Desk
              </div>
              <p className="mt-1 text-sm text-[#1F1A17]">
                Need live hide lot photos or rapid courier pricing? Reach our floor merchandiser directly.
              </p>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mechanical-hover mt-4 inline-flex items-center gap-2 border border-[#703816] bg-[#703816] px-5 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#FDFBF7] hover:border-[#1F1A17] hover:bg-[#1F1A17]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Open WhatsApp Trade Desk</span>
              </a>
            </div>
          </div>

          <div className="border border-[#1F1A17] bg-[#FDFBF7] p-6 md:p-8 lg:col-span-7">
            {submittedRef ? (
              <div className="flex h-full flex-col justify-center py-8">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#703816]">
                  Inquiry Recorded
                </p>
                <h3 className="mt-2 font-serif text-3xl font-semibold text-[#1F1A17]">
                  Reference {submittedRef} Assigned
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#544840]">
                  Thank you. Your leather specification inquiry has been logged for our Sialkot
                  tannery engineering team. Expect a formal FOB quotation and hide swatch availability
                  sheet within 1 business day.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setSubmittedRef(null)}
                    className="border border-[#1F1A17] bg-[#FDFBF7] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#1F1A17] hover:bg-[#1F1A17] hover:text-[#FDFBF7] cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="border-b border-[#D8CEBF] pb-3">
                  <h3 className="font-serif text-2xl font-semibold text-[#1F1A17]">
                    Export &amp; Custom Specification Form
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="inquiry-company"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#1F1A17]"
                    >
                      Buyer / Company Name
                    </label>
                    <input
                      id="inquiry-company"
                      type="text"
                      value={form.companyName}
                      onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
                      placeholder="Nordic Saddlery AB"
                      className="mt-1.5 w-full border border-[#1F1A17] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#1F1A17] placeholder:text-[#8C827A] focus:outline-2 focus:outline-[#703816]"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-xs font-medium text-[#9C3A27]">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#1F1A17]"
                    >
                      Business Email
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="sourcing@company.com"
                      className="mt-1.5 w-full border border-[#1F1A17] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#1F1A17] placeholder:text-[#8C827A] focus:outline-2 focus:outline-[#703816]"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs font-medium text-[#9C3A27]">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="inquiry-order-type"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#1F1A17]"
                    >
                      Order Classification
                    </label>
                    <select
                      id="inquiry-order-type"
                      value={form.orderType}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          orderType: e.target.value as ExportInquiryInput['orderType'],
                        }))
                      }
                      className="mt-1.5 w-full border border-[#1F1A17] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#1F1A17] focus:outline-2 focus:outline-[#703816]"
                    >
                      <option value="b2b-contract">B2B Contract / Wholesale Run</option>
                      <option value="retail-sample">Factory Outlet / Sample Swatch</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-article"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#1F1A17]"
                    >
                      Primary Article Code
                    </label>
                    <select
                      id="inquiry-article"
                      value={form.articleInterest}
                      onChange={(e) => setForm((f) => ({ ...f, articleInterest: e.target.value }))}
                      className="mt-1.5 w-full border border-[#1F1A17] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#1F1A17] focus:outline-2 focus:outline-[#703816]"
                    >
                      {CATALOG_ARTICLES.map((art) => (
                        <option key={art.id} value={art.sku}>
                          {art.sku} — {art.title}
                        </option>
                      ))}
                      <option value="CUSTOM-TECH-PACK">Custom Tech Pack / OEM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-notes"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#1F1A17]"
                  >
                    Hide Grade, Thickness &amp; Volume Specifications
                  </label>
                  <textarea
                    id="inquiry-notes"
                    rows={4}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Specify target thickness (mm), color dye lot, quantity, and destination port..."
                    className="mt-1.5 w-full border border-[#1F1A17] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#1F1A17] placeholder:text-[#8C827A] focus:outline-2 focus:outline-[#703816]"
                  />
                  {errors.notes && (
                    <p className="mt-1 text-xs font-medium text-[#9C3A27]">{errors.notes}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mechanical-hover border border-[#703816] bg-[#703816] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#FDFBF7] hover:border-[#1F1A17] hover:bg-[#1F1A17] cursor-pointer"
                >
                  Request Export Quotation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
