import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white shadow-[0px_-1px_1px_rgba(0,0,0,0.1)] rounded-sm">
            <div className="container flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row">
                <Link to='/'>
                    <div className="text-3xl font-extrabold tracking-widest text-blue-600 hover:scale-110 transition-transform duration-300">
                        ~日本~
                    </div>
                </Link>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
                    <Link to={'/'} className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
                        Lessons
                    </Link>

                    <Link to={'/tutorials'} className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
                        Tutorials
                    </Link>


                </div>

                <p className="mt-6 text-sm text-gray-500 lg:mt-0">© Copyright 2024 ~日本~. </p>
            </div>
        </footer>

    );
};

export default Footer;