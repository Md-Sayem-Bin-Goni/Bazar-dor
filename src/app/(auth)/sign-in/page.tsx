"use client";

import React from "react";
import Link from "next/link";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    console.log("Sign In Data:", data);
    const { data: resData, error } = await authClient.signIn.email({
      email: data.email, // required, The email address of the user.
      password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
      callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)

    });
    console.log("SIGN IN DATA:", data);
    console.log("SIGN IN ERROR:", error);

    toast.success("সাইন ইন সফল হয়েছে!");
  };


  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  const githubsignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github"
    })
  }
  return (
    <div className=" mt-10 flex flex-col items-center justify-center p-4">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          সাইন ইন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2">
          বিস্তারিত দাম , বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Main Card with HeroUI Form */}
      <div className="w-full max-w-md bg-[#fafbfa] border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <Form className="w-full space-y-4" onSubmit={onSubmit}>
          <Fieldset className="w-full space-y-4">
            <FieldGroup className="space-y-4">
              {/* Email Field */}
              <TextField
                isRequired
                name="email"
                type="email"
                className="w-full space-y-1.5"
              >
                <Label className="block text-xs font-bold text-gray-800">
                  ইমেইল
                </Label>
                <Input
                  placeholder="you@example.com"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#009640] transition-colors"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              {/* Password Field */}
              <TextField
                isRequired
                name="password"
                type="password"
                className="w-full space-y-1.5"
                validate={(value) => {
                  if (value.length < 8) {
                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                  }
                  return null;
                }}
              >
                <Label className="block text-xs font-bold text-gray-800">
                  পাসওয়ার্ড
                </Label>
                <Input
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#009640] transition-colors"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </FieldGroup>

            {/* Submit Button */}
            <Fieldset.Actions className="pt-2">
              <Button
                type="submit"
                className="w-full bg-[#009640] hover:bg-[#008237] text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-sm cursor-pointer border-none"
              >
                সাইন ইন
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="bg-[#fafbfa] px-3 text-xs text-gray-500 font-medium absolute">
            অথবা
          </span>
        </div>

        {/* Social Auth Buttons */}
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full">
  {/* Google Login */}
  <Button
    onClick={signIn}
    type="button"
    className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-semibold text-gray-800 hover:bg-gray-50 active:scale-[0.98] transition-all shadow-2xs cursor-pointer w-full"
  >
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
    <span className="truncate">Google দিয়ে চালিয়ে যান</span>
  </Button>

  {/* GitHub Login */}
  <Button
    onClick={githubsignIn}
    type="button"
    className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-semibold text-gray-800 hover:bg-gray-50 active:scale-[0.98] transition-all shadow-2xs cursor-pointer w-full"
  >
    <svg className="w-4 h-4 fill-gray-900 shrink-0" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
    <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
  </Button>
</div>
        {/* Don't have an account link */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-600 font-medium">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="text-[#009640] hover:underline font-bold transition-all"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-6">
        <Link
          href="/"
          className="text-xs text-gray-500 font-medium hover:text-gray-800 transition-colors flex items-center gap-1"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}