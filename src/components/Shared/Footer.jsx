import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark-800 border-t border-dark-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center justify-between md:flex-row gap-6">
                    {/* Logo and copyright */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <Link to='/' className="group">
                            <div className="text-3xl font-extrabold tracking-widest text-primary-500 group-hover:text-primary-400 transition-colors duration-300">
                                日本
                            </div>
                        </Link>
                        <p className="text-sm text-dark-400">
                            © {new Date().getFullYear()} 日本 Language Learning. All rights reserved.
                        </p>
                    </div>

                    {/* Navigation links */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        <Link
                            to="/about"
                            className="text-dark-300 hover:text-primary-400 transition-colors text-sm font-medium"
                        >
                            About Us
                        </Link>
                        <Link
                            to="/privacy"
                            className="text-dark-300 hover:text-primary-400 transition-colors text-sm font-medium"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms"
                            className="text-dark-300 hover:text-primary-400 transition-colors text-sm font-medium"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            to="/contact"
                            className="text-dark-300 hover:text-primary-400 transition-colors text-sm font-medium"
                        >
                            Contact
                        </Link>
                    </div>
                </div>

                
            </div>
        </footer>
    );
};

export default Footer;