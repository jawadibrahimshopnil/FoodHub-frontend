"use client";

import React, { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Store, MapPin, AlignLeft, Save, Loader2, Image as ImageIcon, Plus, X } from "lucide-react";
import Image from "next/image";
import { updateProviderProfileAction } from "@/action/provider.action";

const providerSchema = z.object({
  name: z.string().min(3, "Business name must be at least 3 characters").max(50),
  address: z.string().min(5, "Please provide a more specific address").or(z.literal("")),
  phone: z.string().max(15, "Phone is too long").or(z.literal("")),
  photoUrl: z.string().or(z.literal("")),
});

const Kitchen_Profile = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      address: formData.get("address"),
      photoUrl: formData.get("photoUrl"),
      phone: formData.get("phone"),
    };

    // 1. Validate Text Fields
    const validation = providerSchema.safeParse(payload);
    if (!validation.success) {
      toast.error("Validation Error", { description: validation.error.issues[0].message });
      setLoading(false);
      return; 
    }

    const toastId = toast.loading("Syncing kitchen data...");

    try {
      const res = await updateProviderProfileAction({
        ...validation.data,
      });

      if (res.success) {
        toast.success("Profile Live", { id: toastId, description: "Your kitchen registry is updated." });
      } else {
        toast.error("Sync Failed", { id: toastId, description: res.message });
      }
    } catch (error: unknown) {
     let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error("Process Failed", { 
        id: toastId, 
        description: errorMessage 
      });

      console.error("KITCHEN_PROFILE_UPDATE_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
          <span className="text-blue-500 text-outline">Create </span> Your Kitchen
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">
          Identity & Visual Manifest
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
          {/* Business Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
              <Store size={14} /> Kitchen Name
            </label>
            <input name="name" placeholder="e.g. Spice Route" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-all" />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
              <MapPin size={14} /> Location
            </label>
            <input name="address" placeholder="Area, Dhaka" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-all" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
              <AlignLeft size={14} /> Mobile
            </label>
            <input name="phone" placeholder="Mobile Number..." className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-all resize-none" />
          </div>

          {/* photourl */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
              <ImageIcon size={14} /> PhotoUrl
            </label>
            <input name="photoUrl" placeholder="Enter photo url for cover..." className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-all resize-none" />
          </div>
        </div>

        <button disabled={loading} className="h-14 px-10 bg-slate-900 text-white rounded-xl font-black uppercase text-[11px] tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Sync Registry</>}
        </button>
      </form>
    </div>
  );
};

export default Kitchen_Profile;