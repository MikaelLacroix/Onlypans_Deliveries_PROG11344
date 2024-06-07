//Slogan and formatting for slogan
import Right from "@/components/icons/Right";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Making<br />
          food<br />
          delivery&nbsp;
          <span className="text-primary">
            Sexy
          </span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Onlypans is making cooking and delivering sexy 
        </p>
      </div>
      <div className="relative hidden md:block">
        <Image src={'/onlypanslogo.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
      </div>
    </section>
  );
}