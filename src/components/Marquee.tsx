import Link from 'next/link';
import React from 'react';
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
const toBengaliNumber = (num: number | string): string => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num
        ?.toString()
        .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

const Marquee = async () => {
    let data = [];

    try {
        const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
            next: { revalidate: 3600 }
        });
        if (res.ok) {
            data = await res.json();
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }

    if (!data || data.length === 0) return null;

    return (
      
            <div className="w-full bg-[#f8fbf9] border-y border-gray-200/80 py-1.5  select-none overflow-hidden">
                <MarqueeText direction="right" duration={20} pauseOnHover={true}>
                    <div className="flex items-center">
                        {data.map((product: any, index: number) => {
                            const isUp = product.change?.dir === 'up';
                            return (
                                <div
                                    key={product.id || index}
                                    className="inline-flex items-center gap-2 px-5 border-r border-gray-200 text-xs sm:text-sm text-gray-800 shrink-0"
                                >
                                    {/* আইকন */}
                                    <span className="text-base sm:text-lg leading-none">
                                        {product.categoryIcon}
                                    </span>

                                    {/* পণ্যের নাম */}
                                    <span className="font-semibold text-gray-900">
                                        {product.nameBn}
                                    </span>

                                    {/* আজকের দাম ও একক */}
                                    <span className="text-gray-600 font-bold">
                                        ৳{toBengaliNumber(product.today)} টাকা/{product.unit === 'kg' ? 'কেজি' : product.unit}
                                    </span>

                                    {/* দামের পরিবর্তন (Up / Down) */}
                                    <span
                                        className={`inline-flex items-center gap-0.5 font-bold text-xs ${isUp ? 'text-red-600' : 'text-emerald-600'
                                            }`}
                                    >
                                        <span>{isUp ? '▲' : '▼'}</span>
                                        <span>{toBengaliNumber(product.change?.pct)}%</span>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </MarqueeText>
            </div>
        
    );
};

export default Marquee;