import Banner from '@/components/Banner';
import Category from '@/components/Category';
import ProductCard from '@/components/ProductCard';

export interface ProductChange {
  dir: 'up' | 'down' | 'same' | string;
  pct: number;
}

export interface Product {
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
  change: ProductChange;
}

// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর করার ফাংশন
const toBengaliNumber = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
};

const HomePage = async () => {
  let data: Product[] = [];

  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

// দাম বেড়েছে এমন প্রথম ৬টি পণ্য (সবচেয়ে বেশি % বাড়া পণ্যগুলো আগে থাকবে)
const priceUp: Product[] = data
  .filter((product) => product.change?.dir === 'up')
  .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
  .slice(0, 6);

// দাম কমেছে এমন প্রথম ৬টি পণ্য (সবচেয়ে বেশি % কমা পণ্যগুলো আগে থাকবে)
const priceDown: Product[] = data
  .filter((product) => product.change?.dir === 'down')
  .sort((a, b) => (a.change?.pct || 0) - (b.change?.pct || 0))
  .slice(0, 6);

  return (
    <div>
      
      <Banner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">

        {/* ১. সেকশন: আজকে দাম বেড়েছে */}
        {priceUp.length > 0 && (
          <section>
            <div className="mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-red-500 text-sm sm:text-base">▲</span> আজকে দাম বেড়েছে
              </h2>
            </div>

            {/* রেসপন্সিভ গ্রিড: মোবাইলে ১টি, ট্যাবলেটে ২টি, ল্যাপটপ/ডেস্কটপে ৩টি এবং বড় স্ক্রিনে ৪টি */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {priceUp.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ২. সেকশন: আজকে দাম কমেছে */}
        {priceDown.length > 0 && (
          <section>
            <div className="mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-[#009640] text-sm sm:text-base">▼</span> আজকে দাম কমেছে
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {priceDown.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ৩. সেকশন: সব পণ্য */}
        <section id='allproduct'
          className="scroll-mt-24"
        >
          <div className="mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">সব পণ্য</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              মোট {toBengaliNumber(data.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>



  );
};

export default HomePage;