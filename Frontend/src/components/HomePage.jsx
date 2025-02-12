import React,{useState,useEffect} from 'react';
import { Leaf, DollarSign, Clock, Zap, ArrowRight, StoreIcon, Sun, Bike, Earth, FileClock, BadgeIndianRupee, IndianRupeeIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import ChatBot from './Chatbot';
import Footer from './Footer';

function App() {
  const navigate = useNavigate();
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Function to read the content
    const readIframeContent = () => {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        // We need to wait for iframe to load
        iframe.onload = () => {
          try {
            // Access the iframe's document
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            // Find the element
            const element = iframeDocument.getElementById('lblTabTotal');
            if (element) {
              setTotalValue(totalValue+element.innerText);
              // Optional: Set up a mutation observer to watch for changes
              const observer = new MutationObserver((mutations) => {
                setTotalValue(totalValue+Totalelement.innerText);
              });
              
              observer.observe(element, {
                characterData: true,
                childList: true,
                subtree: true
              });
            }
          } catch (error) {
            console.error('Error accessing iframe content:', error);
          }
        };
      }
      console.log(totalValue);
    };

    readIframeContent();

    // Cleanup function
    return () => {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        // Remove the onload handler
        iframe.onload = null;
      }
    };
  }, []);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Container for iframe with minimal spacing */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center w-full">
            <iframe 
              width="710" 
              height="710"  
              src="https://calculator.carbonfootprint.com/calculator.aspx"
              className="w-full max-w-[710px] mt-4"
            />
          </div>
        </div>

        {/* Navigation Buttons Section - immediately following iframe */}
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/market')}
              className="bg-[#0D9488] text-center text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300 flex items-center gap-2"
            >
              Eco-Friendly Market <StoreIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/solar-potential')}
              className="bg-[#0D9488] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300 flex items-center gap-2"
            >
              Roof Top for Solar <Sun className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/transport-guide')}
              className="bg-[#0D9488] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300 flex items-center gap-2"
            >
              Transport Guide <Bike className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/incentives')}
              className="bg-[#0D9488] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300 flex items-center gap-2"
            >
              Get Incentives <BadgeIndianRupee className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/daily-activities')}
              className="bg-[#0D9488] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300 flex items-center gap-2"
            >
              Daily Activity Logger <Earth className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
      <ChatBot />
      <Footer />
    </>
  );
}

export default App;