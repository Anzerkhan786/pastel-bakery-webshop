
import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingCart, 
  User,
  Package,
  Mail,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-serif">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bakery-card">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold mt-1">156</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <div className="bg-bakery-pink bg-opacity-20 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-primary-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bakery-card">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">$4,320.50</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2% from last month
                </p>
              </div>
              <div className="bg-bakery-yellow bg-opacity-20 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-secondary-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bakery-card">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Products</p>
                <h3 className="text-2xl font-bold mt-1">48</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +4 new this month
                </p>
              </div>
              <div className="bg-bakery-green bg-opacity-20 p-3 rounded-full">
                <Package className="h-6 w-6 text-accent-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bakery-card">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customers</p>
                <h3 className="text-2xl font-bold mt-1">245</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18 this month
                </p>
              </div>
              <div className="bg-bakery-blue bg-opacity-20 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders */}
        <Card className="bakery-card">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Order ID</th>
                    <th className="text-left p-2 font-medium">Customer</th>
                    <th className="text-left p-2 font-medium">Date</th>
                    <th className="text-left p-2 font-medium">Amount</th>
                    <th className="text-left p-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 text-sm">#10428</td>
                    <td className="p-2 text-sm">John Doe</td>
                    <td className="p-2 text-sm">Apr 24, 2023</td>
                    <td className="p-2 text-sm">$125.00</td>
                    <td className="p-2 text-sm">
                      <span className="badge badge-green">Delivered</span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 text-sm">#10427</td>
                    <td className="p-2 text-sm">Jane Smith</td>
                    <td className="p-2 text-sm">Apr 24, 2023</td>
                    <td className="p-2 text-sm">$86.50</td>
                    <td className="p-2 text-sm">
                      <span className="badge badge-yellow">Processing</span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 text-sm">#10426</td>
                    <td className="p-2 text-sm">Robert Johnson</td>
                    <td className="p-2 text-sm">Apr 23, 2023</td>
                    <td className="p-2 text-sm">$42.25</td>
                    <td className="p-2 text-sm">
                      <span className="badge badge-pink">Shipped</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-2 text-sm">#10425</td>
                    <td className="p-2 text-sm">Emily Wilson</td>
                    <td className="p-2 text-sm">Apr 23, 2023</td>
                    <td className="p-2 text-sm">$210.75</td>
                    <td className="p-2 text-sm">
                      <span className="badge badge-green">Delivered</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Inquiries */}
        <Card className="bakery-card">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Custom Cake Inquiry</h4>
                    <p className="text-sm text-muted-foreground">From: sarah@example.com</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <p className="mt-2 text-sm">
                  I'd like to inquire about a custom birthday cake for my daughter's 5th birthday. Can you create a unicorn-themed cake?
                </p>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Wholesale Order Question</h4>
                    <p className="text-sm text-muted-foreground">From: cafe@example.com</p>
                  </div>
                  <span className="text-xs text-muted-foreground">5 hours ago</span>
                </div>
                <p className="mt-2 text-sm">
                  We're interested in placing a wholesale order for our café. Do you offer discounts for bulk purchases of your pastries?
                </p>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Allergen Information</h4>
                    <p className="text-sm text-muted-foreground">From: alex@example.com</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
                <p className="mt-2 text-sm">
                  Could you please provide information about allergens in your cinnamon rolls? I have a nut allergy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
