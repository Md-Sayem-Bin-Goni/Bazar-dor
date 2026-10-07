'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import bannerLogo from '@/asset/bazar-hero.png';

const Banner = () => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateFormattedDate = () => {
            const now = new Date();
            // বাংলায় ডায়নামিক তারিখ ফরম্যাট
            const formatter = new Intl.DateTimeFormat('bn-BD', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
            setCurrentDate(formatter.format(now));
        };

        updateFormattedDate();

        // প্রতি ১ মিনিটে তারিখ অটো-আপডেট হবে
        const timer = setInterval(updateFormattedDate, 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="p-4 sm:p-6 max-w-7xl mx-auto">
            <div className="bg-[#f6f9f5] border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-sm">

                {/* বাম পাশের কনটেন্ট */}
                <div className="w-full md:flex-1 space-y-3 sm:space-y-4 text-left">
                    {/* ডায়নামিক ডেট ব্যাজ */}
                    <div className="inline-block bg-[#e1eee4] text-[#009640] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full min-h-[26px]">
                        {currentDate || 'লোড হচ্ছে...'}
                    </div>

                    {/* প্রধান শিরোনাম */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* বর্ণনা */}
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* বাটন */}
                    <div className="pt-2 w-full sm:w-auto">
                        <button
                            type="button"
                            className="w-full sm:w-auto bg-[#009640] hover:bg-[#007d35] text-white text-sm font-medium px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-center"
                        >
                            সব পণ্য দেখুন
                        </button>
                    </div>
                </div>

                {/* ডান পাশের ছবি */}
                <div className="w-40 sm:w-48 md:w-64 lg:w-72 flex justify-center items-center shrink-0">
                    <Image
                        src={bannerLogo}
                        alt="বাজারের পণ্য ও ঝুড়ি"
                        priority
                        className="w-full h-auto object-contain"
                    />
                </div>

            </div>
        </section>
    );
};

export default Banner;