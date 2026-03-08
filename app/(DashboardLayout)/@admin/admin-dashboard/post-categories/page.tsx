"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Sparkles, Hash } from "lucide-react";
import { createCategoryAction } from "@/action/category.action";

export default function PostCategories() {

  const categorySchema = z.object({
    name: z.string().min(1, "Name required").min(3, "Too short!"),
  });

  const form = useForm({
    defaultValues: { name: "" },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Processing...");

      try {
        const result = await createCategoryAction({ name: value.name});

        if (result.success) {
          toast.success("Success! Category is live.", { id: toastId });
          form.reset();
        } else {
          toast.error(result.message, { id: toastId });
        }
      } catch (error) {
        toast.error("Process failed.", { id: toastId });
      }
    },
  });

  return (
    <div className="p-6 md:p-20 min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Info */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} />
            Administrator Panel
          </div>
          <h1 className="text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter">
            Add New <br /> <span className="text-blue-500">Category.</span>
          </h1>
          <p className="text-slate-500 font-bold text-lg max-w-sm">
            Define the visual identity and naming for your new food classifications.
          </p>
          
          <div className="pt-10 flex items-center gap-4">
             <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold">01</div>
             <p className="text-sm font-black text-slate-400 uppercase tracking-widest">General Configuration</p>
          </div>
        </div>

        {/* Right Side: The Form (Cardless Approach) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-12"
        >
          {/* Name Input */}
          <form.Field name="name" validators={{ onChange: categorySchema.shape.name }}>
            {(field) => (
              <div className="group space-y-4">
                <div className="flex items-center gap-2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Hash size={18} />
                  <Label className="text-sm font-black uppercase tracking-widest">Cuisine Name</Label>
                </div>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Continental"
                  className="h-20 text-3xl font-black bg-transparent border-0 border-b-4 border-slate-100 rounded-none px-0 focus-visible:ring-0 focus:border-blue-500 transition-all placeholder:text-slate-200"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs font-bold text-red-500 uppercase tracking-tighter">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Submit */}
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                disabled={!canSubmit || isSubmitting}
                className="w-full h-24 rounded-[2.5rem] bg-slate-900 hover:bg-blue-600 text-white text-xl font-black uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95 disabled:opacity-20"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Commit Category"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}