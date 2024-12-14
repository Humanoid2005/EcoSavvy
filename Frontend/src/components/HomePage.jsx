import React from 'react';
import { Leaf, DollarSign, Clock, Zap, ArrowRight,StoreIcon,Sun,Bike,Earth,FileClock,BadgeIndianRupee } from 'lucide-react';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import ChatBot from './Chatbot';
import Footer from './Footer';

function StatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-green-100 rounded-lg">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-green-600 mb-2">{value}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Save Money While Saving
              <span className="text-green-600"> The Planet</span>
            </h1>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          The Impact You Can Make
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            icon={DollarSign}
            title="Annual Savings"
            value="$2,400"
            description="Average yearly savings for our users through eco-friendly choices"
          />
          <StatCard
            icon={Leaf}
            title="CO₂ Reduction"
            value="4.2 tons"
            description="Average yearly carbon footprint reduction per household"
          />
          <StatCard
            icon={Clock}
            title="Time Saved"
            value="120 hrs"
            description="Time saved annually through smart automation and planning"
          />
          <StatCard
            icon={Zap}
            title="Energy Saved"
            value="30%"
            description="Average reduction in household energy consumption"
          />
        </div>
      </div>
      <div className="space-x-4 flex flex-wrap justify-center gap-4">
        <button 
          onClick={() => navigate('/market')}
          className="bg-[#0D9488] text-center text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300"
        >
          Eco-Friendly Market <StoreIcon className='w-5 h-5'/>
        </button>
        <button 
          onClick={() => navigate('/solar-potential')}
          className="bg-[#0D9488] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300"
        >
          Roof Top for Solar <Sun className='w-5 h-5'/>
        </button>
        <button 
          onClick={() => navigate('/transport-guide')}
          className="bg-[#0D9488] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300"
        >
          Transport Guide <Bike className='w-5 h-5'/>
        </button>
        <button 
          onClick={() => navigate('/incentives')}
          className="bg-[#0D9488] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300"
        >
          Get Incentives <BadgeIndianRupee className='w-5 h-5'/>
        </button>
        <button 
          onClick={() => navigate('/daily-activities')}
          className="bg-[#0D9488] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300"
        >
          Daily Activity Logger <Earth className='w-5 h-5'/>
        </button>
      </div>

          </div>
        </div>
      </div>

      {/* Stats Section */}


      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Smart Solutions for Sustainable Living
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 text-lg">
                  EcoSaavy provides personalized recommendations based on your lifestyle and goals. Our intelligent system helps you:
                </p>
                <ul className="space-y-3">
                  {[
                    'Track your environmental impact in real-time',
                    'Discover money-saving eco-friendly alternatives',
                    'Connect with a community of like-minded individuals',
                    'Access exclusive deals on sustainable products'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="p-1 bg-green-100 rounded-full">
                        <Leaf className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                alt="Eco-friendly lifestyle"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-6 rounded-lg shadow-xl">
                <p className="text-2xl font-bold">90%</p>
                <p className="text-sm">of users reduce their carbon footprint within 3 months</p>
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

export default App;