import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { 
  Upload, 
  Search, 
  Leaf, 
  DollarSign, 
  Droplets,
  Zap,
  TreePine,
  Timer
} from 'lucide-react';
import Navbar from './NavBar';
import Footer from './Footer';
import ChatBot from './Chatbot';

export function DailyActivityLog() {
  const [activity, setActivity] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setResult({
        moneySaved: 15.50,
        co2Reduced: 2.3,
        waterSaved: 50,
        energySaved: 1.2,
        treesWorth: 0.5,
        timeSpent: 30
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white/90 backdrop-blur-sm py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Activity Log</h1>
          <p className="text-gray-600 mb-8">
            Log your eco-friendly activities and see their environmental impact
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What did you do today to help the environment?
              </label>
              <TextareaAutosize
                minRows={3}
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="e.g., Used public transport instead of driving, Installed LED bulbs..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add photos of your activity
              </label>
              <div className="flex flex-wrap gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
                <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!activity || loading}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Calculate Impact
                </>
              )}
            </button>
          </form>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600" />
              Your Environmental Impact
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Money Saved</span>
                </div>
                <p className="text-2xl font-bold text-green-600">${result.moneySaved}</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">CO₂ Reduced</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{result.co2Reduced}kg</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Water Saved</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{result.waterSaved}L</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Energy Saved</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{result.energySaved}kWh</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TreePine className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Trees Worth</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{result.treesWorth}</p>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Time Spent</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{result.timeSpent}min</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <ChatBot/>
    <Footer/>
    </>
  );
}

export default DailyActivityLog;
