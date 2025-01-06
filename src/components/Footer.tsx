import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Logo from "@/components/Logo";
import Bounded from "@/components/Bounded";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <Bounded as="footer" className="py-4 md:py-6 lg:py-8">
      <div className="flex sm:flex-row flex-col justify-between items-center gap-6">
        <Link href="/">
          Nandankanan Zoo
        </Link>
        <p className="text-xs">
          ©{new Date().getFullYear()} {settings.data.site_title}
        </p>
      
      </div>
    </Bounded>
  );
}
