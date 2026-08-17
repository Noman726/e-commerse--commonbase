'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Truck, Package, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/products';

interface CheckoutFormState {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  deliveryMethod: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  cardName: string;
}

export default function CheckoutPage() {
  const [formState, setFormState] = useState<CheckoutFormState>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    deliveryMethod: 'standard',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (field: keyof CheckoutFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 2000);
  };

  const cartItems = [
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
  ];

  const deliveryMethods = [
    { id: 'standard', label: 'Standard Shipping (5-7 days)', price: 0 },
    { id: 'express', label: 'Express Shipping (2-3 days)', price: 15 },
    { id: 'overnight', label: 'Overnight Shipping', price: 35 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrice = deliveryMethods.find((m) => m.id === formState.deliveryMethod)?.price || 0;
  const tax = (subtotal + deliveryPrice) * 0.1;
  const total = subtotal + deliveryPrice + tax;

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Order number: #2024-001234
            <br />
            We&apos;ve sent a confirmation email to {formState.email}
          </p>
          <Link href="/">
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link href="/cart" className="hover:text-foreground transition-colors">
            Cart
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground font-medium">Checkout</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <Input
                      type="email"
                      value={formState.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Truck size={24} />
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">First Name</label>
                      <Input
                        value={formState.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Last Name</label>
                      <Input
                        value={formState.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Street Address</label>
                    <Input
                      value={formState.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main St"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">City</label>
                      <Input
                        value={formState.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">State</label>
                      <Input
                        value={formState.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="NY"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Zip Code</label>
                      <Input
                        value={formState.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="10001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Country</label>
                      <Input
                        value={formState.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        placeholder="United States"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Package size={24} />
                  Delivery Method
                </h2>
                <div className="space-y-3">
                  {deliveryMethods.map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:border-accent transition-colors"
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={method.id}
                        checked={formState.deliveryMethod === method.id}
                        onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                        className="cursor-pointer"
                      />
                      <span className="flex-1">
                        <span className="font-semibold">{method.label}</span>
                      </span>
                      <span className="font-semibold">
                        {method.price === 0 ? 'Free' : `+$${method.price}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Information */}
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Lock size={24} />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Cardholder Name</label>
                    <Input
                      value={formState.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Card Number</label>
                    <Input
                      value={formState.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                      <Input
                        value={formState.cardExpiry}
                        onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CVV</label>
                      <Input
                        value={formState.cardCVC}
                        onChange={(e) => handleInputChange('cardCVC', e.target.value)}
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary - Sticky on Desktop */}
            <div className="h-fit sticky top-24">
              <div className="border border-border rounded-lg p-6 space-y-6">
                <h2 className="text-xl font-bold">Order Summary</h2>

                {/* Product Preview */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                      <div className="relative w-16 h-16 flex-shrink-0 bg-secondary rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm line-clamp-2">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span>{deliveryPrice === 0 ? 'Free' : `$${deliveryPrice}`}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 h-12 font-semibold"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>

                {/* Security Info */}
                <p className="text-xs text-muted-foreground text-center">
                  ✓ Secure payment processing
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
