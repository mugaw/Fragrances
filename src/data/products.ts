import type { Product, ScentFamily } from '@/types';

export const products: Product[] = [
  {
    id: 'noir-petal',
    name: 'Noir Petal',
    subtitle: 'Signature Collection',
    description: 'A portrait of contrast—dark glass, bright bloom. Built for evenings that turn into stories.',
    price: 285,
    size: '100ml',
    image: '/images/bottle_noir_petal.jpg',
    family: 'floral',
    notes: {
      top: ['Bergamot', 'Pink Pepper', 'Saffron'],
      heart: ['Rose de Mai', 'Jasmine Sambac', 'Iris'],
      base: ['Patchouli', 'Amber', 'Vanilla']
    },
    concentration: 'eau_de_parfum'
  },
  {
    id: 'silhouette',
    name: 'Silhouette',
    subtitle: 'Craft & Composition',
    description: 'Minimal lines, maximum presence. A structure designed to catch candlelight and hold the room.',
    price: 320,
    size: '100ml',
    image: '/images/bottle_silhouette.jpg',
    family: 'woody',
    notes: {
      top: ['Grapefruit', 'Cardamom', 'Nutmeg'],
      heart: ['Cedarwood', 'Sandalwood', 'Vetiver'],
      base: ['Oud', 'Musk', 'Tonka Bean']
    },
    concentration: 'parfum'
  },
  {
    id: 'velvet-hour',
    name: 'Velvet Hour',
    subtitle: 'Atmosphere',
    description: 'Soft, certain, intimate. A scent that moves with you—never louder than the moment.',
    price: 265,
    size: '100ml',
    image: '/images/bottle_velvet_hour.jpg',
    family: 'oriental',
    notes: {
      top: ['Mandarin', 'Blackcurrant', 'Cinnamon'],
      heart: ['Orange Blossom', 'Honey', 'Incense'],
      base: ['Amber', 'Labdanum', 'Benzoin']
    },
    concentration: 'eau_de_parfum'
  }
];

export const scentFamilies: ScentFamily[] = [
  {
    id: 'floral',
    name: 'Floral',
    description: 'Fresh stems, velvet petals, soft pollen.',
    image: '/images/scent_floral.jpg'
  },
  {
    id: 'woody',
    name: 'Woody',
    description: 'Dry cedar, warm resins, quiet smoke.',
    image: '/images/scent_woody.jpg'
  },
  {
    id: 'oriental',
    name: 'Oriental',
    description: 'Spice, amber, and late-night conversation.',
    image: '/images/scent_oriental.jpg'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByFamily = (family: string): Product[] => {
  return products.filter(p => p.family === family);
};
