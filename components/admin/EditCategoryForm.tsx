"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { updateCategoryAction } from "@/action/category.action";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: Record<string, any>;
  onClose: () => void;
}

export default function EditCategoryForm({ category, onClose }: Props) {
  const [name, setName] = useState(category.name);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return toast.error("Category name is required");
    
    setIsUpdating(true);
    const toastId = toast.loading("Processing changes...");

    try {
      const res = await updateCategoryAction(category.id, { 
        name
      });

      if (res.success) {
        toast.success("Registry updated!", { id: toastId });
        router.refresh();
        onClose();
      } else {
        toast.error("Failed to update database", { id: toastId });
      }
    } catch (error) {
      toast.error("System error", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-8">
      <div className="space-y-3">
        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-16 rounded-[1.25rem] border-slate-100 bg-slate-50 focus-visible:ring-blue-500 font-bold text-xl px-6"
        />
      </div>

      <Button type="submit" disabled={isUpdating} className="w-full h-16 rounded-[1.5rem] bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest transition-all">
        {isUpdating ? <Loader2 className="animate-spin" /> : "Commit Changes"}
      </Button>
    </form>
  );
}