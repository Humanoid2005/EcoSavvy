import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Store, 
  ShoppingBag, 
  Search, 
  Filter, 
  Upload, 
  Plus, 
  Star, 
  Leaf, 
  ShoppingCart, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';
import Navbar from './NavBar';
import ChatBot from './Chatbot';
import Footer from './Footer';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "Bamboo Cutlery Set",
    price: 24.99,
    image: "https://plus.unsplash.com/premium_photo-1664007654191-75992ed6627b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BhdHVsYXxlbnwwfHwwfHx8MA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1678097337340-ec9c74ebf147?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29va2luZyUyMHV0ZW5zaWxzfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1714702846850-0a9c0f6a40bf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0Y2hlbndhcmV8ZW58MHx8MHx8fDA%3D"
    ],
    rating: 4.5,
    description: "Eco-friendly bamboo cutlery set perfect for sustainable dining",
    ecoScore: 9,
    features: [
      "100% biodegradable",
      "Naturally antibacterial",
      "Lightweight and portable",
      "Handcrafted from sustainable bamboo"
    ],
    sustainabilityInfo: {
      materials: "Organic bamboo",
      packaging: "Plastic-free, recyclable packaging",
      carbonFootprint: "Low carbon footprint production",
      endOfLife: "Fully compostable"
    }
  },
  {
    id: 2,
    name: "Reusable Water Bottle",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    description: "Stainless steel water bottle, perfect for reducing plastic waste",
    ecoScore: 8
  }
];

// Product Card Component
function ProductCard({ product, isSeller = false }) {
  const { id, name, price, image, rating, description, ecoScore } = product;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
          Eco Score: {ecoScore}/10
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
          <span className="text-lg font-bold text-green-600"> ₹{price}</span>
        </div>

        {isSeller ? (
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Remove
            </button>
          </div>
        ) : (
          <Link 
            to={`/product/${id}`}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

// Search Bar Component
function SearchBar({ onSearch }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search eco-friendly products..."
          className="w-full px-6 py-4 rounded-xl bg-white shadow-md pl-12 focus:ring-2 focus:ring-green-500 focus:outline-none"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      <button className="px-6 py-4 bg-white shadow-md rounded-xl hover:bg-gray-50 transition-colors">
        <Filter className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}

// Product Form Component
function ProductForm({ onSubmit }) {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    ecoScore: '',
    sustainabilityFeatures: []
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, images });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">List New Product</h2>
      
      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        <div className="flex flex-wrap gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          ))}
          <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
            <Upload className="w-6 h-6 text-gray-400" />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Product Details Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (₹)
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          List Product
        </button>
      </div>
    </form>
  );
}

// Buyer Dashboard Component
function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(mockProducts);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filtered);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Eco-Friendly Products</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Seller Dashboard Component
function SellerDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState([mockProducts[0]]);

  const handleSubmit = (formData) => {
    const newListing = {
      id: listings.length + 1,
      ...formData,
      rating: 0
    };
    setListings([newListing, ...listings]);
    setShowForm(false);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Listing
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <ProductForm onSubmit={handleSubmit} />
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map(product => (
              <ProductCard key={product.id} product={product} isSeller={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// Main Marketplace Component
export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('buyer');

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex">
            <button
              onClick={() => setActiveTab('buyer')}
              className={`flex-1 px-8 py-4 text-center flex items-center justify-center gap-2 ${
                activeTab === 'buyer'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Eco Products
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`flex-1 px-8 py-4 text-center flex items-center justify-center gap-2 ${
                activeTab === 'seller'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Store className="w-5 h-5" />
              Seller Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      {activeTab === 'buyer' ? <BuyerDashboard /> : <SellerDashboard />}
    </div>
    <ChatBot/>
    <Footer/>
    </>
  );
}