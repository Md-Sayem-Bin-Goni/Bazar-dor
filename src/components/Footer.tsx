import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#f8faf9] border-t border-gray-200 py-6 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-600">
        {/* বাম পাশের লেখা */}
        <div>
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>

        {/* ডান পাশের লেখা */}
        <div>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
};

export default Footer;