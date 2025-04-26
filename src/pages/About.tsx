
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif mb-8 text-center">Our Story</h1>
          
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h2 className="text-2xl font-serif mb-4">A Family Tradition</h2>
              <p className="mb-4 text-muted-foreground">
                Since 1985, Sweet Delights has been crafting delicious baked goods using time-honored 
                recipes passed down through generations. What started as a small family bakery has grown 
                into a beloved local institution, while maintaining the same dedication to quality and 
                personal touch that made us special from day one.
              </p>
              <p className="mb-6 text-muted-foreground">
                Every morning, our bakers arrive before dawn to prepare fresh breads, pastries, and 
                treats using only the finest ingredients. We believe in creating not just delicious 
                baked goods, but moments of joy and connection for our community.
              </p>
              <Button asChild className="bg-bakery-pink hover:bg-bakery-pink/90">
                <Link to="/products">Explore Our Products</Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556711905-4bd1b6603275?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJha2VyfGVufDB8fDB8fHww"
                alt="Baker working"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <h3 className="text-xl font-serif mb-2">Quality Ingredients</h3>
              <p className="text-muted-foreground">
                We source the finest ingredients locally whenever possible, supporting our community while 
                ensuring superior taste.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-serif mb-2">Artisanal Craft</h3>
              <p className="text-muted-foreground">
                Every item is handcrafted with care, attention to detail, and decades of baking expertise.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-serif mb-2">Community First</h3>
              <p className="text-muted-foreground">
                We're proud to be part of our local community, creating moments of joy one treat at a time.
              </p>
            </div>
          </div>

          {/* Visit Us Section */}
          <div className="bg-bakery-cream bg-opacity-30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-serif mb-4">Visit Us Today</h2>
            <p className="mb-4 text-muted-foreground">
              Come experience the warmth and aroma of freshly baked goods at our bakery.
            </p>
            <address className="not-italic text-muted-foreground">
              <p>123 Bakery Street</p>
              <p>Sweet Town, ST 12345</p>
              <p className="mt-2">Open Monday-Sunday: 7:00 AM - 7:00 PM</p>
            </address>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
