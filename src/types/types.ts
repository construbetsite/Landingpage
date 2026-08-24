// Tipos existentes do blog (mantenha)

// Produtos
export type CommercialType = 'PICKUP' | 'ECOMMERCE';

export interface Product {
  id: string;
  categoryId: string | null;
  name: string;
  slug: string;
  sku: string | null;
  brand: string | null;
  shortDescription: string | null;
  description: string;
  commercialType: CommercialType;
  price: number | null;
  redirectUrl: string | null;
  imageUrl: string | null;
  imagePath: string | null;
  imageFilename: string | null;
  featured: boolean;
  displayOrder: number;
  active: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  parentId: string | null;
  active: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  categoryId?: string;
  commercialType?: CommercialType;
  active?: boolean;
  featured?: boolean;
}

export interface ProductCategoryFilters {
  active?: boolean;
  parentId?: string | null;
}