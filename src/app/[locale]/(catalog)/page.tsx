import { Metadata } from 'next';
import ImageSlider from './components/home/Imageslider';
import Descr from './components/home/Description';
import CategoryGrid from './components/home/categories/CategoryGrid';
import ProductCarousel from './components/home/ProductCarousel';
import ProductList from './components/products/Productlist';
import { webAppProps } from '@/app/utils/utils';

export async function generateMetadata(): Promise<Metadata> {
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
      <CategoryGrid />
      <ProductCarousel title="home"/>
      <ProductList name='allProds' items={[]} loadSub={true} />
    </main>
  );
}
