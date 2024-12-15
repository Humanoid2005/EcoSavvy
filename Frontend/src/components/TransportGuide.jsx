import React, { useState } from 'react';
import { MapPin, Search, Clock, IndianRupeeIcon, Leaf, Bus, Train, Car, Bike } from 'lucide-react';
import ChatBot from './Chatbot';
import Navbar from './NavBar';
import Footer from './Footer';

function TransportGuide() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [people, setPeople] = useState(1);
  const [showResults, setShowResults] = useState(false);

  // Mock travel options - in a real app, this would come from an API
  const travelOptions = [
    {
      mode: 'Bus',
      icon: Bus,
      details: 'Route 42X Express',
      time: '45 mins',
      cost: 2.50,
      ecoScore: 8
    },
    {
      mode: 'Metro',
      icon: Train,
      details: 'Blue Line - Central Station',
      time: '25 mins',
      cost: 3.00,
      ecoScore: 9
    },
    {
      mode: 'Carpool',
      icon: Car,
      details: 'Shared Ride Service',
      time: '30 mins',
      cost: 5.00,
      ecoScore: 7
    },
    {
      mode: 'Bike Share',
      icon: Bike,
      details: 'City Bikes Available',
      time: '50 mins',
      cost: 1.50,
      ecoScore: 10
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const EcoScoreBar = ({ score }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-green-500 rounded-full h-2"
        style={{ width: `${score * 10}%` }}
      />
    </div>
  );

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Eco-Friendly Transport Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the most sustainable and cost-effective way to travel
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Starting point"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Destination"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Passengers</label>
                <input
                  type="number"
                  min="1"
                  value={people}
                  onChange={(e) => setPeople(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Find Routes
            </button>
          </form>
        </div>

        {showResults && (
          <div className="space-y-6">
            {travelOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{option.mode}</h3>
                        <p className="text-gray-600">{option.details}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{option.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupeeIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">₹{(option.cost * people).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-green-500" />
                        <div className="w-24">
                          <EcoScoreBar score={option.ecoScore} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    <ChatBot/>
    <Footer/>
    </>
  );
}

export default TransportGuide;
