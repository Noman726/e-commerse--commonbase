'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Search, Shield, Lock } from 'lucide-react';
import { useState } from 'react';

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      joined: '2024-01-15',
      orders: 5,
      totalSpent: '$1,245.99',
      role: 'Customer',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Emily Davis',
      email: 'emily@example.com',
      joined: '2024-02-10',
      orders: 3,
      totalSpent: '$789.50',
      role: 'Customer',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Jessica Brown',
      email: 'jessica@example.com',
      joined: '2024-02-20',
      orders: 8,
      totalSpent: '$2,156.75',
      role: 'VIP Customer',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Amanda White',
      email: 'amanda@example.com',
      joined: '2024-03-01',
      orders: 1,
      totalSpent: '$156.25',
      role: 'Customer',
      status: 'Inactive',
    },
    {
      id: 5,
      name: 'Michelle Lee',
      email: 'michelle@example.com',
      joined: '2024-03-05',
      orders: 12,
      totalSpent: '$3,456.00',
      role: 'VIP Customer',
      status: 'Active',
    },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Users</h1>
        <p className="text-muted-foreground">Manage customer accounts and permissions</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left py-3 px-6 font-semibold">Name</th>
                <th className="text-left py-3 px-6 font-semibold">Email</th>
                <th className="text-left py-3 px-6 font-semibold">Joined</th>
                <th className="text-left py-3 px-6 font-semibold">Orders</th>
                <th className="text-left py-3 px-6 font-semibold">Total Spent</th>
                <th className="text-left py-3 px-6 font-semibold">Role</th>
                <th className="text-left py-3 px-6 font-semibold">Status</th>
                <th className="text-center py-3 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold">{user.name}</td>
                  <td className="py-4 px-6 text-muted-foreground">{user.email}</td>
                  <td className="py-4 px-6 text-muted-foreground">{user.joined}</td>
                  <td className="py-4 px-6">{user.orders}</td>
                  <td className="py-4 px-6 font-semibold">{user.totalSpent}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {user.role === 'VIP Customer' && (
                        <Shield size={16} className="text-accent" />
                      )}
                      <span className="text-sm">{user.role}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Lock size={16} />
                        <span className="hidden sm:inline">Reset</span>
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
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
}
