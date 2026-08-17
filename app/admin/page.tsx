'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DollarSign, ShoppingCart, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { products } from '@/lib/products';

export default function AdminDashboard() {
  const analyticsCards = [
    {
      title: 'Total Revenue',
      value: '$24,500',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-accent',
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600',
    },
    {
      title: 'Total Customers',
      value: '892',
      change: '+5.1%',
      icon: Users,
      color: 'text-green-600',
    },
    {
      title: 'Conversion Rate',
      value: '3.8%',
      change: '+2.3%',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  const recentOrders = [
    { id: '#2024-001234', customer: 'Sarah Johnson', total: '$245.99', status: 'Delivered' },
    { id: '#2024-001233', customer: 'Emily Davis', total: '$189.50', status: 'Shipped' },
    { id: '#2024-001232', customer: 'Jessica Brown', total: '$312.75', status: 'Processing' },
  ];

  const topProducts = products.filter((p) => p.reviews > 100).slice(0, 5);

  const systemAlerts = [
    { type: 'warning', message: '5 low stock items need attention' },
    { type: 'info', message: 'New order notification' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your store overview.</p>
      </div>

      {/* System Alerts */}
      {systemAlerts.length > 0 && (
        <div className="space-y-2">
          {systemAlerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-4 rounded-lg border ${
                alert.type === 'warning'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <AlertCircle
                size={20}
                className={alert.type === 'warning' ? 'text-orange-600' : 'text-blue-600'}
              />
              <p
                className={alert.type === 'warning' ? 'text-orange-800' : 'text-blue-800'}
              >
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground">{card.title}</h3>
                <div className={`p-2 bg-secondary rounded-lg ${card.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">{card.value}</p>
                <p className="text-sm text-green-600">{card.change} from last month</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold">Total</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-secondary transition-colors">
                    <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4 font-semibold">{order.total}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/products" className="w-full">
              <Button variant="outline" className="w-full justify-start">
                Add New Product
              </Button>
            </Link>
            <Link href="/admin/orders" className="w-full">
              <Button variant="outline" className="w-full justify-start">
                View All Orders
              </Button>
            </Link>
            <Link href="/admin/users" className="w-full">
              <Button variant="outline" className="w-full justify-start">
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/coupons" className="w-full">
              <Button variant="outline" className="w-full justify-start">
                Create Coupon
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Top Selling Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Product</th>
                <th className="text-left py-3 px-4 font-semibold">Category</th>
                <th className="text-left py-3 px-4 font-semibold">Price</th>
                <th className="text-left py-3 px-4 font-semibold">Rating</th>
                <th className="text-left py-3 px-4 font-semibold">Reviews</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border hover:bg-secondary transition-colors"
                >
                  <td className="py-3 px-4 font-semibold">{product.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                  <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(product.rating) ? 'text-accent' : 'text-muted'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.reviews}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
