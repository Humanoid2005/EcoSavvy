import React, { useState } from 'react';
import { 
  Sun, 
  MapPin, 
  Search, 
  Battery, 
  DollarSign, 
  Zap, 
  PanelTop,
  Calendar
} from 'lucide-react';
import ChatBot from './Chatbot';
import Footer from './Footer';
import Navbar from './NavBar';

// Efficiency Score Bar Component
const EfficiencyBar = ({ score }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className="bg-yellow-500 rounded-full h-2 transition-all duration-500"
      style={{ width: `${score}%` }}
    />
  </div>
);

// Metric Card Component
const MetricCard = ({ icon: Icon, title, value, unit }) => (
  <div className="bg-white rounded-xl p-6 shadow-md">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-yellow-100 rounded-lg">
        <Icon className="w-5 h-5 text-yellow-600" />
      </div>
      <h3 className="font-medium text-gray-700">{title}</h3>
    </div>
    <p className="text-2xl font-bold text-gray-900">
      {value.toLocaleString()} <span className="text-base font-normal text-gray-600">{unit}</span>
    </p>
  </div>
);

function SolarAnalysis() {
  const [roofArea, setRoofArea] = useState('');
  const [location, setLocation] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState({
    panelCount: 0,
    efficiency: 0,
    powerGeneration: 0,
    costSavings: 0,
    carbonReduction: 0,
    paybackPeriod: 0
  });

  const calculateSolarPotential = (area, location) => {
    // Mock calculations - in a real app, these would be based on actual solar data
    const panelsPerSqFt = 0.08; // Average solar panel coverage
    const panelCount = Math.floor(area * panelsPerSqFt);
    const efficiency = 85; // Location-based efficiency
    const avgDailyPower = panelCount * 1.5; // kWh per panel per day
    const annualPower = avgDailyPower * 365;
    const costSavings = annualPower * 0.12; // Average electricity rate
    const carbonReduction = annualPower * 0.85; // CO2 reduction in kg
    const installationCost = panelCount * 1000;
    const paybackPeriod = installationCost / costSavings;

    return {
      panelCount,
      efficiency,
      powerGeneration: annualPower,
      costSavings,
      carbonReduction,
      paybackPeriod
    };
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    const result = calculateSolarPotential(Number(roofArea), location);
    setAnalysisResult(result);
    setShowResults(true);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-yellow-100 rounded-full">
              <Sun className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Solar Roof Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your roof's solar potential and estimated energy savings
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Roof Area</label>
                <div className="relative">
                  <PanelTop className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    value={roofArea}
                    onChange={(e) => setRoofArea(e.target.value)}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter roof area in sq ft"
                    required
                    min="100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your location"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-yellow-600 text-white rounded-xl font-bold hover:bg-yellow-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Analyze Solar Potential
            </button>
          </form>
        </div>

        {showResults && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Solar Efficiency Analysis</h2>
              <div className="flex items-center gap-4 mb-6">
                <Sun className="w-6 h-6 text-yellow-500" />
                <div className="flex-1">
                  <EfficiencyBar score={analysisResult.efficiency} />
                </div>
                <span className="font-semibold text-gray-700">{analysisResult.efficiency}%</span>
              </div>
              <p className="text-gray-600">
                Based on your location's solar irradiance and weather patterns
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                icon={PanelTop}
                title="Solar Panels"
                value={analysisResult.panelCount}
                unit="panels"
              />
              <MetricCard
                icon={Zap}
                title="Annual Power Generation"
                value={Math.round(analysisResult.powerGeneration)}
                unit="kWh"
              />
              <MetricCard
                icon={DollarSign}
                title="Annual Cost Savings"
                value={Math.round(analysisResult.costSavings)}
                unit="₹"
              />
              <MetricCard
                icon={Battery}
                title="Carbon Reduction"
                value={Math.round(analysisResult.carbonReduction)}
                unit="kg CO₂"
              />
              <MetricCard
                icon={Calendar}
                title="Payback Period"
                value={Math.round(analysisResult.paybackPeriod * 10) / 10}
                unit="years"
              />
            </div>

            <div className="bg-green-50 rounded-xl p-6 mt-8">
              <h3 className="font-semibold text-gray-800 mb-2">Recommendations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Consider installing {analysisResult.panelCount} solar panels for optimal coverage</li>
                <li>• Expected daily power generation: {(analysisResult.powerGeneration / 365).toFixed(1)} kWh</li>
                <li>• Estimated monthly savings: ₹{(analysisResult.costSavings / 12).toFixed(2)}</li>
                <li>• Your system will pay for itself in {Math.round(analysisResult.paybackPeriod * 10) / 10} years</li>
              </ul>
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

export default SolarAnalysis;
