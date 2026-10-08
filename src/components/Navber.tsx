'use client';

import React, { useState, useEffect } from 'react';
import logo from '@/asset/shopping-cart-white-icon.webp';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateFormattedDate = () => {
      const now = new Date();
      // তারিখকে বাংলায় ডায়নামিক রূপান্তর
      const formatter = new Intl.DateTimeFormat('bn-BD', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setCurrentDate(formatter.format(now));
    };

    updateFormattedDate();

    // প্রতি ১ মিনিটে তারিখ আপডেট
    const timer = setInterval(updateFormattedDate, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <nav className="px-4 sm:px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
        
        {/* বাম পাশ: লোগো, টাইটেল এবং তারিখ */}
        <Link href={'/'}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#009640] rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
            <Image 
              src={logo}
              height={22}
              width={22}
              alt="বাজার দর লোগো"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium min-h-[16px]">
              {currentDate || 'লোড হচ্ছে...'}
            </span>
          </div>
        </div>
        </Link>

        {/* ডান পাশ: সাইন ইন ও সাইন আপ বাটন */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            type="button"
            className="text-gray-800 font-medium text-xs sm:text-sm hover:text-green-600 transition-colors px-2 sm:px-3 py-2"
          >
            সাইন ইন
          </button>
          <button 
            type="button"
            className="bg-[#009640] hover:bg-[#007d35] text-white text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            সাইন আপ
          </button>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;