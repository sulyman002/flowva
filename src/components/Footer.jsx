import React from 'react';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* CTA Section */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-gray-900 p-8 md:p-12 rounded-3xl mb-16 border border-gray-800">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-heading mb-2">Join Friday Flow</h2>
                        <p className="text-gray-400">Get the latest tools delivered to your inbox.</p>
                    </div>
                    <div className="flex w-full md:w-auto gap-2">
                        <input 
                          type="email" 
                          placeholder="Your email" 
                          className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-primary w-full md:w-64"
                        />
                        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-black transition-colors">
                            Join
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-gray-800 pb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xl">F</div>
                            <span className="font-heading text-xl">flowva</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Organizing the world's tools for creative professionals.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Product</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Download</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-bold mb-4 text-lg">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; 2024 Flowva Hub. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
