import { Metadata } from 'next';
import ImageSlider from './components/home/Imageslider';
import Descr from './components/home/Description';
import { webAppProps } from '@/app/utils/utils';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  const title = `${webAppProps.name} - Catálogo de productos`;
  const description = webAppProps.catalogDescription;
  const keywords = webAppProps.catalogKeywords;
  const ogImages = webAppProps.ogImages;

  // Map StaticImageData[] to OGImageDescriptor[]
  const ogImageDescriptors = ogImages.map((img: { src: string; width?: number; height?: number }) => ({
    url: img.src,
    width: img.width,
    height: img.height,
  }));

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
      images: ogImageDescriptors
    }
  };
}

export default function Home() {
  return (
    <main>
      <ImageSlider />
      <Descr />
    </main>
  );
}
