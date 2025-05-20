import {useTranslations} from 'next-intl';
import Link from 'next/link';
import { Metadata } from 'next';
import { webAppProps } from '@/app/utils/utils';

export const metadata: Metadata = {
  title: `${webAppProps.name} - Catálogo de productos`,
  description: webAppProps.catalogDescription,
  keywords: webAppProps.catalogKeywords,
  openGraph: {
    title: webAppProps.name,
    description: webAppProps.catalogDescription,
    type: "website",
    images: webAppProps.ogImages
  }
}

export default function Home() {
  const t = useTranslations('HomePage');
  return (
     <Link href="/">{t('switchlang')}</Link>
  );
}
