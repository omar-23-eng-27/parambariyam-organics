import type { Category, Product, Combo } from '@/types';

export const mockCategories: Category[] = [
  { id: 'cat-1', slug: 'rice-grains',   name: { en: 'Rice & Grains',    ta: 'அரிசி & தானியங்கள்' } },
  { id: 'cat-2', slug: 'oils-ghee',     name: { en: 'Oils & Ghee',      ta: 'எண்ணெய் & நெய்' } },
  { id: 'cat-3', slug: 'spices',        name: { en: 'Spices & Masalas',  ta: 'மசாலாக்கள்' } },
  { id: 'cat-4', slug: 'pulses',        name: { en: 'Pulses & Lentils',  ta: 'பருப்பு வகைகள்' } },
  { id: 'cat-5', slug: 'sweeteners',    name: { en: 'Sweeteners',        ta: 'இனிப்பான்கள்' } },
  { id: 'cat-6', slug: 'flours',        name: { en: 'Flours',            ta: 'மாவு வகைகள்' } },
];

const inFuture = (days: number) =>
  new Date(Date.now() + days * 86400000).toISOString();

export const mockProducts: Product[] = [
  {
    id: 'prod-1', categoryId: 'cat-1', weight: '1 kg', isBestseller: true,
    name:        { en: 'Mapillai Samba Rice',         ta: 'மாப்பிள்ளை சம்பா அரிசி' },
    description: {
      en: 'Ancient warrior rice known for its high iron content and nutty flavour. Grown without pesticides in traditional paddy fields.',
      ta: 'அதிக இரும்புச் சத்து மற்றும் சுவைக்காக பிரபலமான பண்டைய வீர அரிசி. பூச்சிக்கொல்லி இல்லாமல் வளர்க்கப்படுகிறது.',
    },
    contains: {
      en: '100% organic Mapillai Samba paddy. No additives, no polishing.',
      ta: '100% இயற்கை மாப்பிள்ளை சம்பா நெல். கூடுதல் பொருட்கள் இல்லை.',
    },
    mrp: 180, offerPrice: 150, offerEndsAt: inFuture(7), stock: 40, image: '/images/hero.jpg',
  },
  {
    id: 'prod-2', categoryId: 'cat-1', weight: '500 g', isBestseller: false,
    name:        { en: 'Kavuni Black Rice',            ta: 'கவுனி கருப்பு அரிசி' },
    description: {
      en: 'Premium black sticky rice rich in antioxidants and anthocyanins. Traditionally served at weddings and festivals.',
      ta: 'ஆக்ஸிஜனேற்றிகள் நிறைந்த கருப்பு பிசின் அரிசி. திருமணங்களில் பாரம்பரியமாக பரிமாறப்படுகிறது.',
    },
    contains: {
      en: '100% organic Kavuni black rice. No processing agents.',
      ta: '100% இயற்கை கவுனி கருப்பு அரிசி.',
    },
    mrp: 220, stock: 25, image: '/images/hero.jpg',
  },
  {
    id: 'prod-3', categoryId: 'cat-1', weight: '1 kg', isBestseller: true,
    name:        { en: 'Kambu (Pearl Millet)',         ta: 'கம்பு' },
    description: {
      en: 'High-fibre pearl millet ideal for rotis, porridges, and traditional kanji. Cooling to the body.',
      ta: 'ரொட்டி, கூழ் மற்றும் பாரம்பரிய கஞ்சிக்கு ஏற்ற அதிக நார்ச்சத்துள்ள கம்பு. உடலுக்கு குளிர்ச்சி தரும்.',
    },
    contains: { en: 'Organic pearl millet grains.', ta: 'இயற்கை கம்பு.' },
    mrp: 90, stock: 60, image: '/images/hero.jpg',
  },
  {
    id: 'prod-4', categoryId: 'cat-2', weight: '500 ml', isBestseller: true,
    name:        { en: 'Cold-Pressed Coconut Oil',    ta: 'கோல்ட் ப்ரஸ் தேங்காய் எண்ணெய்' },
    description: {
      en: 'Wood-pressed virgin coconut oil retaining all natural aroma and nutrients. Ideal for cooking, hair, and skin.',
      ta: 'இயற்கை வாசனை மற்றும் சத்துக்களை தக்கவைக்கும் மரம் பீடிட்ட தேங்காய் எண்ணெய்.',
    },
    contains: { en: '100% organic coconut, cold-pressed. No refined oils.', ta: '100% இயற்கை தேங்காய்.' },
    mrp: 320, offerPrice: 280, offerEndsAt: inFuture(5), stock: 30, image: '/images/hero.jpg',
  },
  {
    id: 'prod-5', categoryId: 'cat-2', weight: '250 g', isBestseller: false,
    name:        { en: 'A2 Cow Ghee',                 ta: 'நாட்டு மாட்டு நெய் A2' },
    description: {
      en: 'Bilona-method ghee made from A2 milk of native Gir cows. Grainy texture, golden colour, rich aroma.',
      ta: 'தேசிய கிர் மாட்டின் A2 பால் பயன்படுத்தி பிலோனா முறையில் தயாரிக்கப்பட்ட நெய்.',
    },
    contains: { en: 'A2 cow milk cultured butter, slow-simmered. No additives.', ta: 'A2 மாட்டு வெண்ணெய்.' },
    mrp: 650, stock: 15, image: '/images/hero.jpg',
  },
  {
    id: 'prod-6', categoryId: 'cat-3', weight: '100 g', isBestseller: true,
    name:        { en: 'Organic Turmeric Powder',     ta: 'இயற்கை மஞ்சள் பொடி' },
    description: {
      en: 'High-curcumin Erode turmeric ground fresh. Vibrant colour, potent anti-inflammatory properties.',
      ta: 'அதிக குர்குமின் கொண்ட ஈரோடு மஞ்சளை புதிதாக அரைத்தது.',
    },
    contains: { en: '100% organic Erode turmeric. No colours or fillers.', ta: '100% இயற்கை ஈரோடு மஞ்சள்.' },
    mrp: 80, stock: 50, image: '/images/hero.jpg',
  },
  {
    id: 'prod-7', categoryId: 'cat-4', weight: '500 g', isBestseller: false,
    name:        { en: 'Green Moong Dal',             ta: 'பச்சை பயறு' },
    description: {
      en: 'Protein-rich whole green moong cultivated organically. Perfect for sprouts, soups, and curries.',
      ta: 'இயற்கை முறையில் பயிரிடப்பட்ட புரதச்சத்து நிறைந்த பச்சை பயறு.',
    },
    contains: { en: 'Organic whole green moong dal. No pesticides.', ta: 'இயற்கை பச்சை பயறு.' },
    mrp: 120, stock: 45, image: '/images/hero.jpg',
  },
  {
    id: 'prod-8', categoryId: 'cat-5', weight: '500 g', isBestseller: true,
    name:        { en: 'Palm Jaggery (Karuppatti)',   ta: 'கருப்பட்டி' },
    description: {
      en: 'Traditional palm sugar from Palmyra trees. Rich in iron and minerals. Natural sweetener for sweets, tea, and porridges.',
      ta: 'பனை மரத்திலிருந்து பாரம்பரிய கருப்பட்டி. இரும்பு மற்றும் தாதுக்கள் நிறைந்தது.',
    },
    contains: { en: 'Pure Palmyra palm sap, sun-dried. No sugar or chemicals.', ta: 'தூய பனை சாறு.' },
    mrp: 140, offerPrice: 120, offerEndsAt: inFuture(3), stock: 35, image: '/images/hero.jpg',
  },
  {
    id: 'prod-9', categoryId: 'cat-6', weight: '1 kg', isBestseller: false,
    name:        { en: 'Ragi (Finger Millet) Flour', ta: 'கேழ்வரகு மாவு' },
    description: {
      en: 'Stone-ground whole finger millet flour. Highest natural calcium content among grains.',
      ta: 'கல் அரைத்த கேழ்வரகு மாவு. தானியங்களில் அதிக இயற்கை கால்சியம்.',
    },
    contains: { en: '100% organic finger millet, stone-ground. No additives.', ta: '100% இயற்கை கேழ்வரகு.' },
    mrp: 110, stock: 0, image: '/images/hero.jpg',
  },
  {
    id: 'prod-10', categoryId: 'cat-6', weight: '500 g', isBestseller: false,
    name:        { en: 'Varagu (Kodo Millet)',        ta: 'வரகு' },
    description: {
      en: 'Antioxidant-rich kodo millet with a low glycemic index. Ideal for diabetics.',
      ta: 'குறைந்த கிளைசெமிக் குறியீட்டுடன் ஆக்ஸிஜனேற்றி நிறைந்த வரகு.',
    },
    contains: { en: 'Organic Kodo millet grains. Naturally gluten-free.', ta: 'இயற்கை வரகு.' },
    mrp: 100, stock: 20, image: '/images/hero.jpg',
  },
];

export const mockCombos: Combo[] = [
  {
    id: 'combo-1',
    name:        { en: 'Millet Starter Pack',         ta: 'சிறுதானிய தொடக்க தொகுப்பு' },
    description: {
      en: 'The perfect introduction to millets — includes Kambu, Ragi flour, and Varagu. Save ₹60 vs buying individually.',
      ta: 'சிறுதானியங்களுக்கான சிறந்த அறிமுகம் — கம்பு, கேழ்வரகு மாவு மற்றும் வரகு.',
    },
    productIds: ['prod-3', 'prod-9', 'prod-10'],
    comboPrice: 240, image: '/images/hero.jpg',
  },
  {
    id: 'combo-2',
    name:        { en: 'Kitchen Essentials Combo',    ta: 'சமையலறை அத்தியாவசிய தொகுப்பு' },
    description: {
      en: 'Daily cooking must-haves: Coconut Oil, Turmeric, and Green Moong Dal.',
      ta: 'அன்றாட சமையலுக்கு அவசியமானவை: தேங்காய் எண்ணெய், மஞ்சள் பொடி மற்றும் பச்சை பயறு.',
    },
    productIds: ['prod-4', 'prod-6', 'prod-7'],
    comboPrice: 460, image: '/images/hero.jpg',
  },
];
