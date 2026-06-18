import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import CustomerInfo from "@/components/CustomerInfo";
import GallerySection from "@/components/GallerySection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import Contact from "@/components/Contact";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <CustomerInfo />
        <GallerySection />
        <ReviewsSection />
        <FAQSection />
        <Contact />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
