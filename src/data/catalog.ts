import heroBenchImg from '../assets/images/hero_tannery_bench_1794767025576.jpg';
import jacketEspressoImg from '../assets/images/jacket_espresso_hide_1794767026314.jpg';
import jacketCognacImg from '../assets/images/jacket_cognac_blouson_1794767026373.jpg';
import bagWeekenderImg from '../assets/images/bag_saddle_weekender_1794767027428.jpg';
import bagAttacheImg from '../assets/images/bag_brass_attache_1794767027022.jpg';
import hidePullupImg from '../assets/images/hide_pullup_rolls_1794767027872.jpg';
import hideBridleImg from '../assets/images/hide_veg_bridle_1794767028480.jpg';
import type { LeatherArticle } from '../utils/tanneryLogic';

export const HERO_WORKSHOP_IMAGE = heroBenchImg;
export const WHATSAPP_EXPORT_NUMBER = '923005550194';

export const CATALOG_ARTICLES: LeatherArticle[] = [
  {
    id: 'art-801',
    sku: 'ART-801',
    title: 'Sialkot Field Jacket',
    category: 'apparel',
    leatherType: 'Pebbled Full-Grain Cowhide',
    tanningMethod: 'Chrome-Free Drum Dyed',
    thicknessLabel: '1.2–1.4mm',
    thicknessMm: 1.3,
    temper: 'Medium Supple',
    hardware: 'Antique Cast Brass #8 Zip',
    portOfOrigin: 'Sialkot Dry Port',
    status: 'In Stock (Outlet)',
    outletPriceUsd: 295,
    b2bTier1Usd: 168,
    b2bTier2Usd: 142,
    moq: 25,
    unitLabel: 'pcs',
    image: jacketEspressoImg,
    imageAlt: 'Structured dark espresso full-grain cowhide leather field jacket with brass hardware',
    description:
      'Cut from drum-milled Pakistani cowhide with reinforced shoulder yokes, storm throat latch, and waxed cotton twill lining.',
  },
  {
    id: 'art-802',
    sku: 'ART-802',
    title: 'Atelier Collar Blouson',
    category: 'apparel',
    leatherType: 'Aniline Pull-Up Cowhide',
    tanningMethod: 'Semi-Vegetable Aniline',
    thicknessLabel: '1.0–1.2mm',
    thicknessMm: 1.1,
    temper: 'Supple Oiled',
    hardware: 'Solid Brass Snaps & #5 Zip',
    portOfOrigin: 'Sialkot Dry Port',
    status: 'In Stock (Outlet)',
    outletPriceUsd: 275,
    b2bTier1Usd: 154,
    b2bTier2Usd: 130,
    moq: 25,
    unitLabel: 'pcs',
    image: jacketCognacImg,
    imageAlt: 'Cognac saddle-tan aniline leather blouson jacket with structured collar',
    description:
      'Tailored pattern engineered for European and North American private-label runs using natural-grain cognac pull-up hides.',
  },
  {
    id: 'art-803',
    sku: 'ART-803',
    title: 'Saddler Weekender Duffel',
    category: 'saddlery',
    leatherType: 'Vegetable-Tanned Bridle',
    tanningMethod: 'Pit Bark Vegetable',
    thicknessLabel: '2.0–2.2mm',
    thicknessMm: 2.1,
    temper: 'Structured Firm',
    hardware: 'Sand-Cast Brass D-Rings',
    portOfOrigin: 'Karachi Port / Air',
    status: 'In Stock (Outlet)',
    outletPriceUsd: 340,
    b2bTier1Usd: 195,
    b2bTier2Usd: 165,
    moq: 15,
    unitLabel: 'pcs',
    image: bagWeekenderImg,
    imageAlt: 'Hand-stitched cognac vegetable-tanned leather weekender duffel bag with brass buckles',
    description:
      'Full-length harness girth straps, hand-burnished beeswax edges, and solid brass foot studs built for decades of transit.',
  },
  {
    id: 'art-804',
    sku: 'ART-804',
    title: 'Export Attache Briefcase',
    category: 'saddlery',
    leatherType: 'Hot-Stuffed Bridle Shoulder',
    tanningMethod: '100% Mimosa & Quebracho',
    thicknessLabel: '2.2–2.4mm',
    thicknessMm: 2.3,
    temper: 'Rigid Archival',
    hardware: 'Swiss-Spec Brass Clasp',
    portOfOrigin: 'Sialkot Dry Port',
    status: 'Export Only',
    outletPriceUsd: 310,
    b2bTier1Usd: 178,
    b2bTier2Usd: 152,
    moq: 20,
    unitLabel: 'pcs',
    image: bagAttacheImg,
    imageAlt: 'Dark chestnut bridle leather attache briefcase with solid brass clasp',
    description:
      'Box-stitched gusset construction with unlined fleshed interior, internal folio divider, and precision-machined brass lock.',
  },
  {
    id: 'art-805',
    sku: 'ART-805',
    title: 'Oiled Pull-Up Side Rolls',
    category: 'hides',
    leatherType: 'Full-Grain Pull-Up Cowhide',
    tanningMethod: 'Tallow & Wax Fat-Liquored',
    thicknessLabel: '1.6–1.8mm',
    thicknessMm: 1.7,
    temper: 'Medium Waxy',
    hardware: '22–26 Sq. Ft. Avg Side',
    portOfOrigin: 'Karachi Sea Freight',
    status: 'Export Only',
    outletPriceUsd: 145,
    b2bTier1Usd: 92,
    b2bTier2Usd: 78,
    moq: 30,
    unitLabel: 'sides',
    image: hidePullupImg,
    imageAlt: 'Three rolled full-grain pull-up cowhide hides in espresso, cognac, and russet tones',
    description:
      'Tannery-direct export sides graded Grade-A/B for footwear, bags, and small leather goods with uniform fat-liquor saturation.',
  },
  {
    id: 'art-806',
    sku: 'ART-806',
    title: 'Bridle Shoulder & Gauge Lot',
    category: 'hides',
    leatherType: 'Heavy Saddle Shoulder',
    tanningMethod: 'Slow Pit Vegetable Tan',
    thicknessLabel: '3.2–3.6mm',
    thicknessMm: 3.4,
    temper: 'Heavy Harness Firm',
    hardware: 'REACH & LWG Audited',
    portOfOrigin: 'Karachi / Air Courier',
    status: 'Sample Lot',
    outletPriceUsd: 185,
    b2bTier1Usd: 118,
    b2bTier2Usd: 98,
    moq: 20,
    unitLabel: 'shoulders',
    image: hideBridleImg,
    imageAlt: 'Stacked vegetable-tanned bridle leather swatches with brass thickness gauge caliper',
    description:
      'Bench-graded 8–10 oz heavy shoulders split to ±0.1mm tolerance for belts, equestrian tack, and structured holsters.',
  },
];

export interface HideGradeSpec {
  lotCode: string;
  hideName: string;
  tanning: string;
  substance: string;
  temper: string;
  moq: string;
  leadTime: string;
}

export const HIDE_GRADE_SPECS: HideGradeSpec[] = [
  {
    lotCode: 'LOT-FG-12',
    hideName: 'Full-Grain Drum Cowhide',
    tanning: 'Chrome-Free / REACH',
    substance: '1.2–1.4 mm',
    temper: 'Medium Supple',
    moq: '25 Units / 500 Sq.Ft',
    leadTime: '18 Days FOB',
  },
  {
    lotCode: 'LOT-PU-16',
    hideName: 'Oiled Pull-Up Aniline Side',
    tanning: 'Wax & Tallow Retanned',
    substance: '1.6–1.8 mm',
    temper: 'Medium Waxy',
    moq: '30 Sides',
    leadTime: '14 Days FOB',
  },
  {
    lotCode: 'LOT-VB-22',
    hideName: 'Pit-Tanned Bridle Butt',
    tanning: '100% Mimosa Vegetable',
    substance: '2.0–2.4 mm',
    temper: 'Structured Firm',
    moq: '20 Units / 400 Sq.Ft',
    leadTime: '24 Days FOB',
  },
  {
    lotCode: 'LOT-SH-34',
    hideName: 'Heavy Saddlery Shoulder',
    tanning: 'Slow Pit Oak & Bark',
    substance: '3.2–3.6 mm',
    temper: 'Heavy Harness',
    moq: '20 Shoulders',
    leadTime: '21 Days FOB',
  },
];
