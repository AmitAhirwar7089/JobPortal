import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-purple-400">JobFinder</h2>
          <p className="text-gray-400 mt-3">
            Your trusted platform to find your dream job based on your skills.
          </p>

          <div className="flex gap-4 mt-4">
            <a href="#"><Facebook className="hover:text-purple-400" /></a>
            <a href="#"><Twitter className="hover:text-purple-400" /></a>
            <a href="#"><Instagram className="hover:text-purple-400" /></a>
            <a href="#"><Linkedin className="hover:text-purple-400" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-gray-400">
            <li><Link to="/" className="hover:text-purple-400">Home</Link></li>
            <li><Link to="/jobs" className="hover:text-purple-400">Find Jobs</Link></li>
            <li><Link to="/companies" className="hover:text-purple-400">Companies</Link></li>
            <li><Link to="/about" className="hover:text-purple-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-purple-400">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Support</h3>
          <ul className="flex flex-col gap-3 text-gray-400">
            <li><Link to="/help" className="hover:text-purple-400">Help Center</Link></li>
            <li><Link to="/privacy" className="hover:text-purple-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-purple-400">Terms & Conditions</Link></li>
            <li><Link to="/faq" className="hover:text-purple-400">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Contact Us</h3>

          <div className="flex items-center gap-3 text-gray-400 mb-3">
            <Mail /> <p>support@jobfinder.com</p>
          </div>

          <div className="flex items-center gap-3 text-gray-400 mb-3">
            <Phone /> <p>+91 9876543210</p>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <MapPin /> <p>Bhopal, Madhya Pradesh, India</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      <p className="text-center text-gray-500">
        © {new Date().getFullYear()} JobFinder. All rights reserved.
      </p>
    </footer>
  );
}
