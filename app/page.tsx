"use client";
import { useState } from "react";
import Link from "next/link";

// Import tab components
import Gallery from "../app/components/gallery";
import Bookings from "../app/components/bookings";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("gallery");

  const renderContent = () => {
    switch (activeTab) {
      case "gallery":
        return <Gallery />;
      case "book":
        return <Bookings />;
      default:
        return <Gallery />;
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen w-full bg-gradient-to-b from-orange-50 to-green-50">
      {/* NAVBAR */}
      <nav className="w-full flex  items-center px-4 py-3 bg-white shadow-md sticky top-0 z-50">
        <div className="relative w-10 h-10 mr-4">
          <Image
            src="/images/spartan-logo.jpg"
            alt="Spartan Pawana Camp"
            fill
            className=" rounded-full"
            priority
          />
        </div>
        <h1 className="text-xl font-bold text-orange-700">
          Spartan Pawana Camping
        </h1>
      </nav>

      {/* MAIN HERO CARD */}
      <section className="w-full flex justify-center">
        <div className="relative w-full shadow-lg overflow-hidden h-[400px] flex items-center justify-center text-center  ">
          {/* ✅ Full background image using layout fill */}
          <Image
            src="/images/spartan-camp.png"
            alt="Spartan Pawana Camp"
            fill
            className=""
            priority
          />

          {/* Text content */}
          <div className="relative z-10 px-6 md:px-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
              Welcome to Spartan Pawana Camping 🌄
            </h2>
            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto drop-shadow-md">
              Experience the magic of camping by the serene lake — bonfires, BBQ
              nights, and unforgettable sunsets.
            </p>
            <button
              onClick={() => setActiveTab("book")}
              className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-lg"
            >
              Book Your Spot
            </button>
          </div>
        </div>
      </section>

      {/* TAB OPTIONS */}
      <section className="mt-6 w-full flex justify-center">
        <div className="flex bg-white shadow-inner rounded-full px-6 py-3 gap-8 text-gray-700 text-lg">
          {["gallery", "book"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize transition-all ${
                activeTab === tab
                  ? "text-orange-700 font-semibold border-b-2 border-orange-700"
                  : "text-gray-700 hover:text-orange-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* SELECTED CONTENT */}
      <section className="mt-6 w-full flex justify-center ">
        <div className="w-full bg-white  shadow-md p-6 transition-all duration-300">
          {renderContent()}
        </div>
      </section>
      <footer className="mt-12 w-full bg-white shadow-inner py-8 px-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between md:justify-around gap-8">
          {/* 🏕️ Brand Info */}
          <div className="md:w-1/3">
            <h3 className="text-2xl font-bold text-orange-700 mb-3">
              Spartan Pawana Camping 🏕️
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Enjoy a peaceful camping experience by the scenic Pawana Lake.
              Cozy tents, warm bonfires, and unforgettable memories await you
              under the stars.
            </p>
          </div>

          {/* 📞 Contact Info */}
          <div className="md:w-1/3">
            <h4 className="text-xl font-semibold text-orange-700 mb-3">
              Contact Us
            </h4>
            <ul className="text-gray-600 space-y-2">
              <li>📍 Near Pawana Lake, Lonavala, Maharashtra</li>
              <li>📞 +91 90110 17929</li>
              <li>✉️ spartanpawana@gmail.com</li>
              <li>🕓 Check-in: 4 PM | Check-out: 11 AM</li>
            </ul>
          </div>

          {/* 🔗 Quick Links (optional) */}
          {/* <div className="md:w-1/3">
      <h4 className="text-xl font-semibold text-orange-700 mb-3">Quick Links</h4>
      <ul className="text-gray-600 space-y-2">
        <li>
          <button
            onClick={() => setActiveTab("gallery")}
            className="hover:text-orange-700 transition"
          >
            Gallery
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("book")}
            className="hover:text-orange-700 transition"
          >
            Book Now
          </button>
        </li>
      </ul>
    </div> */}
        </div>

        {/* ⚡ Bottom Line */}
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Spartan Pawana Camping. All rights
          reserved.
          <br />
          Crafted with ❤️ by the Spartan Team.
        </div>
      </footer>
    </main>
  );
}
