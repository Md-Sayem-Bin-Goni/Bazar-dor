export default function Loading() {
return ( <main
   className="flex min-h-[60vh] items-center justify-center bg-[#f1f6f1] px-4 py-12"
   aria-label="পেজ লোড হচ্ছে"
 > <div className="w-full max-w-sm text-center"> <div className="relative mx-auto flex h-20 w-20 items-center justify-center"> <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-100 border-t-green-700" />

```
      <span className="text-3xl">🛒</span>
    </div>

    <h2 className="mt-6 text-xl font-bold text-[#25332a]">
      একটু অপেক্ষা করুন
    </h2>

    <p className="mt-2 text-sm text-gray-500">
      আপনার জন্য বাজারের তথ্য প্রস্তুত করা হচ্ছে...
    </p>

    <div className="mt-7 space-y-3">
      <div className="skeleton h-4 w-full bg-green-100" />
      <div className="skeleton h-4 w-4/5 bg-green-100" />
      <div className="skeleton h-20 w-full rounded-xl bg-green-50" />
    </div>
  </div>
</main>


);
}
