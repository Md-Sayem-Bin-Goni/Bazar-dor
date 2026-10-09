import Link from "next/link";

export default function NotFound() {
return ( <main className="flex min-h-[70vh] items-center justify-center bg-[#f1f6f1] px-4 py-12"> <div className="w-full max-w-lg rounded-3xl border border-[#e0e9e1] bg-white p-8 text-center shadow-sm sm:p-12"> <div className="text-7xl font-extrabold tracking-tight text-green-700 sm:text-8xl">
404 </div>

```
    <div className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl">
      🛒
    </div>

    <h1 className="mt-6 text-2xl font-bold text-[#25332a]">
      পেজটি খুঁজে পাওয়া যায়নি!
    </h1>

    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
      আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
      অথবা ঠিকানাটি ভুল হয়েছে।
    </p>

    <Link
      href="/"
      className="btn mt-7 border-0 bg-green-700 px-8 text-white shadow-sm hover:bg-green-800"
    >
      ← হোম পেজে ফিরে যান
    </Link>

    <p className="mt-6 text-xs text-gray-400">
      Bazar-Dor — আপনার নিত্যদিনের বাজারের বিশ্বস্ত সঙ্গী
    </p>
  </div>
</main>


);
}
