import React from "react";
import { Leaf, DollarSign, Clock, Zap, ArrowRight,StoreIcon,Sun,Bike,Earth,FileClock,BadgeIndianRupee, IndianRupeeIcon } from 'lucide-react';
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

function Testimony(){
    return (<>
    <Navbar/>     
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
              icon={IndianRupeeIcon}
              title="Annual Savings"
              value="₹2,400"
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
  
  
            </div>
          </div>
        </div>
        <ChatBot/>
        <Footer/>
        </>)
}

export default Testimony;