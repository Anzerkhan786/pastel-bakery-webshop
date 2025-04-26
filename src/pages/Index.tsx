
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';
import { Product, ProductCategory } from '../types/product';
import { ArrowRight } from 'lucide-react';

// Mock product data
const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Chocolate Layer Cake',
    description: 'Decadent chocolate cake with silky buttercream frosting',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'cakes',
    featured: true
  },
  {
    id: '2',
    name: 'Vanilla Bean Cupcakes',
    description: 'Light vanilla cupcakes topped with creamy vanilla frosting',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFuaWxsYSUyMGN1cGNha2V8ZW58MHx8MHx8fDA%3D',
    category: 'cakes',
    featured: true
  },
  {
    id: '3',
    name: 'Artisan Sourdough',
    description: 'Crusty artisan sourdough with perfect texture and tang',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1585478259715-2224b187c891?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c291cmRvdWdoJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D',
    category: 'breads',
    bestseller: true
  },
  {
    id: '4',
    name: 'Chocolate Chip Cookies',
    description: 'Classic cookies with gooey chocolate chunks',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hvY29sYXRlJTIwY2hpcCUyMGNvb2tpZXxlbnwwfHwwfHx8MA%3D',
    category: 'cookies',
    bestseller: true
  }
];

const Index = () => {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  
  // Filter products by category
  const filteredProducts = activeCategory === 'all' 
    ? FEATURED_PRODUCTS 
    : FEATURED_PRODUCTS.filter(product => product.category === activeCategory);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="h-[500px] bg-center bg-cover" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJha2VyeXxlbnwwfHwwfHx8MA%3D%3D')" 
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-4 animate-float">
                Artisanal Baked Goods<br/>Made with Love
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
                Handcrafted treats using premium ingredients for a taste of pure delight in every bite.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bakery-button bakery-button-primary"
                >
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button
                  asChild
                  className="bakery-button bakery-button-outline"
                >
                  <Link to="/about">Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif font-medium text-center mb-8">Our Specialties</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['cakes', 'cookies', 'breads', 'pastries'].map((category) => (
              <div 
                key={category}
                className="bakery-card transform hover:translate-y-[-5px] transition-transform"
              >
                <Link to={`/products?category=${category}`} className="block">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCR7Y2F0ZWdvcnl9fGVufDB8fDB8fHww`} 
                      alt={category} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <h3 className="text-white text-xl md:text-2xl font-serif capitalize">
                        {category}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 px-4 bg-bakery-cream bg-opacity-30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-medium">Featured Products</h2>
            
            <div className="mt-4 md:mt-0 flex gap-2 overflow-x-auto pb-2">
              <button 
                className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All
              </button>
              <button 
                className={`category-tab ${activeCategory === 'cakes' ? 'active' : ''}`}
                onClick={() => setActiveCategory('cakes')}
              >
                Cakes
              </button>
              <button 
                className={`category-tab ${activeCategory === 'cookies' ? 'active' : ''}`}
                onClick={() => setActiveCategory('cookies')}
              >
                Cookies
              </button>
              <button 
                className={`category-tab ${activeCategory === 'breads' ? 'active' : ''}`}
                onClick={() => setActiveCategory('breads')}
              >
                Breads
              </button>
              <button 
                className={`category-tab ${activeCategory === 'pastries' ? 'active' : ''}`}
                onClick={() => setActiveCategory('pastries')}
              >
                Pastries
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bakery-card group">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{product.description.slice(0, 60)}...</p>
                  <div className="mt-4 flex items-center justify-between">
                    <Link to={`/products/${product.id}`} className="text-sm font-medium text-primary-foreground hover:underline">
                      View Details
                    </Link>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => addItem(product)}
                      className="bg-bakery-yellow"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button
              asChild
              variant="ghost"
              className="bakery-button bakery-button-outline"
            >
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonial/About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-4">Our Baking Philosophy</h2>
              <p className="mb-4 text-lg">
                At Sweet Delights, we believe that the best baked goods come from the finest ingredients and careful attention to detail.
              </p>
              <p className="mb-6">
                Every day, our bakers arrive before dawn to create fresh, handcrafted treats that delight the senses. We use organic, locally-sourced ingredients whenever possible and never add preservatives or artificial flavors.
              </p>
              <Button
                asChild
                className="bakery-button bakery-button-primary"
              >
                <Link to="/about">Read Our Story</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-card">
                <img 
                  src="https://images.unsplash.com/photo-1556711905-4bd1b6603275?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJha2VyfGVufDB8fDB8fHww" 
                  alt="Baker working" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white p-6 rounded-lg shadow-card max-w-[300px]">
                <p className="text-lg font-serif italic">
                  "We bake with love in every step. From selecting ingredients to the final decoration, passion guides our hands."
                </p>
                <p className="mt-4 font-medium">— Emma Roberts, Head Baker</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 px-4 bg-bakery-pink bg-opacity-30">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-medium mb-4">Join Our Sweet Community</h2>
            <p className="mb-6">
              Sign up to receive updates on seasonal offerings, exclusive promotions, and baking tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full sm:flex-1 rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button className="bakery-button bakery-button-primary">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
