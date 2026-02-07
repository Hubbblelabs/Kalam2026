'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cartApi, orderApi } from '@/lib/api';
import { Cart } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await cartApi.getCart(token);
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
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      await cartApi.removeFromCart(eventId, token);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setRemoving(null);
    }
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      await cartApi.clearCart(token);
      await fetchCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      setOrdering(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      await orderApi.createOrder(token);
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
      <div className="min-h-screen bg-gradient-to-br from-[#0B3C5D] via-[#1D4E6D] to-[#0B3C5D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F5B301] border-t-transparent"></div>
      </div>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B3C5D] via-[#1D4E6D] to-[#0B3C5D] py-20 px-4">
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
            <Button
              onClick={handleClearCart}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500"
            >
              Clear Cart
            </Button>
          )}
        </div>

        {isEmpty ? (
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
            <ShoppingBag className="w-20 h-20 mx-auto mb-4 text-white/30" />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-white/60 mb-6">
              Browse events and add them to your cart to get started
            </p>
            <Button
              onClick={() => router.push('/events')}
              className="bg-[#F5B301] hover:bg-[#F5B301]/90 text-[#0B3C5D] font-bold"
            >
              Browse Events
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <Card
                  key={item.event.id}
                  className="bg-white/5 backdrop-blur-xl border-white/10 p-6 hover:border-[#F5B301]/30 transition-all"
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
                        <div className="text-2xl font-bold text-[#F5B301]">
                          ₹{item.event.registrationFee}
                        </div>
                        <Button
                          onClick={() => handleRemoveItem(item.event.id)}
                          disabled={removing === item.event.id}
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500"
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
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 sticky top-24">
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
                    <span className="text-[#F5B301]">₹{calculateTotal()}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={ordering}
                  className={cn(
                    "w-full bg-[#F5B301] hover:bg-[#F5B301]/90 text-[#0B3C5D] font-bold py-6 text-lg",
                    ordering && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {ordering ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0B3C5D] border-t-transparent"></div>
                      Processing...
                    </span>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>

                <p className="text-xs text-white/40 mt-4 text-center">
                  By proceeding, you agree to our terms and conditions
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
