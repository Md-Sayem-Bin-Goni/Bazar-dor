"use client";

import React, { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";

const ProfilePage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState("");

    const user = session?.user;
    const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

    React.useEffect(() => {
        if (user?.name) setName(user.name);
    }, [user?.name]);

const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();

if (!name.trim()) {
  setMessage("নাম লিখুন।");
  return;
}

try {
  setIsUpdating(true);
  setMessage("");

  const response = await fetch("/api/auth/update-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.trim() }),
  });

  if (!response.ok) {
    throw new Error("নাম আপডেট করা যায়নি।");
  }

  setMessage("নাম সফলভাবে আপডেট হয়েছে।");
  toast.success("নাম আপডেট হয়েছে!")
  router.refresh();
} catch {
  setMessage("নাম আপডেট করতে সমস্যা হয়েছে।");
} finally {
  setIsUpdating(false);
}

};

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/");
                    router.refresh();
                },
            },
        });
        toast.success("সফলভাবে লগআউট হয়েছে।")
    };

    if (isPending) {
        return (<div className="flex min-h-[60vh] items-center justify-center"> <span className="loading loading-spinner loading-lg text-green-700" /> </div>
        );
    }

    if (!user) {
        return (<main className="flex min-h-[60vh] items-center justify-center bg-[#f1f6f1] px-4"> <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm"> <h2 className="text-xl font-bold text-gray-800">
            লগইন করা নেই </h2> <p className="mt-2 text-sm text-gray-500">
                প্রোফাইল দেখতে প্রথমে লগইন করুন। </p>
            <button
                onClick={() => router.push("/sign-in")}
                className="btn mt-5 border-0 bg-green-700 text-white hover:bg-green-800"
            >
                লগইন করুন </button> </div> </main>
        );
    }

    return (<main className="min-h-screen bg-[#f1f6f1] px-4 py-10 sm:py-14"> <div className="mx-auto max-w-xl"> <div className="mb-5"> <h1 className="text-2xl font-bold text-[#25332a]">
        আমার প্রোফাইল </h1> <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন। </p> </div>


        {/* User Information */}
        <section className="flex flex-col gap-4 rounded-2xl border border-[#e0e9e1] bg-white/80 p-5 shadow-sm sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl font-bold text-green-800">
                    {initial}
                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-[#25332a]">
                        {user.name}
                    </h2>
                    <p className="truncate text-sm text-gray-500">
                        {user.email}
                    </p>
                </div>
            </div>

            <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error btn-sm border-red-500 text-red-500 transition-all duration-200 hover:border rounded-2xl p-2 hover:bg-red-200 "            >
                ↪ সাইন আউট
            </button>
        </section>

        {/* Update Profile */}
        <section className="mt-5 rounded-2xl border border-[#e0e9e1] bg-white/80 p-5 sm:p-6">
            <h2 className="mb-6 text-lg font-semibold text-[#25332a]">
                তথ্য
            </h2>

            <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        নাম
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="আপনার নাম লিখুন"
                        className="input input-bordered w-full bg-transparent focus:border-green-600 focus:outline-none"
                        required
                    />
                </div>

                {message && (
                    <p className="text-sm text-gray-600" role="status">
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isUpdating || name.trim() === user.name}
                    className="btn w-full border-0 bg-green-700 text-white shadow-sm hover:bg-green-800 disabled:bg-gray-300"
                >
                    {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                </button>
            </form>
        </section>
    </div>
    </main>


    );
};

export default ProfilePage;
