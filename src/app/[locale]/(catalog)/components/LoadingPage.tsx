import Image from "next/image";

import logo_light from "@P/brand/logo_banner_light.webp";
import logo_dark from "@P/brand/logo_banner_dark.webp";

export default function LoadingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <Image className="hidden dark:block mx-auto mb-5" src={logo_dark} width={100} height={0} alt="Imperator"></Image>
        <Image className="block dark:hidden mx-auto mb-5" src={logo_light} width={100} height={0} alt="Imperator"></Image>
        <h1 className="m-0 p-0 text-center dark:text-white">Cargando...</h1>
      </div>
    </div>
  );
}