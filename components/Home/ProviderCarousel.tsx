"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProviderCarousel({ providers }: { providers: Record<string, any> }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* Navigation Buttons */}
      <div className="absolute -top-15 right-0 flex gap-3">
        <button 
          onClick={() => scroll("left")} 
          className="p-2 rounded-full border border-gray-200 bg-white hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={() => scroll("right")} 
          className="p-2 rounded-full border border-gray-200 bg-white hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
          aria-label="Scroll Right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-10"
      >
        {providers.map((provider: Record<string, any>) => (
          <Link 
            key={provider.id} 
            href={`/providers/${provider.id}`}
            className="flex-shrink-0 w-[300px] md:w-87.5 snap-start group/card"
          >
            <div className="h-full bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 flex flex-col">
              
              {/* Image Section with Logic for Nulls */}
              <div className="relative h-52 w-full bg-blue-50 overflow-hidden">
                {provider.photoUrl ? (
                  <img
                    src={provider.photoUrl}
                    alt={provider.name}
                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center text-blue-200 gap-2">
                    <UtensilsCrossed className="h-16 w-16" />
                    <span className="text-xs font-bold uppercase tracking-widest">No Cover Image</span>
                  </div>
                )}
                
              </div>

              {/* Info Section */}
              <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-gray-900 group-hover/card:text-blue-600 transition-colors truncate">
                    {provider.businessName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                    <span className="text-sm font-bold truncate">
                      {provider.address || "Dhaka, Bangladesh"}
                    </span>
                  </div>
                </div>

                {/* Footer of the Card */}
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Menu Items</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center group-hover/card:bg-blue-600 group-hover:text-white transition-all">
                    <ChevronRight className="h-5 w-5 text-blue-600 group-hover/card:text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}