'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import bannerLogo from '@/asset/bazar-hero.png';

const Banner = () => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateFormattedDate = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('bn-BD', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
            setCurrentDate(formatter.format(now));
        };

        updateFormattedDate();
        const timer = setInterval(updateFormattedDate, 60000);
        return () => clearInterval(timer);
    }, []);

    return (
     
<section className="mx-auto my-4 w-full max-w-7xl px-3 sm:px-6">
    <div className="flex w-full flex-col items-center justify-between gap-6 rounded-2xl border border-gray-100 bg-[#f6f9f5] p-5 shadow-sm sm:gap-8 sm:rounded-3xl sm:p-8 md:flex-row md:p-10">

        {/* বাম পাশের কনটেন্ট */}
        <div className="w-full min-w-0 space-y-3 text-left sm:space-y-4 md:flex-1">

            {/* ডায়নামিক ডেট ব্যাজ */}
            <div className="inline-flex max-w-full items-center rounded-full bg-[#e1eee4] px-3 py-1 text-xs font-bold text-[#009640] sm:text-sm">
                {currentDate || "লোড হচ্ছে..."}
            </div>

            {/* প্রধান শিরোনাম */}
            <h1 className="text-2xl font-extrabold leading-tight text-gray-900 break-words sm:text-3xl md:text-4xl lg:text-5xl">
                আজকের বাজারের দাম এক নজরে
            </h1>

            {/* বর্ণনা */}
            <p className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* বাটন */}
            <a
                href="#allproduct"
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#009640] px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#007d35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009640] sm:w-auto"
            >
                সব পণ্য দেখুন
            </a>
        </div>

        {/* ডান পাশের ছবি */}
        <div className="flex w-full max-w-[200px] shrink-0 items-center justify-center sm:max-w-[240px] md:w-[35%] md:max-w-[280px] lg:max-w-[320px]">
            <Image
                src={bannerLogo}
                alt="বাজারের পণ্য ও ঝুড়ি"
                priority
                sizes="(max-width: 639px) 200px, (max-width: 767px) 240px, (max-width: 1023px) 280px, 320px"
                className="h-auto w-full object-contain"
            />
        </div>

    </div>
</section>


    );
};

export default Banner;