"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
error,
reset,
}: {
error: Error & { digest?: string };
reset: () => void;
}) {
useEffect(() => {
console.error(error);
}, [error]);

return ( <main className="flex min-h-[70vh] items-center justify-center bg-[#f1f6f1] px-4 py-12"> <div className="w-full max-w-md rounded-3xl border border-[#e0e9e1] bg-white p-8 text-center shadow-sm sm:p-10"> <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-4xl">
⚠️ </div>

```
    <h1 className="mt-6 text-2xl font-bold text-[#25332a]">
      কিছু একটা সমস্যা হয়েছে!
    </h1>

    <p className="mt-3 text-sm leading-6 text-gray-500">
      দুঃখিত, পেজটি লোড করার সময় একটি সমস্যা হয়েছে।
      আবার চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
    </p>

    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
      <button
        onClick={() => reset()}
        className="btn border-0 bg-green-700 text-white hover:bg-green-800"
      >
        আবার চেষ্টা করুন
      </button>

      <Link
        href="/"
        className="btn border border-gray-200 bg-white text-gray-700 hover:border-green-600 hover:bg-green-50"
      >
        হোম পেজ
      </Link>
    </div>
  </div>
</main>


);
}
