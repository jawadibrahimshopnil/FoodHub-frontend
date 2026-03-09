interface OrderItem {
   id: string;
   quantity: number;
   mealId: string;
   orderId: string;
}

export interface Order {
   id: string;
   status: 'PLACED' | "PREPARING" | "CANCELLED" | "READY" | "DELIVERED";
   total_price: number;
   orderDate: Date;
   address: string;
   userId: string;
   providerId: string;
   items: OrderItem[];
}