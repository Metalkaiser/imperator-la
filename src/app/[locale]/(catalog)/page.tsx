import {useTranslations} from 'next-intl';
import Link from 'next/link';
import Topmenu from "./components/topmenu";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
     <Link href="/">{t('switchlang')}</Link>
  );
}
