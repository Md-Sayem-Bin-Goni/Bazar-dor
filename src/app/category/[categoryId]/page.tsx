'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

interface Product {
    id: number | string;
    nameBn: string;
    categoryNameBn?: string;
    categoryIcon?: string;
    unit: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
}

// বাংলা ডিজিট কনভার্টার
const toBengaliNumber = (num: number | string | undefined | null): string => {
    if (num === undefined || num === null) return '';
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num
        .toString()
        .replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
};

function CategoryContent() {
    const params = useParams();
    const categoryId = params?.categoryId as string;

    const [products, setProducts] = useState<Product[]>([]);
    const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
    const [sortOption, setSortOption] = useState<string>('default');
    const [loading, setLoading] = useState<boolean>(true);

    const categoryName = products[0]?.categoryNameBn || categoryId;
    const categoryIcon = products[0]?.categoryIcon || '📦';

    useEffect(() => {
        let isMounted = true;

        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
                );
                if (res.ok) {
                    const data: Product[] = await res.json();
                    if (isMounted) {
                        setProducts(data);
                        setSortedProducts(data);
                    }
                }
            } catch (error) {
                console.error('Fetch Category Error:', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (categoryId) {
            fetchCategoryProducts();
        }

        return () => {
            isMounted = false;
        };
    }, [categoryId]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSortOption(value);

        let updatedList = [...products];

        if (value === 'lowToHigh') {
            updatedList.sort((a, b) => a.today - b.today);
        } else if (value === 'highToLow') {
            updatedList.sort((a, b) => b.today - a.today);
        } else {
            updatedList = [...products];
        }

        setSortedProducts(updatedList);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500 font-medium">
                পণ্য লোড হচ্ছে...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* ১. হেডার ব্যানার */}
            <div className="bg-[#f6f9f5] border border-gray-100 rounded-2xl p-6 sm:p-8 flex items-center gap-4 shadow-sm">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-100 shrink-0">
                    {categoryIcon}
                </div>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                        {categoryName}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>

            {/* ২. সর্টিং ড্রপডাউন */}
            <div className="bg-[#f6f9f5] border border-gray-100 rounded-2xl px-6 py-4 flex items-center justify-end shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">
                        সাজান
                    </span>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="bg-white border border-gray-200 text-gray-800 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none cursor-pointer font-medium hover:border-gray-300 transition-colors"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="lowToHigh">দাম: কম থেকে বেশি</option>
                        <option value="highToLow">দাম: বেশি থেকে কম</option>
                    </select>
                </div>
            </div>

            {/* ৩. পণ্য সংখ্যা */}
            <div className="text-xs sm:text-sm text-gray-600 font-medium pl-1">
                মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
            </div>

            {/* ৪. প্রোডাক্ট গ্রিড */}
            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">
                    এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                </div>
            )}
        </div>
    );
}

export default function CategoryPage() {
    return (
        <Suspense fallback={
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500 font-medium">
                লোড হচ্ছে...
            </div>
        }>
            <CategoryContent />
        </Suspense>
    );
}