export type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  size: string;
  image: string;
  family: 'floral' | 'woody' | 'oriental';
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  concentration: 'eau_de_toilette' | 'eau_de_parfum' | 'parfum';
}

export type CartItem = {
  product: Product;
  quantity: number;
}

export type ScentFamily = {
  id: string;
  name: string;
  description: string;
  image: string;
}

export type NavItem = {
  label: string;
  href: string;
}
