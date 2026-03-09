"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { XCircle, Loader2, Search, Truck, ChefHat, CheckCircle, Clock, Sparkles  } from "lucide-react";
import { Order } from "@/app/types/orders";
import { getMyOrdersAction } from "@/action/order.action";

// --- Types ---
// status: 'PLACED' | "PREPARING" | "CANCELLED" | "READY" | "DELIVERED";
const STATUS_CONFIG = {
  PLACED: { color: "text-amber-500 bg-amber-50", icon: Clock, step: 0 },
  READY: { color: "text-blue-500 bg-blue-50", icon: CheckCircle, step: 1 },
  PREPARING: { color: "text-blue-500 bg-blue-50", icon: ChefHat, step: 2 },
  DELIVERED: { color: "text-emerald-500 bg-emerald-50", icon: Truck, step: 3 },
  CANCELLED: { color: "text-rose-500 bg-rose-50", icon: XCircle, step: -1 },
} as const;

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrdersAction();
      const ordersArray = Array.isArray(data) ? data : (data as { data?: Order[] })?.data || [];
      setOrders(ordersArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;

  return (
    <div className="p-6 md:p-12 max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            My <span className="text-blue-500">Orders.</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
            <Sparkles size={14} className="text-blue-500" /> Fulfillment History
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Order Id</TableHead>
              <TableHead className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</TableHead>
              <TableHead className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-slate-50/30 border-slate-50 transition-colors">
                <TableCell className="p-8">
                  <p className="font-black text-slate-900 tracking-tighter uppercase">#{order.id}</p>
                </TableCell>
                <TableCell className="p-8">
                  <p className="font-black text-slate-900 tracking-tighter uppercase">${order.total_price}</p>
                </TableCell>
                <TableCell className="p-8">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${STATUS_CONFIG[order.status].color}`}>
                    {React.createElement(STATUS_CONFIG[order.status].icon, { size: 12 })}
                    {order.status}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
