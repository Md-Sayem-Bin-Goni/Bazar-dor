
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CategoryItem } from './Category';

interface Props {
    categories: CategoryItem[];
}

const CategoryList = ({ categories }: Props) => {
    const pathname = usePathname();

    return (
        <section className="w-full bg-[#f8fbf9] border-y border-gray-100 my-1">
            <div className="max-w-7xl mx-auto px-3 sm:px-6">
                <div className="flex items-center justify-start gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-none py-1.5">
                    {categories.map((category, index) => {
                        const href = `/category/${category.id}`;
                        const isActive = pathname === href;

                        return (
                            <Link
                                href={href}
                                key={category.id ?? index}
                                aria-current={isActive ? 'page' : undefined}
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl border transition-all cursor-pointer shrink-0 ${
                                    isActive
                                        ? 'bg-[#16a34a] text-white border-[#16a34a] shadow-sm'
                                        : 'bg-white/60 text-gray-800 border-transparent hover:bg-white hover:shadow-sm hover:border-gray-200'
                                }`}
                            >
                                <span className="text-sm sm:text-base md:text-lg leading-none">
                                    {category.icon}
                                </span>

                                <h2 className="text-xs sm:text-sm font-medium sm:font-semibold whitespace-nowrap">
                                    {category.nameBn}
                                </h2>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryList;

