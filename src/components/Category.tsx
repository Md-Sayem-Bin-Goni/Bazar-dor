
import { Suspense } from 'react';
import CategoryList from './CategoryList';

export interface CategoryItem {
    id?: string | number;
    nameBn: string;
    icon: string;
}

const Category = async () => {
    const res = await fetch(
        'https://api.abcz.workers.dev/api/bazardor/categories',
        {
            cache: 'force-cache',
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }

    const categories: CategoryItem[] = await res.json();

    return (
        <Suspense fallback={<CategorySkeleton />}>
            <CategoryList categories={categories} />
        </Suspense>
    );
};

function CategorySkeleton() {
    return (
        <section className="w-full bg-[#f8fbf9] border-y border-gray-100 my-1">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
                <div className="flex gap-3 overflow-hidden">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="h-9 w-24 shrink-0 animate-pulse rounded-xl bg-gray-200"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Category;

