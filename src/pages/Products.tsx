
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '../context/CartContext';
import { Product, ProductCategory } from '../types/product';

// Mock products data (later we'll fetch this from Supabase)
const PRODUCTS: Product[] = [
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
    name: 'Classic Croissant',
    description: 'Flaky, buttery croissants made from scratch',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JvaXNzYW50fGVufDB8fDB8fHww',
    category: 'pastries'
  },
  {
    id: '3',
    name: 'Sourdough Bread',
    description: 'Traditional sourdough bread with perfect crust',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1585478259715-2224b187c891?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c291cmRvdWdoJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D',
    category: 'breads'
  }
];

const Products = () => {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  
  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === activeCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif mb-8 text-center">Our Products</h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('all')}
            className="capitalize"
          >
            All
          </Button>
          {['cakes', 'cookies', 'breads', 'pastries'].map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category as ProductCategory)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <Button 
                  onClick={() => addItem(product)} 
                  className="w-full bg-bakery-pink hover:bg-bakery-pink/90"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
