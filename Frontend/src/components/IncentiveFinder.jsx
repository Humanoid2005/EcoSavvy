import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  Leaf, 
  DollarSign, 
  Sun, 
  Battery, 
  ArrowRight 
} from 'lucide-react';
import Footer from './Footer';
import Navbar from './NavBar';
import ChatBot from './Chatbot';

// Category data for the info section
const categories = [
  {
    icon: Sun,
    title: "Solar Incentives",
    description: "Federal tax credits, state rebates, and utility company incentives for solar installations"
  },
  {
    icon: Battery,
    title: "Energy Storage",
    description: "Rebates for home battery systems and smart energy management solutions"
  },
  {
    icon: DollarSign,
    title: "Tax Benefits",
    description: "Tax deductions and credits for energy-efficient home improvements"
  },
  {
    icon: Leaf,
    title: "Green Living",
    description: "Local and state incentives for sustainable lifestyle choices"
  }
];

// Category Card Component
function CategoryCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white/90 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-green-100 rounded-lg">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

// Search Form Component
function SearchForm({ query, setQuery, loading, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for eco-friendly incentives (e.g., 'solar panel rebates', 'EV tax credits')"
          className="flex-1 px-6 py-4 rounded-xl bg-white/90 border border-green-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all transform hover:scale-105 flex items-center gap-2 disabled:opacity-50"
        >
          <Search className="w-5 h-5" />
          Find Incentives
        </button>
      </div>
    </form>
  );
}

// Results Section Component
function ResultsSection({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white/90 rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Incentives</h2>
      <div className="space-y-6">
        {result.split('\n\n').map((section, index) => (
          <div key={index} className="border-l-4 border-green-500 pl-4">
            <div className="prose prose-green max-w-none">
              {section.split('\n').map((line, i) => (
                <p key={i} className="text-gray-700 mb-2">{line}</p>
              ))}
            </div>
            <button className="mt-4 text-green-600 font-semibold flex items-center gap-2 hover:text-green-700 transition-colors">
              Learn More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main IncentiveFinder Component
export default function IncentiveFinder() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/govt-schemes`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Unable to fetch data");
      }

      const result1 = await response.json();
      setResult(result1);
    } catch (err) {
      console.log(err);
    }


    // Simulate API call with example response
    /*setTimeout(() => {
      setResult(
        "Solar Panel Installation Incentives:\n" +
        "- Federal Tax Credit: 30% of total system cost\n" +
        "- State Rebate: Up to $2,500\n" +
        "- Utility Company Rebate: $500 per kW installed\n\n" +
        "Energy Efficiency Upgrades:\n" +
        "- Home Energy Audit: Free through local utility\n" +
        "- Smart Thermostat: $100 rebate\n" +
        "- LED Lighting: Up to $150 in rebates"
      );
      setLoading(false);
    }, 1500);*/
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Eco-Friendly Incentives
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover available rebates, tax credits, and incentives for your sustainable lifestyle choices
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>

        {/* Search Form */}
        <SearchForm 
          query={query}
          setQuery={setQuery}
          loading={loading}
          onSubmit={handleSubmit}
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
          </div>
        )}

        {/* Results Section */}
        {result && <ResultsSection result={result} />}

        {/* Pro Tips Section */}
        <div className="mt-8 bg-green-50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-bold text-gray-800">Pro Tips</h2>
          </div>
          <p className="text-gray-600">
            Try searching for specific categories like "solar panels", "home insulation", or "electric vehicles". 
            You can also search by location to find local incentives in your area.
          </p>
        </div>
      </div>
    </div>
    <ChatBot/>
    <Footer/>
    </>
  );
}