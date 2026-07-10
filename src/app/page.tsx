import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Technologies } from '@/components/sections/Technologies';
import { Portfolio } from '@/components/sections/Portfolio';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { JsonLd } from '@/components/JsonLd';
import { servicesJsonLd } from '@/lib/jsonld';

export default function HomePage() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Technologies />
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
