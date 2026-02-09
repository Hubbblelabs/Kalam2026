'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userApi, authApi } from '@/lib/api';
import { User } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  LogOut,
  Package,
  ShoppingCart,
} from 'lucide-react';

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const response = await userApi.getProfile();
      if (!response.data) {
        throw new Error('Profile data missing');
      }
      setUser(response.data);
      setFormData({
        name: response.data.name || '',
        phone: response.data.phone || '',
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // If unauthorized, redirect to login
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await userApi.updateProfile(formData);
      await fetchProfile();
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B3C5D] via-[#1D4E6D] to-[#0B3C5D] flex items-center justify-center pb-20 md:pb-0">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F5B301] border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B3C5D] via-[#1D4E6D] to-[#0B3C5D] flex items-center justify-center pb-20 md:pb-0">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center max-w-md mx-4">
          <UserIcon className="w-20 h-20 mx-auto mb-4 text-white/30" />
          <h2 className="text-2xl font-bold text-white mb-2">Not logged in</h2>
          <p className="text-white/60 mb-6">
            Please log in to view your account
          </p>
          <Button
            onClick={() => router.push('/login')}
            className="bg-[#F5B301] hover:bg-[#F5B301]/90 text-[#0B3C5D] font-bold"
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B3C5D] via-[#1D4E6D] to-[#0B3C5D] py-20 px-4 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            My Account
          </h1>
          <p className="text-white/60">
            Manage your profile and account settings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="md:col-span-2 bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Profile Information</h2>
              {!editing && (
                <Button
                  onClick={() => setEditing(true)}
                  variant="outline"
                  size="sm"
                  className="border-[#F5B301]/30 text-[#F5B301] hover:bg-[#F5B301]/10"
                >
                  Edit Profile
                </Button>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white/80">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white/80">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-[#F5B301] hover:bg-[#F5B301]/90 text-[#0B3C5D] font-bold"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    onClick={() => {
                      setEditing(false);
                      setFormData({ name: user.name, phone: user.phone || '' });
                    }}
                    variant="outline"
                    className="border-white/10 text-white/80 hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/5">
                  <UserIcon className="w-5 h-5 text-[#F5B301]" />
                  <div>
                    <p className="text-xs text-white/60">Name</p>
                    <p className="text-white font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/5">
                  <Mail className="w-5 h-5 text-[#F5B301]" />
                  <div>
                    <p className="text-xs text-white/60">Email</p>
                    <p className="text-white font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/5">
                  <Phone className="w-5 h-5 text-[#F5B301]" />
                  <div>
                    <p className="text-xs text-white/60">Phone</p>
                    <p className="text-white font-medium">{user.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/5">
                  <Shield className="w-5 h-5 text-[#F5B301]" />
                  <div>
                    <p className="text-xs text-white/60">Role</p>
                    <p className="text-white font-medium capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Button
                onClick={() => router.push('/orders')}
                variant="outline"
                className="w-full justify-start border-white/10 text-white/80 hover:bg-white/5"
              >
                <Package className="w-4 h-4 mr-2" />
                My Orders
              </Button>
              <Button
                onClick={() => router.push('/cart')}
                variant="outline"
                className="w-full justify-start border-white/10 text-white/80 hover:bg-white/5"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                My Cart
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full justify-start border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 mt-8"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
