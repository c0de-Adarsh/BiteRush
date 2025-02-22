import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-600">BiteRush</h3>
            <p className="text-gray-600">
              Share your recipes, discover new dishes, and join our growing community of food lovers.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-600">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600">Recipes</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-600">Breakfast</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600">Lunch</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600">Dinner</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600">Desserts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-orange-600 hover:text-orange-700">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-700">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-700">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-700">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t text-center border-gray-200 mt-12 pt-8">
        <p className="text-gray-900 text-sm">
                  © 2025 BiteRush. All rights reserved. Designed and developed by <a className='underline' href="https://adarsh-web-portfolio.netlify.app/">Adarsh</a>
                </p>
        </div>
      </div>
    </footer>
  );
}