import Navbar from "@/Components/Navbar";
import Hero from "@/Components/Hero";
import BookingFilter from "@/Components/BookingFilter";
import FeaturedCars from "@/Components/FeaturedCars";
import WhyChooseUs from "@/Components/WhyChooseUs";
import HowItWorks from "@/Components/HowItWorks";
import Testimonials from "@/Components/Testimonials";
import NewsTicker from "@/Components/NewsTicker";
 

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090d16]">
      
       
             <NewsTicker />
          
      <Hero />
      <BookingFilter />
         
      <FeaturedCars />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}