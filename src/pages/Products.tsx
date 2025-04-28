import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '../context/CartContext';
import { Product, ProductCategory } from '../types/product';

// Mock products data (later we'll fetch this from Supabase)
const PRODUCTS: Product[] = [
  // Cakes
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
    name: 'Red Velvet Cake',
    description: 'Classic red velvet with cream cheese frosting',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1586788680399-2935454cf146?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkJTIwdmVsdmV0JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'cakes'
  },
  {
    id: '3',
    name: 'Vanilla Bean Cake',
    description: 'Light and fluffy vanilla cake with vanilla bean buttercream',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZhbmlsbGElMjBjYWtlfGVufDB8fDB8fHww',
    category: 'cakes'
  },
  {
    id: '4',
    name: 'Carrot Cake',
    description: 'Moist carrot cake with walnuts and cream cheese frosting',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1605291521584-8e0f5a675740?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnJvdCUyMGNha2V8ZW58MHx8MHx8fDA%3D',
    category: 'cakes'
  },
  // Cookies
  {
    id: '5',
    name: 'Chocolate Chip Cookies',
    description: 'Classic cookies with Belgian chocolate chunks',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hvY29sYXRlJTIwY2hpcCUyMGNvb2tpZXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'cookies'
  },
  {
    id: '6',
    name: 'Oatmeal Raisin Cookies',
    description: 'Chewy oatmeal cookies with plump raisins',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1490567674331-72de84996c8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9hdG1lYWwlMjBjb29raWVzfGVufDB8fDB8fHww',
    category: 'cookies'
  },
  {
    id: '7',
    name: 'Shortbread Cookies',
    description: 'Buttery Scottish-style shortbread',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1598839950984-034f6dc7b495?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcnRicmVhZCUyMGNvb2tpZXN8ZW58MHx8MHx8fDA%3D',
    category: 'cookies'
  },
  {
    id: '8',
    name: 'Macaron Cookies',
    description: 'Colorful French macarons with various fillings',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFjYXJvbnxlbnwwfHwwfHx8MA%3D%3D',
    category: 'cookies'
  },
  // Breads
  {
    id: '9',
    name: 'Sourdough Bread',
    description: 'Traditional sourdough with perfect crust',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1586444248835-f34b8b1b6948?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291cmRvdWdoJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D',
    category: 'breads'
  },
  {
    id: '10',
    name: 'Rustic Baguette',
    description: 'Classic French baguette with crispy crust',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1601233242964-9978c2c2f1ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFndWV0dGV8ZW58MHx8MHx8fDA%3D',
    category: 'breads'
  },
  {
    id: '11',
    name: 'Whole Grain Loaf',
    description: 'Nutritious whole grain bread',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hvbGUlMjBncmFpbiUyMGJyZWFkfGVufDB8fDB8fHww',
    category: 'breads'
  },
  {
    id: '12',
    name: 'Ciabatta Bread',
    description: 'Italian white bread with a porous interior',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1620921608597-f440fc486db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2lhYmF0dGElMjBicmVhZHxlbnwwfHwwfHx8MA%3D%3D',
    category: 'breads'
  },
  // Pastries
  {
    id: '13',
    name: 'Classic Croissant',
    description: 'Flaky, buttery croissants made from scratch',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JvaXNzYW50fGVufDB8fDB8fHww',
    category: 'pastries'
  },
  {
    id: '14',
    name: 'Danish Pastry',
    description: 'Sweet Danish pastry with fruit filling',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFuaXNoJTIwcGFzdHJ5fGVufDB8fDB8fHww',
    category: 'pastries'
  },
  {
    id: '15',
    name: 'Éclair',
    description: 'Chocolate-topped éclair with vanilla cream',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNsYWlyfGVufDB8fDB8fHww',
    category: 'pastries'
  },
  {
    id: '16',
    name: 'Cinnamon Roll',
    description: 'Freshly baked rolls with cinnamon and cream cheese icing',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1551780299-eb9392afe9ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNpbm5hbW9uJTIwcm9sbHN8ZW58MHx8MHx8fDA%3D',
    category: 'pastries'
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
