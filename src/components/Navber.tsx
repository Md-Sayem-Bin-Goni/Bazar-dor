'use client'
import React, { useState, useEffect } from 'react';
import logo from '@/asset/shopping-cart-white-icon.webp'
import Image from 'next/image';

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateFormattedDate = () => {
      const now = new Date();
      // Formats date dynamically into Bengali (e.g., "মঙ্গলবার, ৬ অক্টোবর, ২০২৬")
      const formatter = new Intl.DateTimeFormat('bn-BD', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setCurrentDate(formatter.format(now));
    };

    updateFormattedDate();

    // Check for day updates every minute
    const timer = setInterval(updateFormattedDate, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
   <div className='bg-white border-b border-gray-100 shadow-sm'>
     <nav className=" px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
      {/* Left side: Logo, Title, and Dynamic Date */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10  bg-green-600 rounded-xl flex items-center justify-center text-white shadow-sm">
          {/* <ShoppingCart className="w-5 h-5" /> */}
          <Image src={logo}
          height={25}
          width={25}
          alt='logo'
          className='text-white'>

          </Image>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-900 leading-tight">
            বাজার দর
          </h1>
          <span className="text-xs text-gray-500 font-medium min-h-[16px]">
            {currentDate}
          </span>
        </div>
      </div>

      {/* Right side: Auth Action Buttons */}
      <div className="flex items-center gap-4">
        <button 
          className="text-gray-800 font-medium text-sm hover:text-gray-900 transition-colors px-3 py-2"
        >
          সাইন ইন
        </button>
        <button 
          className="bg-[#009640] hover:bg-[#007d35] text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
        >
          সাইন আপ
        </button>
      </div>
    </nav>
   </div>
  );
};

export default Navbar;