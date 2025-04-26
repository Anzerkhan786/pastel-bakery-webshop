
import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Menu,
  ShoppingCart,
  User,
  Search,
  Package,
  Mail
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Redirect if not admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="flex h-screen bg-bakery-blue bg-opacity-10">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-border">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-serif font-bold gradient-text">Sweet Delights</h1>
          </Link>
          <div className="text-sm text-muted-foreground mt-2">Admin Panel</div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link 
            to="/admin/dashboard" 
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/dashboard' 
                ? 'bg-bakery-pink text-primary-foreground' 
                : 'hover:bg-muted'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/products" 
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/products' 
                ? 'bg-bakery-pink text-primary-foreground' 
                : 'hover:bg-muted'
            }`}
          >
            <Package className="mr-2 h-4 w-4" />
            Products
          </Link>
          <Link 
            to="/admin/orders" 
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/orders' 
                ? 'bg-bakery-pink text-primary-foreground' 
                : 'hover:bg-muted'
            }`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Orders
          </Link>
          <Link 
            to="/admin/users" 
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/users' 
                ? 'bg-bakery-pink text-primary-foreground' 
                : 'hover:bg-muted'
            }`}
          >
            <User className="mr-2 h-4 w-4" />
            Users
          </Link>
          <Link 
            to="/admin/inquiries" 
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              location.pathname === '/admin/inquiries' 
                ? 'bg-bakery-pink text-primary-foreground' 
                : 'hover:bg-muted'
            }`}
          >
            <Mail className="mr-2 h-4 w-4" />
            Inquiries
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border mt-auto">
          <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Website
          </Link>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="flex flex-col flex-1 md:ml-0">
        <header className="md:hidden sticky top-0 z-10 bg-white border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <span className="ml-3 text-lg font-medium">Admin</span>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
          
          {/* Mobile sidebar */}
          {mobileMenuOpen && (
            <nav className="mt-4 space-y-1">
              <Link 
                to="/admin/dashboard" 
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  location.pathname === '/admin/dashboard' 
                    ? 'bg-bakery-pink text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/products" 
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  location.pathname === '/admin/products' 
                    ? 'bg-bakery-pink text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                <Package className="mr-2 h-4 w-4" />
                Products
              </Link>
              <Link 
                to="/admin/orders" 
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  location.pathname === '/admin/orders' 
                    ? 'bg-bakery-pink text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Orders
              </Link>
              <Link 
                to="/admin/users" 
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  location.pathname === '/admin/users' 
                    ? 'bg-bakery-pink text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                <User className="mr-2 h-4 w-4" />
                Users
              </Link>
              <Link 
                to="/admin/inquiries" 
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  location.pathname === '/admin/inquiries' 
                    ? 'bg-bakery-pink text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                <Mail className="mr-2 h-4 w-4" />
                Inquiries
              </Link>
            </nav>
          )}
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
