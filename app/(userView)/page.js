"use client";

import { lazy, Suspense, useEffect, useState } from "react";



const Hero = lazy(() => import("../components/homeComponents/Hero"));
const WhyBookshelf = lazy(() => import("../components/homeComponents/whyBookshelf"));
const FeaturedBook = lazy(() => import("../components/homeComponents/FeaturedBook"));
const BrowseCategory = lazy(() => import("../components/homeComponents/BrowseCategory"));
const Testimonial = lazy(() => import("../components/homeComponents/Testimonial"));
const OfferingToJoin = lazy(() => import("../components/homeComponents/OfferingToJoin"));


const LoadingSkeleton = () => (
  <div className="w-full py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="animate-pulse">
        <div className="h-96 bg-gray-800/50 rounded-2xl mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-gray-800/50 rounded-xl"></div>
          <div className="h-64 bg-gray-800/50 rounded-xl"></div>
          <div className="h-64 bg-gray-800/50 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
);


const LazySection = ({ children, sectionName }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" } 
    );

    const element = document.getElementById(`section-${sectionName}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [sectionName]);

  return (
    <div id={`section-${sectionName}`}>
      {isVisible ? children : <LoadingSkeleton />}
    </div>
  );
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="overflow-hidden">

      <Suspense fallback={<LoadingSkeleton />}>
        <Hero />
      </Suspense>


      <LazySection sectionName="why">
        <Suspense fallback={<LoadingSkeleton />}>
          <WhyBookshelf />
        </Suspense>
      </LazySection>

      <LazySection sectionName="featured">
        <Suspense fallback={<LoadingSkeleton />}>
          <FeaturedBook />
        </Suspense>
      </LazySection>

      <LazySection sectionName="browse">
        <Suspense fallback={<LoadingSkeleton />}>
          <BrowseCategory />
        </Suspense>
      </LazySection>

      <LazySection sectionName="testimonial">
        <Suspense fallback={<LoadingSkeleton />}>
          <Testimonial />
        </Suspense>
      </LazySection>

      <LazySection sectionName="offering">
        <Suspense fallback={<LoadingSkeleton />}>
          <OfferingToJoin />
        </Suspense>
      </LazySection>
    </div>
  );
}