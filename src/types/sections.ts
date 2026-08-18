import type { LucideIcon } from "lucide-react";

export interface Promotion {
  id: string;
  name: string;
  image: string;
  badge: string;
  discount: string;
  oldPrice: string;
  price: string;
  externalLink: string;
  limitedStock?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

