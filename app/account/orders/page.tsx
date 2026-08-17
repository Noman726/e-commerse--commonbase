'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight, Download, RotateCcw } from 'lucide-react';
import { products } from '@/lib/products';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped';
  total: number;
  items: OrderItem[];
  trackingNumber: string;
}

export default function OrdersPage() {
  const orders: Order[] = [
    {
      id: '#2024-001234',
      date: 'March 15, 2024',
      status: 'Delivered',
      total: 245.99,
      trackingNumber: 'TRK123456789',
      items: [
        {
          id: '1',
          name: products[0].name,
          price: products[0].price,
          image: products[0].image,
          quantity: 1,
        },
        {
          id: '3',
          name: products[2].name,
          price: products[2].price,
          image: products[2].image,
          quantity: 1,
        },
      ],
    },
    {
      id: '#2024-001233',
      date: 'March 10, 2024',
      status: 'Delivered',
      total: 189.5,
      trackingNumber: 'TRK987654321',
      items: [
        {
          id: '5',
          name: products[4].name,
          price: products[4].price,
          image: products[4].image,
          quantity: 2,
        },
      ],
    },
    {
      id: '#2024-001232',
      date: 'March 5, 2024',
      status: 'Shipped',
      total: 312.75,
      trackingNumber: 'TRK555666777',
      items: [
        {
          id: '7',
          name: products[6].name,
          price: products[6].price,
          image: products[6].image,
          quantity: 1,
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-50';
      case 'Shipped':
        return 'text-blue-600 bg-blue-50';
      case 'Processing':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Order History</h2>
        <p className="text-muted-foreground">
          View and manage all your orders
        </p>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="border border-border rounded-lg overflow-hidden">
          {/* Order Header */}
          <div className="bg-secondary/50 p-6 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-lg font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-semibold">{order.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className={`font-semibold px-3 py-1 rounded-full text-sm inline-block ${getStatusColor(order.status)}`}>
                  {order.status}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Order Total</p>
                <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6">
            <h3 className="font-semibold mb-4">Items</h3>
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-secondary/50 rounded-lg"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 bg-background rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/products/${item.id}`} className="hover:text-accent transition-colors">
                      <p className="font-semibold">{item.name}</p>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-3">Tracking Information</h4>
                <p className="text-sm text-muted-foreground mb-2">Tracking Number</p>
                <p className="font-mono text-sm mb-4">{order.trackingNumber}</p>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <ChevronRight size={16} />
                  Track Package
                </Button>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-3">Quick Actions</h4>
                <div className="space-y-2 flex flex-col">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download size={16} />
                    Download Invoice
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <RotateCcw size={16} />
                    Return Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-semibold mb-4">No orders yet</p>
          <p className="text-muted-foreground mb-6">
            You haven&apos;t placed any orders yet. Start shopping!
          </p>
          <Link href="/shop">
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              Start Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
