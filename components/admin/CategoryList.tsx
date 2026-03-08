/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Edit3, Trash2, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import EditCategoryForm from "./EditCategoryForm";
import { deleteCategoryAction } from "@/action/category.action";

export default function CategoryList({ initialCategories = [] }: { initialCategories: Record<string, any>[] }) {
  const [categories, setCategories] = useState<Record<string, any>[]>(initialCategories);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const handleDelete = (id: string, name: string) => {
    toast(`Delete Category: ${name}?`, {
      description: "Are you sure? This will remove the category permanently.",
      className: "rounded-[2rem] p-6 shadow-2xl border-2 border-slate-50",
      action: {
        label: "Confirm Delete",
        onClick: async () => {
          const tid = toast.loading(`Deleting ${name}...`);
          
          try {
            const res = await deleteCategoryAction(id);
            
            if (res.success) {
              toast.success("Category removed successfully!", { id: tid });
              setCategories((prev) => prev.filter((cat) => cat.id !== id));
            } else {
              toast.error(res.message || "Unauthorized or Delete failed!", { 
                id: tid,
                duration: 5000,
                icon: <Info className="text-rose-500" size={18} />
              });
            }
          } catch (error) {
            toast.error("Network error! Could not connect to server.", { id: tid });
          }
        },
      },
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="hidden md:block bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-white">
            <tr className="text-[10px] font-black uppercase tracking-[0.2em]">
              <th className="p-8">Cuisine Name</th>
              <th className="p-8 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {categories.map((cat) => (
              <tr key={cat.id} className="group hover:bg-blue-50/40 transition-all duration-300">
                <td className="p-8">
                  <p className="font-black text-slate-800 text-xl tracking-tighter uppercase italic group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </p>
                  <span className="text-[9px] font-bold text-slate-300 tracking-widest uppercase">
                    Ref ID: {cat.id.slice(-8)}
                  </span>
                </td>
                <td className="p-8">
                  <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Dialog open={openId === cat.id} onOpenChange={(io) => setOpenId(io ? cat.id : null)}>
                      <DialogTrigger asChild>
                        <button className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-2xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                          <Edit3 size={18} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[3rem] p-10 border-none shadow-2xl max-w-lg bg-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic text-slate-900">Modify Category</DialogTitle>
                        </DialogHeader>
                        <EditCategoryForm category={cat} onClose={() => setOpenId(null)} />
                      </DialogContent>
                    </Dialog>

                    <button 
                      onClick={() => handleDelete(cat.id, cat.name)} 
                      className="h-12 w-12 flex items-center justify-center bg-rose-50 rounded-2xl text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center justify-between shadow-xl shadow-slate-100/30">
            <div className="flex items-center gap-5">
               <h3 className="font-black text-slate-800 uppercase text-xs tracking-tight">{cat.name}</h3>
            </div>
            <div className="flex gap-2">
               <button onClick={() => setOpenId(cat.id)} className="p-3 bg-slate-50 rounded-xl text-slate-400"><Edit3 size={16}/></button>
               <button onClick={() => handleDelete(cat.id, cat.name)} className="p-3 bg-rose-50 rounded-xl text-rose-400"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50 rounded-[4rem] border-4 border-dashed border-slate-100">
           <AlertCircle className="text-slate-200 w-16 h-16 mb-4" />
           <p className="text-slate-300 font-black uppercase tracking-widest text-xs">No entries in the registry</p>
        </div>
      )}
    </div>
  );
}