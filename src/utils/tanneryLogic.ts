export type ArticleCategory = 'all' | 'apparel' | 'saddlery' | 'hides';
export type PricingMode = 'outlet' | 'b2b';
export type ArticleStatus = 'In Stock (Outlet)' | 'Export Only' | 'Sample Lot';

export interface LeatherArticle {
  id: string;
  sku: string;
  title: string;
  category: Exclude<ArticleCategory, 'all'>;
  leatherType: string;
  tanningMethod: string;
  thicknessLabel: string;
  thicknessMm: number;
  temper: string;
  hardware: string;
  portOfOrigin: string;
  status: ArticleStatus;
  outletPriceUsd: number;
  b2bTier1Usd: number;
  b2bTier2Usd: number;
  moq: number;
  unitLabel: string;
  image: string;
  imageAlt: string;
  description: string;
}

export interface BagItem {
  articleId: string;
  quantity: number;
}

export interface BagLineSummary {
  article: LeatherArticle;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  tierApplied: string;
}

export interface BagTotals {
  lines: BagLineSummary[];
  totalUnits: number;
  grandTotalUsd: number;
}

export interface ExportInquiryInput {
  companyName: string;
  email: string;
  orderType: 'retail-sample' | 'b2b-contract';
  articleInterest: string;
  notes: string;
}

export interface OrderDocketInput {
  buyerName: string;
  phone: string;
  shippingDestination: string;
}

export function filterArticles(
  articles: LeatherArticle[],
  category: ArticleCategory,
  searchQuery: string
): LeatherArticle[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return articles.filter((article) => {
    const matchesCategory = category === 'all' || article.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const haystack = [
      article.sku,
      article.title,
      article.leatherType,
      article.tanningMethod,
      article.temper,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export function getMinimumOrderQty(article: LeatherArticle, mode: PricingMode): number {
  return mode === 'b2b' ? article.moq : 1;
}

export function formatUnitLabel(unitLabel: string, qty: number): string {
  if (qty === 1) {
    if (unitLabel === 'pcs') return 'pc';
    if (unitLabel.endsWith('s')) return unitLabel.slice(0, -1);
  }
  return unitLabel;
}

export function getEffectiveUnitPrice(
  article: LeatherArticle,
  mode: PricingMode,
  quantity: number
): { unitPrice: number; tierLabel: string } {
  if (mode === 'outlet') {
    return {
      unitPrice: article.outletPriceUsd,
      tierLabel: 'Factory Outlet Unit',
    };
  }
  const tier2Threshold = article.moq * 4;
  if (quantity >= tier2Threshold) {
    return {
      unitPrice: article.b2bTier2Usd,
      tierLabel: `B2B Volume (${tier2Threshold}+)`,
    };
  }
  return {
    unitPrice: article.b2bTier1Usd,
    tierLabel: `B2B MOQ (${article.moq}+)`,
  };
}

export function calculateBagTotals(
  items: BagItem[],
  articles: LeatherArticle[],
  mode: PricingMode
): BagTotals {
  const articleMap = new Map(articles.map((a) => [a.id, a]));
  const lines: BagLineSummary[] = [];
  let totalUnits = 0;
  let grandTotalUsd = 0;

  for (const item of items) {
    if (item.quantity <= 0) continue;
    const article = articleMap.get(item.articleId);
    if (!article) continue;
    const { unitPrice, tierLabel } = getEffectiveUnitPrice(article, mode, item.quantity);
    const lineTotal = unitPrice * item.quantity;
    lines.push({
      article,
      quantity: item.quantity,
      unitPrice,
      lineTotal,
      tierApplied: tierLabel,
    });
    totalUnits += item.quantity;
    grandTotalUsd += lineTotal;
  }

  return { lines, totalUnits, grandTotalUsd };
}

export function getGaugeSegments(thicknessMm: number): number {
  if (thicknessMm <= 1.1) return 2;
  if (thicknessMm <= 1.5) return 3;
  if (thicknessMm <= 2.2) return 4;
  return 5;
}

export function buildWhatsAppInquiryUrl(phoneDigits: string, message: string): string {
  const cleanDigits = phoneDigits.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(message.trim())}`;
}

export function formatProductWhatsAppMessage(article: LeatherArticle, mode: PricingMode): string {
  const unitPrice = mode === 'b2b' ? article.b2bTier1Usd : article.outletPriceUsd;
  const qtyNote = mode === 'b2b' ? `MOQ ${article.moq} ${article.unitLabel}` : `1 ${article.unitLabel} (Outlet)`;
  return `Hello Riaz Tannery Export Desk — Requesting quote/sample for ${article.sku} (${article.title}, ${article.leatherType}, ${article.thicknessLabel}). Mode: ${qtyNote} at $${unitPrice} USD.`;
}

export function formatBagWhatsAppMessage(totals: BagTotals, mode: PricingMode): string {
  if (totals.lines.length === 0) {
    return 'Hello Riaz Tannery Export Desk — I would like to discuss leather goods & hide sourcing from Sialkot.';
  }
  const lineText = totals.lines
    .map(
      (line) =>
        `• ${line.article.sku} ${line.article.title}: ${line.quantity} × $${line.unitPrice} = $${line.lineTotal}`
    )
    .join('\n');
  return `Hello Riaz Tannery Export Desk (${mode === 'b2b' ? 'B2B Wholesale' : 'Factory Outlet'}):\n${lineText}\nTotal (${totals.totalUnits} units): $${totals.grandTotalUsd} USD`;
}

export function validateExportInquiry(input: ExportInquiryInput): Partial<Record<keyof ExportInquiryInput, string>> {
  const errors: Partial<Record<keyof ExportInquiryInput, string>> = {};
  if (input.companyName.trim().length < 2) {
    errors.companyName = 'Enter a buyer or company name (min 2 characters).';
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(input.email.trim())) {
    errors.email = 'Enter a valid business or personal email address.';
  }
  if (input.notes.trim().length < 10) {
    errors.notes = 'Specify hide requirements, target volume, or sizing notes (min 10 characters).';
  }
  return errors;
}

export function validateOrderDocket(input: OrderDocketInput): Partial<Record<keyof OrderDocketInput, string>> {
  const errors: Partial<Record<keyof OrderDocketInput, string>> = {};
  if (input.buyerName.trim().length < 2) {
    errors.buyerName = 'Enter recipient or company name.';
  }
  if (input.phone.replace(/[^0-9+]/g, '').length < 7) {
    errors.phone = 'Enter a valid phone or WhatsApp number.';
  }
  if (input.shippingDestination.trim().length < 6) {
    errors.shippingDestination = 'Enter street address, city, or destination port.';
  }
  return errors;
}

export function generateReferenceCode(prefix: string, seedNumber: number): string {
  const code = String(Math.abs(seedNumber) % 9000 + 1000);
  return `RT-${prefix}-${code}`;
}
