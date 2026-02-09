'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cartApi, orderApi } from '@/lib/api';
import { Cart } from '@/types';
// Removed unused imports
import { Trash2, ShoppingBag, Calendar, MapPin, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const [ordering, setOrdering] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartApi.getCart();
      if (!response.data) {
        throw new Error('Cart data missing');
      }
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (eventId: string) => {
    try {
      setRemoving(eventId);
      await cartApi.removeFromCart(eventId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setRemoving(null);
    }
  };

  const handleClearCart = async () => {
    try {
      await cartApi.clearCart();
      await fetchCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      setOrdering(true);
      await orderApi.createOrder();
      router.push(`/orders`);
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      setOrdering(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => {
      return sum + (item.event.registrationFee || 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary via-primary/80 to-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-500 border-t-transparent"></div>
      </div>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary via-primary/80 to-primary py-20 px-4">
      <div className="max-w-6xl mx-auto pt-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              My Cart
            </h1>
            <p className="text-white/60">
              {isEmpty ? 'Your cart is empty' : `${cart.items.length} item${cart.items.length !== 1 ? 's' : ''} in cart`}
            </p>
          </div>
          {!isEmpty && (
            <button
              onClick={handleClearCart}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500"
            >
              Clear Cart
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="rounded-xl border shadow bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
            <ShoppingBag className="w-20 h-20 mx-auto mb-4 text-white/30" />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-white/60 mb-6">
              Browse events and add them to your cart to get started
            </p>
            <button
              onClick={() => router.push('/events')}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent-500 hover:bg-accent-500/90 text-primary font-bold h-10 px-4 py-2"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.event.id}
                  className="rounded-xl border shadow bg-white/5 backdrop-blur-xl border-white/10 p-6 hover:border-accent-500/30 transition-all"
                >
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-white/60 mb-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          <span>{item.event.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(item.event.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{item.event.venue}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-accent-500">
                          ₹{item.event.registrationFee}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.event.id)}
                          disabled={removing === item.event.id}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-9 px-3 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                        >
                          {removing === item.event.id ? (
                            <span className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-400 border-t-transparent"></div>
                              Removing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div className="rounded-xl border shadow bg-white/5 backdrop-blur-xl border-white/10 p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Service Fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-accent-500">₹{calculateTotal()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={ordering}
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full bg-accent-500 hover:bg-accent-500/90 text-primary font-bold py-6 text-lg",
                    ordering && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {ordering ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                      Processing...
                    </span>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>

                <p className="text-xs text-white/40 mt-4 text-center">
                  By proceeding, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
