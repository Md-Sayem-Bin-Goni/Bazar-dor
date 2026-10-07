import React from 'react';

// টাইপ ডিফাইন করা (TypeScript এর জন্য)
interface CategoryItem {
  id?: string | number;
  nameBn: string;
  icon: string;
}

const Category = async () => {
  // ডাটা ফ্রেচ ও ক্যাশ
  const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories', {
    cache: 'force-cache',
  });

  const categories: CategoryItem[] = await res.json();

  return (
    <section className="w-full bg-[#f8fbf9] border-y border-gray-100 my-1">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* ক্যাটাগরি আইটেমগুলোর অনুভূমিক গ্রিড/ফ্লেক্স */}
        <div className="flex items-center justify-start gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-none py-1.5">
          {categories.map((category, index) => (
            <div
              key={category.id || index}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-white/60 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all cursor-pointer shrink-0"
            >
              {/* আইকন/ইমোজি */}
              <span className="text-sm sm:text-base md:text-lg leading-none">
                {category.icon}
              </span>
              
              {/* ক্যাটাগরির নাম - ছোট ও রেসপনসিভ ফন্ট */}
              <h2 className="text-xs sm:text-sm font-medium sm:font-semibold text-gray-800 whitespace-nowrap">
                {category.nameBn}
              </h2>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Category;