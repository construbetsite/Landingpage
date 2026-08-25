/**
 * Constantes corporativas e configurações globais da Construbet
 */

export const COMPANY_PHONE = import.meta.env.VITE_COMPANY_PHONE || '553184630800';
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || COMPANY_PHONE;
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://site.construbet.com.br';
export const ECOMMERCE_URL = import.meta.env.VITE_ECOMMERCE_URL || 'https://www.construbet.com.br';

export const COMPANY_INFO = {
  name: 'Construbet',
  legalName: 'Construbet Materiais de Construção LTDA',
  phone: COMPANY_PHONE,
  phoneFormatted: '(31) 8463-0800',
  phoneTel: `tel:+${COMPANY_PHONE}`,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappFormatted: '(31) 8463-0800',
  email: 'contato@construbet.com.br',
  address: {
    street: 'Av. Gabriel Passos, 271',
    neighborhood: 'Centro',
    city: 'Betim',
    state: 'MG',
    postalCode: '32510-000',
    country: 'BR',
    full: 'Av. Gabriel Passos, 271 - Centro, Betim - MG, 32510-000',
  },
  geo: {
    latitude: -19.9677,
    longitude: -44.1980,
  },
  siteUrl: SITE_URL,
  ecommerceUrl: ECOMMERCE_URL,
} as const;

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/construbet',
  facebook: 'https://www.facebook.com/construbetltda/',
  youtube: 'https://www.youtube.com/channel/UCU7Qa14gscX1fdRKrG98AvQ/videos',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Gostaria de mais informações sobre os produtos e serviços da Construbet.';

/**
 * Gera mensagem de WhatsApp para um produto específico
 */
export function getProductWhatsAppMessage(productName: string, productUrl?: string): string {
  const url = productUrl || (typeof window !== 'undefined' ? window.location.href : SITE_URL);
  return `Olá! Gostaria de mais informações sobre o produto "${productName}" – vi no site.\n\nLink: ${url}`;
}

/**
 * Gera a URL completa para contato via WhatsApp com mensagem codificada
 */
export function generateWhatsAppLink(
  message: string = DEFAULT_WHATSAPP_MESSAGE,
  phone: string = WHATSAPP_NUMBER
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
