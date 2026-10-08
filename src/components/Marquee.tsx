import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const toBengaliNumber = (num?: number | string): string => {
    if (num === undefined || num === null) return "";

    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return num
        .toString()
        .replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
};

interface IProduct {
    nameBn?: string;
    id: number | string;
    unit?: string;
    image?: string;
    today?: number;
    categoryIcon?: string;
    change?: {
        dir?: "up" | "down";
        pct?: number;
    };
}

const Marquee = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
        {
            next: { revalidate: 3600 },
        }
    );

    const data: IProduct[] = await res.json();

    return (
        <div className="w-full bg-[#f8fbf9] border-y border-gray-200/80 py-1.5 select-none overflow-hidden">
            <MarqueeText
                direction="right"
                duration={20}
                pauseOnHover={true}
            >
                <div className="flex items-center">
                    {data.map((product, index) => {
                        const isUp = product.change?.dir === "up";

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

                                {/* আজকের দাম */}
                                <span className="text-gray-600 font-bold">
                                    ৳{toBengaliNumber(product.today)} টাকা/
                                    {product.unit === "kg"
                                        ? "কেজি"
                                        : product.unit}
                                </span>

                                {/* দামের পরিবর্তন */}
                                <span
                                    className={`inline-flex items-center gap-0.5 font-bold text-xs ${
                                        isUp
                                            ? "text-red-600"
                                            : "text-emerald-600"
                                    }`}
                                >
                                    <span>{isUp ? "▲" : "▼"}</span>
                                    <span>
                                        {toBengaliNumber(product.change?.pct)}%
                                    </span>
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