import React from "react";
import { useParams,Link } from "react-router-dom";
import { Star,Leaf,ArrowLeft,ShoppingCart } from "lucide-react";
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

export default function ProductDetail() {
    const { id } = useParams();
    const product = mockProducts[0]; // In real app, fetch product by id
  
    return (
        <>
        <Navbar/>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-8">
          <Link to="/market" className="flex items-center text-green-600 hover:text-green-700 mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Marketplace
          </Link>
  
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="p-8">
                <div className="relative aspect-square mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="aspect-square object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                    />
                  ))}
                </div>
              </div>
  
              {/* Product Info */}
              <div className="p-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{product.rating}</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <Leaf className="w-5 h-5 mr-1" />
                      <span>Eco Score: {product.ecoScore}/10</span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-green-600">${product.price}</p>
                </div>
  
                <div className="mb-8">
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
  
                <button className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mb-6">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
  
                {/* Features */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <Leaf className="w-4 h-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
  
                {/* Sustainability Info */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Sustainability Information</h2>
                  <div className="bg-green-50 rounded-lg p-4">
                    <dl className="space-y-2">
                      {Object.entries(product.sustainabilityInfo).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-sm font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</dt>
                          <dd className="text-gray-800">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBot/>
      <Footer/>
      </>
    );
  }