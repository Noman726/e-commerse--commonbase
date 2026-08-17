'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/products';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: products[0].name,
      price: products[0].price,
      image: products[0].image,
      quantity: 1,
      size: 'M',
      color: 'White',
    },
    {
      id: '3',
      name: products[2].name,
      price: products[2].price,
      image: products[2].image,
      quantity: 1,
      size: 'M',
      color: 'Black',
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(0.1);
      setPromoCode('');
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const tax = (subtotal - discountAmount) * 0.1;
  const total = subtotal - discountAmount + tax;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground font-medium">Shopping Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl font-semibold mb-4">Your cart is empty</p>
            <p className="text-muted-foreground mb-8">
              Start shopping to add items to your cart
            </p>
            <Link href="/shop">
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border border-border rounded-lg p-4 md:p-6"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-secondary rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/products/${item.id}`}
                        className="hover:text-accent transition-colors"
                      >
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-3">
                        Size: {item.size} | Color: {item.color}
                      </p>
                    </div>

                    {/* Price */}
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} className="text-muted-foreground hover:text-destructive" />
                    </button>

                    <div className="flex items-center gap-2 border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-secondary transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-secondary transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Button */}
              <Link href="/shop">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Order Summary - Sticky on Desktop */}
            <div className="h-fit sticky top-24">
              <div className="border border-border rounded-lg p-6 space-y-6">
                <h2 className="text-xl font-bold">Order Summary</h2>

                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="text-sm"
                    />
                    <Button
                      onClick={applyPromo}
                      variant="outline"
                      className="flex-shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600">
                      {(discount * 100).toFixed(0)}% discount applied!
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">Try &quot;SAVE10&quot;</p>
                </div>

                {/* Pricing */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" className="w-full">
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90 h-12">
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Info */}
                <div className="text-xs text-muted-foreground space-y-2">
                  <p>✓ Free shipping on orders over $50</p>
                  <p>✓ Secure checkout</p>
                  <p>✓ 30-day returns</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
