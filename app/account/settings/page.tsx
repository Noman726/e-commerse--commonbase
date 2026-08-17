'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Lock, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promotions: true,
    newsletter: true,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lock size={24} />
          Change Password
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-semibold mb-2">Current Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">New Password</label>
            <div className="relative">
              <Input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm new password"
            />
          </div>

          <Button className="bg-foreground text-background hover:bg-foreground/90">
            Update Password
          </Button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Bell size={24} />
          Notification Preferences
        </h2>

        <div className="space-y-4 max-w-md">
          {[
            {
              key: 'email' as const,
              label: 'Email Notifications',
              description: 'Receive emails about your orders and account',
            },
            {
              key: 'sms' as const,
              label: 'SMS Notifications',
              description: 'Receive text messages about delivery updates',
            },
            {
              key: 'promotions' as const,
              label: 'Promotional Emails',
              description: 'Receive emails about sales and special offers',
            },
            {
              key: 'newsletter' as const,
              label: 'Newsletter',
              description: 'Subscribe to our weekly style tips and trends',
            },
          ].map((notification) => (
            <label
              key={notification.key}
              className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
            >
              <input
                type="checkbox"
                checked={notifications[notification.key]}
                onChange={() => handleNotificationChange(notification.key)}
                className="w-4 h-4 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-semibold">{notification.label}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Account Preferences */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Account Preferences</h2>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-semibold mb-2">Preferred Currency</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Language</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          <Button className="bg-foreground text-background hover:bg-foreground/90">
            Save Preferences
          </Button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="border border-destructive rounded-lg p-6 bg-destructive/5">
        <h2 className="text-2xl font-bold mb-2 text-destructive">Delete Account</h2>
        <p className="text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
          Delete My Account
        </Button>
      </div>
    </div>
  );
}
