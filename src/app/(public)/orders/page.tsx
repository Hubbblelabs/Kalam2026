'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { orderApi } from '@/lib/api';
import { Order } from '@/types';
// Removed unused imports
import { Package, Calendar, MapPin, CreditCard, Receipt, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderApi.getUserOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      setCancelling(orderId);
      await orderApi.cancelOrder(orderId);
      await fetchOrders();
    } catch (error) {
      console.error('Failed to cancel order:', error);
    } finally {
      setCancelling(null);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      confirmed: 'bg-green-500/20 text-green-300 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
      refunded: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    };

    return (
      <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', 'border', variants[status])}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary via-primary/80 to-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-500 border-t-transparent"></div>
      </div>
    );
  }

  const isEmpty = orders.length === 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary via-primary/80 to-primary py-20 px-4">
      <div className="max-w-6xl mx-auto pt-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            My Orders
          </h1>
          <p className="text-white/60">
            {isEmpty ? 'No orders yet' : `${orders.length} order${orders.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {isEmpty ? (
          <div className="rounded-xl border shadow bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
            <Receipt className="w-20 h-20 mx-auto mb-4 text-white/30" />
            <h2 className="text-2xl font-bold text-white mb-2">No orders yet</h2>
            <p className="text-white/60 mb-6">
              Start by adding events to your cart and placing an order
            </p>
            <button
              onClick={() => router.push('/events')}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent-500 hover:bg-accent-500/90 text-primary font-bold h-10 px-4 py-2"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border shadow bg-white/5 backdrop-blur-xl border-white/10 p-6 hover:border-accent-500/30 transition-all"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {order.orderNumber}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-white/60">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-accent-500">
                      ₹{order.totalAmount}
                    </div>
                    <p className="text-sm text-white/60">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap gap-4 p-4 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="flex-1 min-w-[200px]">
                        <h4 className="font-bold text-white mb-2">{item.eventTitle}</h4>
                        <div className="space-y-1 text-sm text-white/60">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(item.eventDate).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-accent-500">
                        ₹{item.price}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex flex-wrap gap-3">
                  {order.payment && (
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <CreditCard className="w-4 h-4" />
                      <span>Payment ID: {order.payment.transactionId}</span>
                    </div>
                  )}
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={cancelling === order.id}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-9 px-3 ml-auto border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                    >
                      {cancelling === order.id ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-400 border-t-transparent"></div>
                          Cancelling...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Cancel Order
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
