//page principale
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
// section à propos de nous
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders
          // subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Welcome to OnlyPans, where our menu is hotter than a skillet on high heat and our meals are so good, you'll forget about that other "Only" site. Here, you won't just find mouthwatering dishes; you might even find the cook himself. That's right, folks, OnlyPans is not just a name—it's a lifestyle.
            Let’s introduce the culinary dream team behind this gastronomic sensation:
          </p>
          <p>
            OnlyPans
            The one, the only, the legendary OnlyPans. This guy doesn't just cook; he creates symphonies on a plate. His mission? To bring you meals that are out of this world. 
            The dish names might sound strange, but one bite and you'll be hooked. It's not food; it's an experience. 
          </p>
          <p>
            CyberMaster
            The wizard behind the curtain, CyberMaster is the tech genius who catapulted our humble kitchen into a global phenomenon. With his super cyber skills, he ensures that our website runs smoother than melted butter. As they say, behind every great cook is a great team, and CyberMaster is the digital backbone of OnlyPans.
          </p>
          <p>
            CroustiBat
            Meet CroustiBat, the crispy king. He's the mastermind behind our irresistibly crunchy delights. Alongside AnneTonin and OnlyPans, CroustiBat crafts names for our culinary masterpieces that are as unique as their flavors. If it's crispy, it's CroustiBat-approved.
          </p>
            Human ChatGPT
            Our very own answer machine and fixer-upper, Human ChatGPT. If something breaks, he’s on it faster than you can say "gluten-free vegan brownie." No problem is too big, no question too small. He’s the hero we need, even if we don’t deserve him.
          <p>
            AnneTonin
            Last but certainly not least, we have AnneTonin. He’s the visionary behind the presentation of our creations and the curator of recipes that are worthy of OnlyPans’ kitchen. If it looks good enough to eat, you can bet AnneTonin had a hand in it.
          </p>
          <p>
            So, welcome to OnlyPans, where every meal is a masterpiece, every team member a legend, and every customer a connoisseur. 
            Grab a fork, dive in, and remember: at OnlyPans, we're not just serving food; we're serving magic on a plate.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+1800OnlyPan">
            +1 (800) OnlyPan (665-9726)
          </a>
        </div>
      </section>
    </>
  )
}
