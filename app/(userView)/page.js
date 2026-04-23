import BrowseCategory from "../components/homeComponents/BrowseCategory";
import FeaturedBook from "../components/homeComponents/FeaturedBook";
import Hero from "../components/homeComponents/Hero";
import OfferingToJoin from "../components/homeComponents/OfferingToJoin";
import Testimonial from "../components/homeComponents/Testimonial";
import WhyBookshelf from "../components/homeComponents/whyBookshelf";


export default function Home() {
  return (
    <div>
      <Hero />
      <WhyBookshelf />
      <FeaturedBook />
      <BrowseCategory />
      <Testimonial />
      <OfferingToJoin />
    </div>
  );
}
