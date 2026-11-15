import { ArrowRight, MessageCircle, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ExportInquirySection } from './components/ExportInquirySection';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductSpecModal } from './components/ProductSpecModal';
import { SampleBagDrawer } from './components/SampleBagDrawer';
import { TanneryOriginStamp } from './components/TanneryOriginStamp';
import {
  CATALOG_ARTICLES,
  HERO_WORKSHOP_IMAGE,
  HIDE_GRADE_SPECS,
  WHATSAPP_EXPORT_NUMBER,
} from './data/catalog';
import {
  buildWhatsAppInquiryUrl,
  calculateBagTotals,
  filterArticles,
  formatUnitLabel,
  getMinimumOrderQty,
  type ArticleCategory,
  type BagItem,
  type LeatherArticle,
  type PricingMode,
} from './utils/tanneryLogic';

const CATEGORY_TABS: { id: ArticleCategory; label: string }[] = [
  { id: 'all', label: 'All Lots' },
  { id: 'apparel', label: 'Leather Apparel' },
  { id: 'saddlery', label: 'Saddlery & Bags' },
  { id: 'hides', label: 'Finished Hides' },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('all');
  const [pricingMode, setPricingMode] = useState<PricingMode>('outlet');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedArticle, setInspectedArticle] = useState<LeatherArticle | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [lastAddedMessage, setLastAddedMessage] = useState<string | null>(null);

  const filteredArticles = useMemo(
    () => filterArticles(CATALOG_ARTICLES, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  const bagTotals = useMemo(
    () => calculateBagTotals(bagItems, CATALOG_ARTICLES, pricingMode),
    [bagItems, pricingMode]
  );

  const handleAddToBag = (article: LeatherArticle) => {
    const qtyToAdd = getMinimumOrderQty(article, pricingMode);
    setBagItems((prev) => {
      const existing = prev.find((item) => item.articleId === article.id);
      if (existing) {
        return prev.map((item) =>
          item.articleId === article.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prev, { articleId: article.id, quantity: qtyToAdd }];
    });
    setLastAddedMessage(
      `Added ${qtyToAdd} ${formatUnitLabel(article.unitLabel, qtyToAdd)} of ${article.sku} to Sample Bag`
    );
  };

  const handleUpdateQty = (articleId: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.articleId === articleId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (articleId: string) => {
    setBagItems((prev) => prev.filter((item) => item.articleId !== articleId));
  };

  const heroWhatsAppUrl = buildWhatsAppInquiryUrl(
    WHATSAPP_EXPORT_NUMBER,
    'Hello Riaz Tannery Export Desk — Requesting current Sialkot hide & manufacturing catalog.'
  );

  return (
    <div id="top" className="min-h-screen bg-[#F5F0EB] text-[#1F1A17]">
      <Header bagCount={bagTotals.totalUnits} onOpenBag={() => setBagOpen(true)} />

      <main>
        {/* Section 1: Hero Split & KPI Ledger */}
        <section className="border-b border-[#1F1A17] bg-[#FDFBF7]">
          <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-14 xl:px-12">
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
              <div className="flex flex-col justify-between lg:col-span-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#703816]">
                    Sialkot Industrial Estate <span aria-hidden="true">·</span> Est. 1978
                  </p>
                  <h1 className="mt-3 font-serif text-[38px] font-medium leading-[1.12] tracking-[-0.02em] text-[#1F1A17] md:text-[56px] [text-wrap:balance]">
                    Source-Origin Leather Tanning &amp; Export Atelier
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-[#544840] md:text-lg">
                    Drum-dyed full-grain cowhide, pit-tanned vegetable bridle, and precision-cut
                    garments produced under one Sialkot roof for international private-label buyers
                    and direct factory-outlet patrons.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#catalog"
                    className="mechanical-hover inline-flex items-center gap-2 border border-[#703816] bg-[#703816] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#FDFBF7] hover:border-[#1F1A17] hover:bg-[#1F1A17] whitespace-nowrap"
                  >
                    <span>Browse Factory Catalog</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={heroWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#1F1A17] bg-[#FDFBF7] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#1F1A17] transition-colors hover:bg-[#1F1A17] hover:text-[#FDFBF7] whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4 text-[#703816]" aria-hidden="true" />
                    <span>WhatsApp Export Desk</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="h-full border border-[#1F1A17] bg-[#EBE3D7]">
                  <img
                    src={HERO_WORKSHOP_IMAGE}
                    alt="Rolled full-grain cognac and espresso cowhide leathers beside solid brass buckles on an oak Sialkot tannery bench"
                    referrerPolicy="no-referrer"
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-2 border border-[#1F1A17] bg-[#F5F0EB] md:grid-cols-4">
              <div className="border-b border-r border-[#D8CEBF] p-4 md:border-b-0">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#544840]">
                  Material Standard
                </dt>
                <dd className="mt-1 font-serif text-xl font-semibold text-[#1F1A17]">
                  100% Full-Grain Hide
                </dd>
              </div>
              <div className="border-b border-[#D8CEBF] p-4 md:border-b-0 md:border-r">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#544840]">
                  Export Compliance
                </dt>
                <dd className="mt-1 font-serif text-xl font-semibold text-[#1F1A17]">
                  EU REACH &amp; Chrome-Free
                </dd>
              </div>
              <div className="border-r border-[#D8CEBF] p-4">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#544840]">
                  Wholesale Minimum
                </dt>
                <dd className="tabular-nums mt-1 font-serif text-xl font-semibold text-[#1F1A17]">
                  15–30 Units FOB
                </dd>
              </div>
              <div className="p-4">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#544840]">
                  Swatch Courier
                </dt>
                <dd className="tabular-nums mt-1 font-serif text-xl font-semibold text-[#1F1A17]">
                  48h Air Dispatch
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Section 2: Factory Catalog & Outlet Grid */}
        <section id="catalog" className="scroll-mt-20 border-b border-[#1F1A17] bg-[#F5F0EB]">
          <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 xl:px-12">
            <div className="flex flex-col gap-6 border-b border-[#1F1A17] pb-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#703816]">
                  Production Ledger
                </p>
                <h2 className="mt-1 font-serif text-4xl font-semibold text-[#1F1A17]">
                  Factory Catalog &amp; Outlet Lots
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  role="group"
                  aria-label="Pricing tier mode"
                  className="inline-flex border border-[#1F1A17] bg-[#FDFBF7]"
                >
                  <button
                    type="button"
                    onClick={() => setPricingMode('outlet')}
                    aria-pressed={pricingMode === 'outlet'}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] whitespace-nowrap cursor-pointer ${
                      pricingMode === 'outlet'
                        ? 'bg-[#1F1A17] text-[#FDFBF7]'
                        : 'text-[#544840] hover:text-[#1F1A17]'
                    }`}
                  >
                    Factory Outlet
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricingMode('b2b')}
                    aria-pressed={pricingMode === 'b2b'}
                    className={`border-l border-[#1F1A17] px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] whitespace-nowrap cursor-pointer ${
                      pricingMode === 'b2b'
                        ? 'bg-[#703816] text-[#FDFBF7]'
                        : 'text-[#544840] hover:text-[#1F1A17]'
                    }`}
                  >
                    B2B Wholesale
                  </button>
                </div>

                <div className="relative">
                  <label htmlFor="catalog-search" className="sr-only">
                    Search articles by SKU or leather type
                  </label>
                  <Search
                    className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#544840]"
                    aria-hidden="true"
                  />
                  <input
                    id="catalog-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search SKU or hide..."
                    className="w-56 border border-[#1F1A17] bg-[#FDFBF7] py-2 pr-3 pl-9 text-sm text-[#1F1A17] placeholder:text-[#8C827A] focus:outline-2 focus:outline-[#703816]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div role="tablist" aria-label="Article categories" className="flex flex-wrap gap-2">
                {CATEGORY_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] whitespace-nowrap cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'border-[#1F1A17] bg-[#1F1A17] text-[#FDFBF7]'
                        : 'border-[#D8CEBF] bg-[#FDFBF7] text-[#544840] hover:border-[#1F1A17] hover:text-[#1F1A17]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {lastAddedMessage && (
                <div
                  role="status"
                  className="flex items-center gap-3 border border-[#703816] bg-[#FDFBF7] px-3.5 py-2 text-xs font-semibold text-[#1F1A17]"
                >
                  <span>{lastAddedMessage}</span>
                  <button
                    type="button"
                    onClick={() => setBagOpen(true)}
                    className="uppercase tracking-[0.06em] text-[#703816] underline decoration-[#C5A059] underline-offset-4 cursor-pointer"
                  >
                    View Bag
                  </button>
                </div>
              )}
            </div>

            {filteredArticles.length === 0 ? (
              <div className="mt-8 border border-[#1F1A17] bg-[#FDFBF7] p-10 text-center">
                <p className="font-serif text-2xl font-semibold text-[#1F1A17]">
                  No matching articles in current filter
                </p>
                <p className="mt-1 text-sm text-[#544840]">
                  Clear your SKU search or switch category tabs to view all active Sialkot lots.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 border border-[#1F1A17] bg-[#1F1A17] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#FDFBF7] cursor-pointer"
                >
                  Reset Catalog Filter
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <ProductCard
                    key={article.id}
                    article={article}
                    pricingMode={pricingMode}
                    onInspect={setInspectedArticle}
                    onAddToBag={handleAddToBag}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Technical Hide Ledger & Craft Provenance */}
        <section id="specs" className="scroll-mt-20 bg-[#FDFBF7]">
          <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 xl:px-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#703816]">
                  Tannery Specification Sheet
                </p>
                <h2 className="mt-1 font-serif text-4xl font-semibold text-[#1F1A17]">
                  Hide Grade &amp; Substance Matrix
                </h2>
                <p className="mt-2 text-sm text-[#544840]">
                  Standardized Sialkot export tolerances calibrated to ±0.1mm splitting accuracy.
                </p>

                <div className="mt-6 overflow-x-auto border border-[#1F1A17]">
                  <table className="w-full min-w-[600px] border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-[#1F1A17] bg-[#EBE3D7] text-xs font-semibold uppercase tracking-[0.08em] text-[#1F1A17]">
                        <th className="px-4 py-3">Lot Code</th>
                        <th className="px-4 py-3">Hide Classification</th>
                        <th className="px-4 py-3">Tanning Protocol</th>
                        <th className="px-4 py-3">Substance</th>
                        <th className="px-4 py-3">MOQ</th>
                        <th className="px-4 py-3">Dispatch</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D8CEBF] text-sm">
                      {HIDE_GRADE_SPECS.map((spec) => (
                        <tr
                          key={spec.lotCode}
                          className="h-11 bg-[#FDFBF7] transition-colors hover:bg-[#F5F0EB]"
                        >
                          <td className="tabular-nums px-4 py-2.5 font-bold text-[#703816]">
                            {spec.lotCode}
                          </td>
                          <td className="px-4 py-2.5 font-semibold text-[#1F1A17]">
                            {spec.hideName}
                          </td>
                          <td className="px-4 py-2.5 text-[#544840]">{spec.tanning}</td>
                          <td className="tabular-nums px-4 py-2.5 font-medium text-[#1F1A17]">
                            {spec.substance}
                          </td>
                          <td className="tabular-nums px-4 py-2.5 text-[#544840]">{spec.moq}</td>
                          <td className="tabular-nums px-4 py-2.5 font-medium text-[#1F1A17]">
                            {spec.leadTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="craft" className="scroll-mt-20 flex flex-col justify-between gap-6 lg:col-span-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#703816]">
                    Craft &amp; Origin
                  </p>
                  <h2 className="mt-1 font-serif text-3xl font-semibold text-[#1F1A17]">
                    Three Generations of Sialkot Bench Craft
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#544840]">
                    Every garment and saddlery piece leaves our Shahabpura workshop with hand-skived
                    seams, solid sand-cast brass fittings, and traceable drum batch records.
                    Inspection dockets accompany every export crate and single-piece factory outlet
                    order.
                  </p>
                </div>

                <TanneryOriginStamp />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Export & Wholesale Inquiry */}
        <ExportInquirySection />
      </main>

      <footer className="border-t border-[#1F1A17] bg-[#1F1A17] text-[#F5F0EB]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-4 py-8 md:flex-row md:items-center md:px-8 xl:px-12">
          <div>
            <div className="font-serif text-xl font-semibold">Riaz Tannery &amp; Atelier</div>
            <p className="mt-1 text-xs text-[#CFC4BF]">
              Plot 14-B, Small Industrial Estate, Sialkot 51310 <span aria-hidden="true">·</span>{' '}
              Export &amp; Factory Outlet
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-[0.08em] text-[#CFC4BF]">
            <a href="#catalog" className="hover:text-[#FDFBF7]">
              Catalog
            </a>
            <a href="#specs" className="hover:text-[#FDFBF7]">
              Hide Specs
            </a>
            <a href="#craft" className="hover:text-[#FDFBF7]">
              Craft &amp; Origin
            </a>
            <a href="#inquiry" className="hover:text-[#FDFBF7]">
              Export Inquiry
            </a>
          </div>
        </div>
      </footer>

      <ProductSpecModal
        article={inspectedArticle}
        pricingMode={pricingMode}
        onClose={() => setInspectedArticle(null)}
        onAddToBag={handleAddToBag}
      />

      <SampleBagDrawer
        open={bagOpen}
        totals={bagTotals}
        pricingMode={pricingMode}
        onClose={() => setBagOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearBag={() => setBagItems([])}
      />
    </div>
  );
}
