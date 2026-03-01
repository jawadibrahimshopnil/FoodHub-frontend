"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, UtensilsCrossed } from "lucide-react";


export default function ProviderCard({ provider }: { provider: Record<string, any> }) {
  return (
    <Link href={`/providers/${provider.id}`} className="group">
      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-56 w-full bg-blue-50 overflow-hidden">
          {provider.photoUrl ? (
            <Image
              src={provider.photoUrl}
              alt={provider.name}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-blue-200">
              <UtensilsCrossed className="h-12 w-12" />
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="h-3 w-3 text-blue-500 fill-current" />
            <span className="text-xs font-bold">{provider.rating > 0 ? provider.rating.toFixed(1) : "New"}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
            {provider.name}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 mt-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium truncate">{provider.address || "Location TBD"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}