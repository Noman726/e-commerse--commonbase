'use client';

import Link from 'next/link';
import { useState } from 'react';
import { User, ShoppingBag, Settings, LogOut, Menu, X } from 'lucide-react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const accountLinks = [
    { href: '/account/dashboard', label: 'Dashboard', icon: User },
    { href: '/account/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/account/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">My Account</h1>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <nav className="space-y-2 sticky top-24">
              {accountLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <Icon size={20} className="group-hover:text-accent transition-colors" />
                    <span className="group-hover:text-accent transition-colors">{link.label}</span>
                  </Link>
                );
              })}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden w-full">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mb-6 p-2 hover:bg-secondary rounded-lg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isMobileMenuOpen && (
              <nav className="space-y-2 mb-6">
                {accountLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon size={20} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </nav>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
