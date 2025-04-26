
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Trash2, 
  Plus, 
  Minus,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="bg-bakery-cream bg-opacity-30 p-8 rounded-lg">
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-full shadow-soft inline-block mb-4">
                  <ShoppingBag className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              
              <h1 className="text-3xl font-serif font-medium mb-4">Your Cart is Empty</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Looks like you haven't added any delicious treats to your cart yet!
              </p>
              
              <Button 
                asChild
                className="bakery-button bakery-button-primary"
              >
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif font-medium mb-8">Your Shopping Cart</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bakery-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="p-4 font-medium">Product</th>
                        <th className="p-4 font-medium text-center">Quantity</th>
                        <th className="p-4 font-medium text-right">Price</th>
                        <th className="p-4 font-medium text-right">Subtotal</th>
                        <th className="p-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.product.id} className="border-b">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{item.product.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {item.product.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (!isNaN(value)) {
                                    updateQuantity(item.product.id, value);
                                  }
                                }}
                                min="1"
                                className="w-14 h-8 mx-2 text-center"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            ${item.product.price.toFixed(2)}
                          </td>
                          <td className="p-4 text-right font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="p-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Button
                  asChild
                  className="bakery-button"
                >
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bakery-card p-6">
                <h2 className="text-xl font-serif font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="h-px bg-border my-4"></div>
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  asChild
                  className="bakery-button bakery-button-primary w-full mt-6"
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Accepted Payment Methods</h3>
                  <div className="flex gap-2">
                    <div className="bg-muted px-2 py-1 rounded text-sm">Credit Card</div>
                    <div className="bg-muted px-2 py-1 rounded text-sm">PayPal</div>
                    <div className="bg-muted px-2 py-1 rounded text-sm">Cash on Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
