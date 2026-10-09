
'use client';

import React, { useState, useEffect, useRef } from 'react';
import logo from '@/asset/shopping-cart-white-icon.webp';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, authClient } from '@/lib/auth-client';
import { toast } from '@heroui/react';

const Navbar = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data: session, isPending } = useSession();

    // Date
    useEffect(() => {
        const updateFormattedDate = () => {
            const now = new Date();

            const formatter = new Intl.DateTimeFormat('bn-BD', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

            setCurrentDate(formatter.format(now));
        };

        updateFormattedDate();

        const timer = setInterval(updateFormattedDate, 60000);

        return () => clearInterval(timer);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Sign out
    const handleSignOut = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                console.error('Sign out failed:', error);
                return;
            }

            setIsDropdownOpen(false);

            // Session clear হওয়ার পর পুরো page reload হবে
            // window.location.href = '/';
            
            
        } catch (error) {
            console.error('Sign out error:', error);
        }
        toast.success("সফলভাবে লগআউট হয়েছে।")
    };

    // User first letter
    const firstLetter =
        session?.user?.name?.charAt(0).toUpperCase() || 'U';

    return (
        <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <nav className="px-4 sm:px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">

                {/* ================= LEFT SIDE ================= */}
                <Link href="/">
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* Logo */}
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#009640] rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
                            <Image
                                src={logo}
                                height={22}
                                width={22}
                                alt="বাজার দর লোগো"
                                className="object-contain"
                            />
                        </div>

                        {/* Title + Date */}
                        <div className="flex flex-col">
                            <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                                বাজার দর
                            </h1>

                            <span className="text-[10px] sm:text-xs text-gray-500 font-medium min-h-[16px]">
                                {currentDate || 'লোড হচ্ছে...'}
                            </span>
                        </div>

                    </div>
                </Link>

                {/* ================= RIGHT SIDE ================= */}
                <div className="flex items-center">

                    {/* Loading */}
                    {isPending ? (
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
                            <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse" />
                        </div>
                    ) : session?.user ? (

                        /* ================= LOGGED IN ================= */
                        <div
                            className="relative"
                            ref={dropdownRef}
                        >

                            {/* User Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setIsDropdownOpen((prev) => !prev)
                                }
                                className="flex items-center gap-2 sm:gap-3 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >

                                {/* User Name */}
                                <span className="text-sm font-medium text-gray-800 max-w-30 sm:max-w-40 truncate">
                                    {session.user.name}
                                </span>

                                {/* Avatar */}
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#009640] text-white flex items-center justify-center font-semibold text-sm sm:text-base shadow-sm">
                                    {firstLetter}
                                </div>

                                {/* Arrow */}
                                <svg
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                        isDropdownOpen
                                            ? 'rotate-180'
                                            : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>

                            </button>

                            {/* ================= DROPDOWN ================= */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">

                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-gray-100">

                                        <div className="flex items-center gap-3">

                                            {/* Small Avatar */}
                                            <div className="w-10 h-10 rounded-full bg-[#009640] text-white flex items-center justify-center font-semibold">
                                                {firstLetter}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                    {session.user.name}
                                                </p>

                                                <p className="text-xs text-gray-500 truncate mt-0.5">
                                                    {session.user.email}
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    {/* Profile */}
                                    <Link
                                        href="/profile"
                                        onClick={() =>
                                            setIsDropdownOpen(false)
                                        }
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >

                                        <svg
                                            className="w-5 h-5 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5.121 17.804A9 9 0 1118.879 17.804M15 9a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>

                                        <span>Profile</span>

                                    </Link>

                                    {/* Sign Out */}
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50"
                                    >

                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>

                                        <span>Sign Out</span>

                                    </button>

                                </div>
                            )}

                        </div>

                    ) : (

                        /* ================= LOGGED OUT ================= */
                        <div className="flex items-center gap-2 sm:gap-4">

                            {/* Sign In */}
                            <Link href="/sign-in">
                                <button
                                    type="button"
                                    className="text-gray-800 font-medium text-xs sm:text-sm hover:text-green-600 transition-colors px-2 sm:px-3 py-2"
                                >
                                    সাইন ইন
                                </button>
                            </Link>

                            {/* Sign Up */}
                            <Link href="/sign-up">
                                <button
                                    type="button"
                                    className="bg-[#009640] hover:bg-[#007d35] text-white text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap"
                                >
                                    সাইন আপ
                                </button>
                            </Link>

                        </div>
                    )}

                </div>
            </nav>
        </header>
    );
};

export default Navbar;

