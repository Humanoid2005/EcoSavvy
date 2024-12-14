import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#cdffe0] text-[#f2f2f2] py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-green-600 font-bold text-xl mb-2">EcoSaavy</h3>
            <p className="text-black">&copy; 2024 All Rights Reserved.</p>
          </div>
          <div className="flex space-x-8">
            <div>
              <h4 className="text-green-600 font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-black hover:text-green-600">Home</a></li>
                <li><a href="#" className="text-black hover:text-green-600">Services</a></li>
                <li><a href="#" className="text-black hover:hover:text-green-600">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-600 font-semibold mb-2">Contact</h4>
              <ul className="space-y-1 text-black">
                <li>support@ecosaavy.com</li>
                <li>+91 987654321</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
