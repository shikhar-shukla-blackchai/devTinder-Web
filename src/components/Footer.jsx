import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-pink-500 underline transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-pink-500 underline transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-gray-400 hover:text-pink-500 underline transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
