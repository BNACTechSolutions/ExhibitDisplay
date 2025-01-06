import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import Logo from "@/components/Logo";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <Bounded as="header" className="py-4  md:py-6 lg:py-8 bg-[#b5a6ca]">
      <div className="flex gap-4 items-center justify-between sm:flex-row flex-col">
        <Link href="/">
          Nandankanan Zoo
        </Link>
        <nav>
          <ul className="flex">
            {settings.data.navigation.map(({ label, link }) => (
              <li key={label}>
                <PrismicNextLink field={link} className="p-3">
                  {label}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
}
