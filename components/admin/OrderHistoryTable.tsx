/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronRight, Inbox, ArrowUpRight } from "lucide-react";
export default function OrderHistoryTable({ orders = [] }: { orders: Record<string , any>[] }) {

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">

      {/* 📊 Desktop Registry */}
      <div className="hidden lg:block bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">User ID</th>
              <th className="px-6 py-4 text-center">Provider ID</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => (
              <tr key={order.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-blue-600 transition-colors">{order.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700 text-sm leading-none">{order.userId}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700 text-sm leading-none">{order.providerId}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                    order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 font-black text-slate-900 text-sm italic">
                    ${order.total_price.toLocaleString()}
                    <ArrowUpRight size={14} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Registry (Cards) */}
      <div className="lg:hidden space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{order.id}</span>
                <h3 className="font-bold text-slate-800 text-base">{order.userId}</h3>
              </div>
              <p className="font-black text-slate-900 text-sm">${order.total_price}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border ${
                order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
              }`}>{order.status}</span>
              <button className="text-slate-400 hover:text-blue-500 flex items-center gap-1 text-[10px] font-black uppercase">
                View Log <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-slate-300">
          <Inbox size={40} strokeWidth={1} className="mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest">No matching records</p>
        </div>
      )}
    </div>
  );
}