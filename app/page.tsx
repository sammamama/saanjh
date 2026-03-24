import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import Rooms from "@/components/rooms";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Rooms />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
