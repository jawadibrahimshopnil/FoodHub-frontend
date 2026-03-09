/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Loader2, Sparkles, Hash, Globe, Leaf } from "lucide-react";
import { getAllCategoriesAction, getAllDietariesAction } from "@/action/category.action";
import { createMealAction } from "@/action/meal.action";


const mealSchema = z.object({
  name: z.string().min(3, "Title too short").max(40),
  description: z.string().min(10, "Description needs more detail"),
  photoUrl: z.string(),
  price: z.number().positive("Price must be a positive number"),
  categoryIds: z.string().min(1, "Select a category"),
  cuisine: z.string().min(1, "Cuisine region required (e.g. Bengali)"),
  dietaryIds: z.string().min(1, "Select a Dietary"),
});

export default function Menu_Management() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [dietaries, setDietaries] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategoriesAction().then((res: Record<string, any>) => { if (res) setCategories(res); });
    getAllDietariesAction().then((res) => { if (res) setDietaries(res); });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const tid = toast.loading("Syncing culinary asset to registry...");

    try {

      const formData = new FormData(e.currentTarget);
      const rawData = {
        name: formData.get("name")?.toString() || "",
        photoUrl: formData.get("photoUrl")?.toString() || "",
        description: formData.get("description")?.toString() || "",
        price: parseFloat(formData.get("price")?.toString() || "0"),
        categoryIds: formData.get("categoryId")?.toString() || "",
        cuisine: formData.get("cuisine")?.toString() || "",
        dietaryIds: formData.get("dietaryId")?.toString() || "",
      };

      const validation = mealSchema.safeParse(rawData);
      if (!validation.success) throw new Error(validation.error.issues[0].message);
      
      const res = await createMealAction({ ...validation.data });

      if (res.success) {
        toast.success("Success", { id: tid, description: `${rawData.name} is now live.` });
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Error", { id: tid, description: res.message });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registry Sync Failed";
      toast.error("Process Failed", { id: tid, description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-12 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left: Configuration Panel */}
        <div className="flex-1 space-y-10">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Meal <span className="text-blue-500">Creation.</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
              <Sparkles size={14} className="text-blue-500" /> New Inventory Entry
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 flex items-center gap-2 group-focus-within:text-blue-500 transition-colors">
                   <Hash size={12} /> Meal Title
                </label>
                <input name="name" placeholder="Kacchi Biryani Full" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 flex items-center gap-2 group-focus-within:text-blue-500 transition-colors">
                   $ Valuation
                </label>
                <input name="price" type="number" step="0.01" placeholder="450.00" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 group-focus-within:text-blue-500">Menu Category</label>
                <select name="categoryId" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Select Category Type</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
               <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 group-focus-within:text-blue-500">Menu Dietary</label>
                <select name="dietaryId" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Select Dietary Type</option>
                  {dietaries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 group-focus-within:text-blue-500 flex items-center gap-2">
                   <Globe size={12} /> Cuisine Region
                </label>
                <input name="cuisine" placeholder="e.g. Bengali, Chinese" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 group-focus-within:text-blue-500 flex items-center gap-2">
                 <Leaf size={12} /> PhotoUrl
              </label>
              <input name="photoUrl" placeholder="Enter photoUrl for meal" className="w-full h-14 bg-slate-50 border-slate-100 border rounded-2xl px-6 font-bold text-sm focus:bg-white focus:border-blue-500 outline-none transition-all" />
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 group-focus-within:text-blue-500 transition-colors">Description</label>
              <textarea name="description" rows={3} placeholder="Ingredients and flavor profile..." className="w-full p-6 bg-slate-50 border-slate-100 border rounded-3xl font-bold text-sm focus:bg-white focus:border-blue-500 outline-none transition-all resize-none" />
            </div>

            <button disabled={loading} className="w-full h-16 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-20 shadow-2xl shadow-slate-200">
              {loading ? <Loader2 className="animate-spin" /> : <><Plus size={18} /> Commit to Menu</> }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}