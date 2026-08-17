'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Trash2, Search } from 'lucide-react';
import { useState } from 'react';

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    {
      id: '#2024-001234',
      customer: 'Sarah Johnson',
      date: '2024-03-15',
      total: '$245.99',
      status: 'Delivered',
      items: 2,
    },
    {
      id: '#2024-001233',
      customer: 'Emily Davis',
      date: '2024-03-10',
      total: '$189.50',
      status: 'Shipped',
      items: 1,
    },
    {
      id: '#2024-001232',
      customer: 'Jessica Brown',
      date: '2024-03-05',
      total: '$312.75',
      status: 'Processing',
      items: 3,
    },
    {
      id: '#2024-001231',
      customer: 'Amanda White',
      date: '2024-03-01',
      total: '$156.25',
      status: 'Delivered',
      items: 1,
    },
    {
      id: '#2024-001230',
      customer: 'Michelle Lee',
      date: '2024-02-28',
      total: '$398.50',
      status: 'Delivered',
      items: 4,
    },
  ];

  const filteredOrders = orders.filter(
    (o) =>
      o.id.includes(searchQuery) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage and track customer orders</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          placeholder="Search by order ID or customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Orders Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left py-3 px-6 font-semibold">Order ID</th>
                <th className="text-left py-3 px-6 font-semibold">Customer</th>
                <th className="text-left py-3 px-6 font-semibold">Date</th>
                <th className="text-left py-3 px-6 font-semibold">Items</th>
                <th className="text-left py-3 px-6 font-semibold">Total</th>
                <th className="text-left py-3 px-6 font-semibold">Status</th>
                <th className="text-center py-3 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold font-mono text-sm">{order.id}</td>
                  <td className="py-4 px-6">{order.customer}</td>
                  <td className="py-4 px-6 text-muted-foreground">{order.date}</td>
                  <td className="py-4 px-6">{order.items}</td>
                  <td className="py-4 px-6 font-semibold">{order.total}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Eye size={16} />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-white gap-2">
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredOrders.length} of {orders.length} orders
      </div>
    </div>
  );
}
