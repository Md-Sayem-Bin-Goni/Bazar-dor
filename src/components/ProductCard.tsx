import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
    product?: {
        nameBn?: string;
        id: number | string;
        unit?: string;
        image?: string; // ইমোজি বা ইমেজের URL
        today?: number | string;
        change?: {
            dir?: 'up' | 'down' | string;
            pct?: number | string;
        };
    };
}

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
const toBengaliNumber = (num: number | string | undefined | null): string => {
    if (num === undefined || num === null) return '';
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num
        .toString()
        .replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // ডিফোল্ট ডাটা (ছবি অনুযায়ী)
    const name = product?.nameBn || 'পাম তেল';
    const unit = product?.unit === 'kg' ? 'প্রতি কেজি' : product?.unit || 'প্রতি কেজি';
    const image = product?.image || '🛢️';
    const price = product?.today ? toBengaliNumber(product.today) : '১৬৮';
    const changeDir = product?.change?.dir || 'down';
    const changePct = product?.change?.pct ? toBengaliNumber(product.change.pct) : '২.৩';

    const isUp = changeDir === 'up';

    return (
        <Link href={`/product/${product?.id}`}>
            <div className="bg-white/80 border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all w-full max-w-sm">

                {/* উপরের অংশ: আইকন, নাম ও পরিমাপ */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#f4f7f4] rounded-xl flex items-center justify-center text-2xl shrink-0">
                        {image.length > 5 ? (
                            <img src={image} alt={name} className="w-7 h-7 object-contain" />
                        ) : (
                            <span>{image}</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-base font-bold text-gray-900 leading-snug">
                            {name}
                        </h3>
                        <span className="text-xs text-gray-500 font-medium">
                            {unit}
                        </span>
                    </div>
                </div>

                {/* নিচের অংশ: আজকের দাম ও শতকরা পরিবর্তন */}
                <div className="flex items-end justify-between pt-1">
                    <div>
                        <span className="text-[11px] text-gray-500 block mb-0.5 font-medium">
                            আজকের দাম
                        </span>
                        <div className="text-xl font-extrabold text-gray-900 flex items-baseline gap-1">
                            <span>{price}</span>
                            <span className="text-sm font-bold text-gray-800">টাকা</span>
                        </div>
                    </div>

                    {/* ট্রেন্ড ব্যাজ (Up / Down) */}
                    <div
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${isUp
                                ? 'bg-red-50 text-red-600'
                                : 'bg-[#edf7f2] text-[#009640]'
                            }`}
                    >
                        <span>{isUp ? '▲' : '▼'}</span>
                        <span>{changePct}%</span>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default ProductCard;