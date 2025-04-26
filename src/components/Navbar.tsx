
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  ShoppingCart, 
  User,
  LogIn,
  LogOut,
  Search
} from "lucide-react";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full frosted-glass border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-serif font-bold gradient-text">Sweet Delights</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary-foreground transition-colors">Home</Link>
          <Link to="/products" className="text-foreground hover:text-primary-foreground transition-colors">Products</Link>
          <Link to="/about" className="text-foreground hover:text-primary-foreground transition-colors">About</Link>
          <Link to="/contact" className="text-foreground hover:text-primary-foreground transition-colors">Contact</Link>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-bakery-pink text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          {user ? (
            <div className="relative group">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-border">
                <div className="px-4 py-2 text-sm text-foreground border-b border-border">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-muted-foreground">{user.email}</div>
                </div>
                {isAdmin && (
                  <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/orders" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                  My Orders
                </Link>
                <Link to="/profile" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                  Profile Settings
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Sign in</span>
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="py-2 space-y-1">
            <Link to="/" className="block px-4 py-2 text-foreground hover:bg-muted transition-colors">Home</Link>
            <Link to="/products" className="block px-4 py-2 text-foreground hover:bg-muted transition-colors">Products</Link>
            <Link to="/about" className="block px-4 py-2 text-foreground hover:bg-muted transition-colors">About</Link>
            <Link to="/contact" className="block px-4 py-2 text-foreground hover:bg-muted transition-colors">Contact</Link>
            
            <div className="border-t border-border pt-2 mt-2">
              <Link to="/cart" className="flex items-center px-4 py-2 text-foreground hover:bg-muted transition-colors">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span>Cart ({totalItems})</span>
              </Link>
              
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="flex items-center px-4 py-2 text-foreground hover:bg-muted transition-colors">
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/orders" className="flex items-center px-4 py-2 text-foreground hover:bg-muted transition-colors">
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center px-4 py-2 text-foreground hover:bg-muted transition-colors">
                  <LogIn className="mr-2 h-5 w-5" />
                  <span>Sign in</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
