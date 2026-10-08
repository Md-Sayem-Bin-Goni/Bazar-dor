'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface MarketData {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number | string;
    slug?: string;
    nameBn: string;
    category?: string;
    categoryNameBn?: string;
    categoryIcon?: string;
    unit: string;
    image?: string;
    today: number;
    yesterday?: number;
    lastWeek?: number;
    lastMonth?: number;
    change: {
        dir: string;
        pct: number;
    };
    markets?: MarketData[];
}

// বাংলা ডিজিট কনভার্টার
const toBengaliNumber = (num: number | string | undefined | null): string => {
    if (num === undefined || num === null) return '';
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num
        .toString()
        .replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
};

function ProductDetailsContent() {
    const params = useParams();
    const productId = params?.productId as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
                if (res.ok) {
                    const data: Product[] = await res.json();
                    const found = data.find(
                        (p) => String(p.id) === String(productId) 
                    );
                    if (isMounted && found) {
                        setProduct(found);
                    }
                }
            } catch (error) {
                console.error("Fetch Product Error:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetails();
        }

        return () => {
            isMounted = false;
        };
    }, [productId]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500 font-medium">
                পণ্যের বিস্তারিত তথ্য লোড হচ্ছে...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500 font-medium">
                পণ্যটি পাওয়া যায়নি।
            </div>
        );
    }

    // গতকালের তুলনায় আজকের দামের পার্থক্য হিসাব
    const priceDiff = product.yesterday ? product.today - product.yesterday : 0;

    // বাজারভিত্তিক ক্যালকুলেশন
    const markets = product.markets || [];

    // ১. সর্বনিম্ন দাম
    const minPrice = markets.length > 0
        ? Math.min(...markets.map((m) => m.min))
        : product.today;

    // ২. সর্বাধিক দাম
    const maxPrice = markets.length > 0
        ? Math.max(...markets.map((m) => m.max))
        : product.today;

    // ৩. গড় দাম
    const avgPrice = markets.length > 0
        ? (markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length).toFixed(0)
        : product.today;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

            {/* ১. ব্রেডক্রাম্ব (Breadcrumb) */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                <Link href="/" className="hover:text-gray-900 transition-colors">
                    হোম
                </Link>
                <span>›</span>
                <Link
                    href={`/category/${product.category || 'all'}`}
                    className="hover:text-gray-900 transition-colors"
                >
                    {product.categoryNameBn || 'ক্যাটাগরি'}
                </Link>
                <span>›</span>
                <span className="text-gray-900 font-semibold">{product.nameBn}</span>
            </nav>

            {/* ২. হেডার ব্যানার (পণ্যের প্রধান তথ্য ও আজকের দাম) */}
         <div className="bg-[#f6f9f5] border border-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 shadow-sm">

    {/* বাম অংশ */}
    <div className="flex items-center gap-3 sm:gap-4 min-w-0">

        {/* Icon */}
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-5xl shadow-sm border border-gray-100 shrink-0">
            {product.categoryIcon || "🍚"}
        </div>

        {/* Product info */}
        <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight truncate">
                {product.nameBn}
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                প্রতি কেজি · {product.categoryNameBn || "চাল"}
            </p>

            {priceDiff !== 0 && (
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1.5 leading-relaxed">
                    গতকালের তুলনায় আজ দাম{" "}
                    {priceDiff > 0 ? "বেড়েছে" : "কমেছে"} ·{" "}
                    {toBengaliNumber(Math.abs(priceDiff))} টাকা
                </p>
            )}
        </div>
    </div>

    {/* ডান অংশ: আজকের দাম */}
    <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-left sm:text-right shadow-sm w-full sm:w-auto sm:min-w-40">

        <p className="text-xs text-gray-400 font-medium">
            আজকের দাম
        </p>

        <div className="flex items-baseline gap-1 sm:block">
            <span className="text-2xl sm:text-4xl font-extrabold text-gray-900 mt-1">
                {toBengaliNumber(product.today)}
            </span>

            <span className="text-xs text-gray-400 font-medium sm:block sm:mt-0.5">
                টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
            </span>
        </div>

        {/* Percentage change */}
        <div className="mt-2 flex justify-start sm:justify-end">

            {product.change?.dir === "up" && (
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md flex items-center gap-1">
                    ▲ {toBengaliNumber(product.change.pct)}%
                </span>
            )}

            {product.change?.dir === "down" && (
                <span className="text-xs font-bold text-[#009640] bg-green-50 px-2 py-1 rounded-md flex items-center gap-1">
                    ▼ {toBengaliNumber(product.change.pct)}%
                </span>
            )}

            {product.change?.dir === "same" && (
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                    — ০.০%
                </span>
            )}

        </div>
    </div>

</div>

            {/* ৩. দামের সারসংক্ষেপ (Summary Cards) */}
            <div className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    দামের সারসংক্ষেপ
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    {/* সর্বনিম্ন দাম */}
                    <div className="bg-[#f6f9f5] border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</p>
                        <div className="text-2xl font-extrabold text-[#009640] mt-1">
                            {toBengaliNumber(minPrice)} টাকা
                        </div>
                        <p className="text-xs text-gray-400 font-medium mt-1">
                            সবচেয়ে কম দামের বাজার
                        </p>
                    </div>

                    {/* সর্বাধিক দাম */}
                    <div className="bg-[#f6f9f5] border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-xs text-gray-500 font-medium">সর্বাধিক দাম</p>
                        <div className="text-2xl font-extrabold text-red-500 mt-1">
                            {toBengaliNumber(maxPrice)} টাকা
                        </div>
                        <p className="text-xs text-gray-400 font-medium mt-1">
                            সবচেয়ে বেশি দামের বাজার
                        </p>
                    </div>

                    {/* গড় দাম */}
                    <div className="bg-[#f6f9f5] border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
                        <div className="text-2xl font-extrabold text-gray-900 mt-1">
                            {toBengaliNumber(avgPrice)} টাকা
                        </div>
                        <p className="text-xs text-gray-400 font-medium mt-1">
                            প্রতি কেজি-এর হিসাবে
                        </p>
                    </div>

                </div>
            </div>

            {/* ৪. বাজারভিত্তিক আজকের দাম (Table) */}
            {markets.length > 0 && (
                <div className="space-y-3 pt-2">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="bg-[#f6f9f5] border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200/60 text-gray-500 font-semibold">
                                        <th className="py-3.5 px-4 sm:px-6">বাজার</th>
                                        <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                                        <th className="py-3.5 px-4 sm:px-6">সর্বনিম্ন</th>
                                        <th className="py-3.5 px-4 sm:px-6">সর্বাধিক</th>
                                        <th className="py-3.5 px-4 sm:px-6">গড়</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200/50 text-gray-800 font-medium">
                                    {markets.map((m, index) => {
                                        const marketAvg = ((m.min + m.max) / 2).toFixed(
                                            (m.min + m.max) % 2 === 0 ? 0 : 2
                                        );
                                        return (
                                            <tr key={index} className="hover:bg-white/60 transition-colors">
                                                <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">
                                                    {m.market}
                                                </td>
                                                <td className="py-3.5 px-4 sm:px-6 text-gray-600">
                                                    {m.division}
                                                </td>
                                                <td className="py-3.5 px-4 sm:px-6 font-bold">
                                                    {toBengaliNumber(m.min)} টাকা
                                                </td>
                                                <td className="py-3.5 px-4 sm:px-6 font-bold">
                                                    {toBengaliNumber(m.max)} টাকা
                                                </td>
                                                <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">
                                                    {toBengaliNumber(marketAvg)} টাকা
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default function ProductDetailsPage() {
    return (
        <Suspense
            fallback={
                <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500 font-medium">
                    লোড হচ্ছে...
                </div>
            }
        >
            <ProductDetailsContent />
        </Suspense>
    );
}