import { Metadata } from 'next';
import { webAppProps } from '@/app/utils/utils';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  const title = `${webAppProps.name} - Catálogo de productos`;
  const description = webAppProps.catalogDescription;
  const keywords = webAppProps.catalogKeywords;
  const ogImages = webAppProps.ogImages;

  return {
    title,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': `/${locale}`
      }
    },
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      images: ogImages
    }
  };
}

export default function Home() {
  return (
     ""
  );
}
