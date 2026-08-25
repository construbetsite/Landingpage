import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, COMPANY_INFO } from '../../config/constants';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  canonical?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Há mais de 45 anos a Construbet oferece materiais para construção, acabamento, pisos, ferramentas e muito mais em Betim e região. Qualidade, tradição e entrega rápida.',
  keywords = 'materiais de construção betim, loja de construção betim, cimento betim, porcelanato betim, ferramentas betim, acabamento betim, construbet',
  image,
  url,
  type = 'website',
  canonical,
  author = 'Construbet',
  publishedTime,
  modifiedTime,
  noIndex = false,
  jsonLd,
}) => {
  const siteTitle = title
    ? title.includes('Construbet')
      ? title
      : `${title} | Construbet`
    : 'Construbet | Materiais para Construção em Betim - MG';

  const fullCanonical = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : typeof window !== 'undefined'
      ? window.location.href
      : SITE_URL;

  const fullUrl = url
    ? url.startsWith('http')
      ? url
      : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`
    : fullCanonical;

  const fullImage = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`
    : `${SITE_URL}/logo.webp`;

  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      <link rel="canonical" href={fullCanonical} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="author" content={author} />
      <meta name="geo.region" content="BR-MG" />
      <meta name="geo.placename" content="Betim" />
      <meta name="geo.position" content="-19.9677;-44.1980" />
      <meta name="ICBM" content="-19.9677, -44.1980" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={COMPANY_INFO.name} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content="pt_BR" />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
