"use cache";

import Link from 'next/link';

interface CategoryItem {
    id?: string | number;
    nameBn: string;
    icon: string;
}

const Category = async () => {
    const res = await fetch(
        'https://api.abcz.workers.dev/api/bazardor/categories'
    );

    const categories: CategoryItem[] = await res.json();

    return (
        <section className="w-full bg-[#f8fbf9] border-y border-gray-100 my-1">
            <div className="max-w-7xl mx-auto px-3 sm:px-6">
                <div className="flex items-center justify-start gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-none py-1.5">
                    {categories.map((category, index) => (
                        <Link
                            href={`/category/${category.id}`}
                            key={category.id || index}
                        >
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-white/60 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all cursor-pointer shrink-0">
                                <span className="text-sm sm:text-base md:text-lg leading-none">
                                    {category.icon}
                                </span>

                                <h2 className="text-xs sm:text-sm font-medium sm:font-semibold text-gray-800 whitespace-nowrap">
                                    {category.nameBn}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;