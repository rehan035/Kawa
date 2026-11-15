import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppInquiryUrl,
  calculateBagTotals,
  filterArticles,
  formatBagWhatsAppMessage,
  formatUnitLabel,
  getEffectiveUnitPrice,
  getGaugeSegments,
  getMinimumOrderQty,
  validateExportInquiry,
  validateOrderDocket,
  type LeatherArticle,
} from './tanneryLogic';

const MOCK_ARTICLES: LeatherArticle[] = [
  {
    id: 'a1',
    sku: 'ART-801',
    title: 'Sialkot Field Jacket',
    category: 'apparel',
    leatherType: 'Full-Grain Cowhide',
    tanningMethod: 'Chrome-Free Drum',
    thicknessLabel: '1.2–1.4mm',
    thicknessMm: 1.3,
    temper: 'Medium Supple',
    hardware: 'Solid Cast Brass #8',
    portOfOrigin: 'Sialkot Dry Port',
    status: 'In Stock (Outlet)',
    outletPriceUsd: 295,
    b2bTier1Usd: 168,
    b2bTier2Usd: 142,
    moq: 25,
    unitLabel: 'pcs',
    image: '',
    imageAlt: '',
    description: '',
  },
  {
    id: 'a2',
    sku: 'ART-803',
    title: 'Bridle Weekender Duffel',
    category: 'saddlery',
    leatherType: 'Veg-Tan Bridle',
    tanningMethod: 'Pit Vegetable Bark',
    thicknessLabel: '2.0–2.2mm',
    thicknessMm: 2.1,
    temper: 'Structured Firm',
    hardware: 'Sand-Cast Brass D-Rings',
    portOfOrigin: 'Karachi Port',
    status: 'Export Only',
    outletPriceUsd: 340,
    b2bTier1Usd: 195,
    b2bTier2Usd: 165,
    moq: 20,
    unitLabel: 'pcs',
    image: '',
    imageAlt: '',
    description: '',
  },
];

test('filterArticles filters by category and search query', () => {
  assert.equal(filterArticles(MOCK_ARTICLES, 'all', '').length, 2);
  assert.equal(filterArticles(MOCK_ARTICLES, 'saddlery', '').length, 1);
  assert.equal(filterArticles(MOCK_ARTICLES, 'all', 'ART-801')[0].id, 'a1');
  assert.equal(filterArticles(MOCK_ARTICLES, 'apparel', 'bridle').length, 0);
});

test('B2B tier pricing drops at 4x MOQ threshold and enforces MOQ', () => {
  assert.equal(getMinimumOrderQty(MOCK_ARTICLES[0], 'outlet'), 1);
  assert.equal(getMinimumOrderQty(MOCK_ARTICLES[0], 'b2b'), 25);

  const outlet = getEffectiveUnitPrice(MOCK_ARTICLES[0], 'outlet', 1);
  assert.equal(outlet.unitPrice, 295);

  const tier1 = getEffectiveUnitPrice(MOCK_ARTICLES[0], 'b2b', 25);
  assert.equal(tier1.unitPrice, 168);

  const tier2 = getEffectiveUnitPrice(MOCK_ARTICLES[0], 'b2b', 100);
  assert.equal(tier2.unitPrice, 142);
});

test('calculateBagTotals computes grand total and units cleanly', () => {
  const totals = calculateBagTotals(
    [
      { articleId: 'a1', quantity: 25 },
      { articleId: 'a2', quantity: 80 },
    ],
    MOCK_ARTICLES,
    'b2b'
  );
  assert.equal(totals.totalUnits, 105);
  assert.equal(totals.grandTotalUsd, 25 * 168 + 80 * 165);
});

test('getGaugeSegments maps thickness mm to 2..5 segments', () => {
  assert.equal(getGaugeSegments(1.0), 2);
  assert.equal(getGaugeSegments(1.3), 3);
  assert.equal(getGaugeSegments(2.1), 4);
  assert.equal(getGaugeSegments(3.4), 5);
});

test('buildWhatsAppInquiryUrl encodes query text and strips non-digits', () => {
  const url = buildWhatsAppInquiryUrl('+92 300-555-0194', 'Test ART-801 Quote');
  assert.equal(url, 'https://wa.me/923005550194?text=Test%20ART-801%20Quote');
  const msg = formatBagWhatsAppMessage(
    calculateBagTotals([{ articleId: 'a1', quantity: 2 }], MOCK_ARTICLES, 'outlet'),
    'outlet'
  );
  assert.ok(msg.includes('ART-801'));
  assert.ok(msg.includes('$590'));
});

test('form validators reject incomplete inputs and accept valid data', () => {
  const badInquiry = validateExportInquiry({
    companyName: '',
    email: 'not-an-email',
    orderType: 'b2b-contract',
    articleInterest: '',
    notes: 'short',
  });
  assert.ok(badInquiry.companyName);
  assert.ok(badInquiry.email);
  assert.ok(badInquiry.notes);

  const goodInquiry = validateExportInquiry({
    companyName: 'Nordic Saddlery AB',
    email: 'procurement@nordicsaddlery.se',
    orderType: 'b2b-contract',
    articleInterest: 'ART-801',
    notes: 'Requesting 50 units in dark espresso full-grain cowhide.',
  });
  assert.deepEqual(goodInquiry, {});

  const badDocket = validateOrderDocket({ buyerName: 'A', phone: '123', shippingDestination: 'NYC' });
  assert.ok(badDocket.buyerName);
  assert.ok(badDocket.phone);
  assert.ok(badDocket.shippingDestination);
});

test('formatUnitLabel handles singular and plural counts cleanly', () => {
  assert.equal(formatUnitLabel('pcs', 1), 'pc');
  assert.equal(formatUnitLabel('pcs', 25), 'pcs');
  assert.equal(formatUnitLabel('sides', 1), 'side');
  assert.equal(formatUnitLabel('shoulders', 1), 'shoulder');
  assert.equal(formatUnitLabel('sides', 30), 'sides');
});
