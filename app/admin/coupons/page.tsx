'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit2, Plus, Search, Copy } from 'lucide-react';
import { useState } from 'react';

export default function AdminCouponsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const coupons = [
    {
      id: 1,
      code: 'SAVE10',
      discount: '10%',
      type: 'Percentage',
      used: 156,
      limit: 500,
      expiry: '2024-12-31',
      status: 'Active',
    },
    {
      id: 2,
      code: 'WELCOME20',
      discount: '$20',
      type: 'Fixed',
      used: 89,
      limit: 200,
      expiry: '2024-04-30',
      status: 'Active',
    },
    {
      id: 3,
      code: 'SPRING15',
      discount: '15%',
      type: 'Percentage',
      used: 234,
      limit: 1000,
      expiry: '2024-05-31',
      status: 'Active',
    },
    {
      id: 4,
      code: 'SUMMER25',
      discount: '25%',
      type: 'Percentage',
      used: 0,
      limit: 500,
      expiry: '2024-08-31',
      status: 'Scheduled',
    },
    {
      id: 5,
      code: 'OLDCODE',
      discount: '5%',
      type: 'Percentage',
      used: 450,
      limit: 500,
      expiry: '2024-02-28',
      status: 'Expired',
    },
  ];

  const filteredCoupons = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.discount.includes(searchQuery)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'Expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Coupons</h1>
          <p className="text-muted-foreground">Create and manage discount codes</p>
        </div>
        <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2 w-full md:w-auto">
          <Plus size={20} />
          Create Coupon
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          placeholder="Search by code or discount..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Coupons Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left py-3 px-6 font-semibold">Code</th>
                <th className="text-left py-3 px-6 font-semibold">Discount</th>
                <th className="text-left py-3 px-6 font-semibold">Type</th>
                <th className="text-left py-3 px-6 font-semibold">Used / Limit</th>
                <th className="text-left py-3 px-6 font-semibold">Expiry</th>
                <th className="text-left py-3 px-6 font-semibold">Status</th>
                <th className="text-center py-3 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className="border-b border-border hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <code className="font-mono font-semibold bg-secondary px-2 py-1 rounded">
                        {coupon.code}
                      </code>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Copy size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold">{coupon.discount}</td>
                  <td className="py-4 px-6">{coupon.type}</td>
                  <td className="py-4 px-6">
                    <div>
                      <span className="font-semibold">{coupon.used}</span>
                      <span className="text-muted-foreground"> / {coupon.limit}</span>
                      <div className="w-32 h-2 bg-secondary rounded-full mt-1">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{
                            width: `${(coupon.used / coupon.limit) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{coupon.expiry}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        coupon.status
                      )}`}
                    >
                      {coupon.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Edit2 size={16} />
                        <span className="hidden sm:inline">Edit</span>
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
        Showing {filteredCoupons.length} of {coupons.length} coupons
      </div>
    </div>
  );
}
