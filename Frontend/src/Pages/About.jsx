import React from 'react';
import { ChefHat, Utensils, Users, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-gradient-to-b from-orange-50  to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-orange-600 mb-4">About BiteRush</h2>
          <p className="text-lg text-gray-600 mb-12">Where Passion for Cooking Meets Community</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Your Culinary Journey Starts Here</h3>
            <p className="text-gray-600">
              Biterush is more than just a recipe-sharing platform – it's a vibrant community where food
              enthusiasts come together to share their culinary masterpieces, discover new flavors, and
              inspire others through their cooking adventures.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <ChefHat className="w-8 h-8 text-orange-500" />
                <span className="text-gray-700">Expert Chefs</span>
              </div>
              <div className="flex items-center space-x-3">
                <Utensils className="w-8 h-8 text-orange-500" />
                <span className="text-gray-700">Quality Recipes</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-orange-500" />
                <span className="text-gray-700">Growing Community</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-orange-500" />
                <span className="text-gray-700">Quick & Easy</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80"
              alt="Cooking passion"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}