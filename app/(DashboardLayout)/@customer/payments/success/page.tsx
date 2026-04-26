'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const router = useRouter();

  // Optional: auto redirect after a few seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push('/orders');
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-600 w-16 h-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. 
          Delicious food is on the way!
        </p>

        {/* Order Info */}
        {/* <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-gray-800">#FH-2026-00123</p>

          <p className="text-sm text-gray-500 mt-2">Estimated Delivery</p>
          <p className="font-semibold text-gray-800">30 - 45 minutes</p>
        </div> */}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push('/dashboard/my-orders')}
            className="bg-green-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Track Order
          </button>

          <button
            onClick={() => router.push('/')}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition"
          >
            Back to Home
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 mt-6">
          You will be redirected automatically in 5 seconds...
        </p>
      </div>
    </div>
  );
}