import { mealService } from "@/service/meal.service";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Filter, ChevronLeft, ChevronRight, MapPin, UtensilsCrossed, Leaf } from "lucide-react";
import AddToCartButton from "@/components/meals/AddToCartButton";

export default async function AllMealsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    cuisine?: string;
    dietary?: string;
  }>;
}) {
  const { page, cuisine, dietary } = await searchParams;
  const currentPage = Number(page) || 1;

  const { data: meals, meta, error } = await mealService.getAllMeals({
    page: currentPage,
    limit: 8,
    cuisine,
    dietary,
  });

  if (error) return <div className="py-20 text-center text-red-500 font-bold">Error: {error.message}</div>;

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Header & Filter Bar */}
      <div className="bg-white border-b border-gray-100 py-10 mb-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-black mb-6 text-gray-900">Explore <span className="text-blue-600">All Meals</span></h1>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-[10px] font-black flex items-center gap-2 tracking-widest">
              <Filter className="h-3.5 w-3.5" /> FILTERS
            </div>

            {["Bengali", "Italian", "Chinese"].map((item) => (
              <Link
                key={item}
                href={`/meals?cuisine=${item}`}
                className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${cuisine === item ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-200 text-gray-600 hover:border-blue-600"}`}
              >
                {item}
              </Link>
            ))}

            <div className="h-4 w-[1px] bg-gray-200 mx-1" />

            {["Halal", "Vegan", "Gluten-Free", "Dairy-Free", "Vegetarian"].map((item) => (
              <Link
                key={item}
                href={`/meals?dietary=${item}`}
                className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${dietary === item ? "bg-green-600 border-green-600 text-white" : "bg-white border-gray-200 text-gray-600 hover:border-green-600"}`}
              >
                {item}
              </Link>
            ))}

            {(cuisine || dietary) && (
              <Link href="/meals" className="text-xs font-bold text-red-500 hover:underline ml-2">Reset</Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {!meals || meals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-40">
            <UtensilsCrossed className="h-16 w-16 mb-4" />
            <p className="text-xl font-bold">No meals found for this filter.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {meals.map((meal: Record<string, any>) => {

                return (
                  <div key={meal.id} className="group bg-white rounded-[2.5rem] p-3 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                    <Link href={`/meals/${meal.id}`}>
                      <div className="relative h-56 w-full rounded-[2rem] overflow-hidden">
                        <Image src={meal.photoUrl || "/placeholder.jpg"} alt={meal.name} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        {meal.mealDietaries?.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                           {meal.mealDietaries.map((item: any, index: number) => (
                              <div
                              key={index}
                              className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-black uppercase text-green-600"
                              >
                              <Leaf className="h-3 w-3" />
                              {item.dietary?.name}
                              </div>
                           ))}
                     </div>
                     )}
                      </div>
                    </Link>

                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">{meal.cuisine}</span>
                        <span className="text-lg font-black text-gray-900">৳{meal.price}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 truncate">{meal.name}</h3>
                      <div className="flex items-center gap-1 text-gray-400 text-[11px] font-bold truncate">
                        <MapPin className="h-3 w-3 text-blue-500" /> {meal.provider?.name}
                      </div>
                      <AddToCartButton
                        meal={meal}
                        className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-gray-100"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination UI - Using Number() to ensure type safety */}
            {meta && Number(meta.totalPage) > 1 && (
              <div className="flex justify-center items-center mt-16 gap-3">
                {currentPage > 1 && (
                  <Link 
                    href={`/meals?page=${currentPage - 1}${cuisine ? `&cuisine=${cuisine}` : ''}${dietary ? `&dietary=${dietary}` : ''}`}
                    className="p-4 rounded-2xl bg-white border border-gray-100 hover:bg-blue-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Link>
                )}
                
                {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/meals?page=${pageNum}${cuisine ? `&cuisine=${cuisine}` : ''}${dietary ? `&dietary=${dietary}` : ''}`}
                    className={`h-12 w-12 flex items-center justify-center rounded-2xl font-black text-sm transition-all ${currentPage === pageNum ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-white text-gray-600 border border-gray-100"}`}
                  >
                    {pageNum}
                  </Link>
                ))}

                {currentPage < meta.totalPage && (
                  <Link 
                    href={`/meals?page=${currentPage + 1}${cuisine ? `&cuisine=${cuisine}` : ''}${dietary ? `&dietary=${dietary}` : ''}`}
                    className="p-4 rounded-2xl bg-white border border-gray-100 hover:bg-blue-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}