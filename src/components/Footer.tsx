
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-bakery-cream text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center">
              <h3 className="text-2xl font-serif font-bold gradient-text">Sweet Delights</h3>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Artisanal baked goods made with love and the finest ingredients. 
              Every bite tells our story of passion for baking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-primary-foreground transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Get in Touch</h3>
            <address className="not-italic">
              <p>123 Bakery Street</p>
              <p>Sweet Town, ST 12345</p>
              <p className="mt-2">Phone: (555) 123-4567</p>
              <p>Email: info@sweetdelights.com</p>
            </address>
            <div className="mt-4 flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Sweet Delights Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
