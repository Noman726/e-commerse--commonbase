'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MapPin, Edit2 } from 'lucide-react';
import { products } from '@/lib/products';

export default function AccountDashboard() {
  const userInfo = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    joined: 'January 2023',
  };

  const addresses = [
    {
      id: 1,
      name: 'Home',
      address: '123 Main St, New York, NY 10001',
      default: true,
    },
    {
      id: 2,
      name: 'Work',
      address: '456 Park Ave, New York, NY 10022',
      default: false,
    },
  ];

  const recentOrders = [
    { id: '#2024-001234', date: 'March 15, 2024', total: '$245.99', status: 'Delivered' },
    { id: '#2024-001233', date: 'March 10, 2024', total: '$189.50', status: 'Delivered' },
  ];

  const wishlistItems = products.filter((p) => [1, 5, 9].includes(Number(p.id))).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit2 size={16} />
            Edit
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Full Name</label>
              <p className="font-semibold">{userInfo.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="font-semibold">{userInfo.email}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Phone</label>
              <p className="font-semibold">{userInfo.phone}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Member Since</label>
              <p className="font-semibold">{userInfo.joined}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Saved Addresses</h2>
          <Button variant="outline" size="sm">
            Add Address
          </Button>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-border rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex gap-3">
                <MapPin size={20} className="text-muted-foreground flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">{address.name}</p>
                  <p className="text-sm text-muted-foreground">{address.address}</p>
                  {address.default && (
                    <p className="text-xs bg-secondary px-2 py-1 rounded-full mt-2 w-fit">
                      Default Address
                    </p>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Orders</h2>
          <Link href="/account/orders">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{order.total}</p>
                <p className="text-sm text-green-600">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist Preview */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Heart size={24} />
            <h2 className="text-2xl font-bold">My Wishlist</h2>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="aspect-square bg-secondary rounded-lg mb-3 group-hover:bg-muted transition-colors"></div>
              <h3 className="font-semibold group-hover:text-accent transition-colors">
                {product.name}
              </h3>
              <p className="text-muted-foreground text-sm">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
