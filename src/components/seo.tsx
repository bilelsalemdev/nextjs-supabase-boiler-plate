import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export function SEO({ 
  title, 
  description = 'Next.js Enterprise Boilerplate', 
  canonical,
  ogImage = '/og-image.png'
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  );
} 