"use client";
import { useState } from "react";
import Image from "next/image";

import { photos, videos } from "../lib/data";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("photos");

  const mediaToShow = activeTab === "photos" ? photos : videos;

  // Split media into up to 3 rows
  const rows = [];
  const itemsPerRow = Math.ceil(mediaToShow.length / 3);
  for (let i = 0; i < mediaToShow.length; i += itemsPerRow) {
    rows.push(mediaToShow.slice(i, i + itemsPerRow));
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tabs */}
      <div className="flex gap-4 ">
        <button
          onClick={() => setActiveTab("photos")}
          className={`px-4 py-2 flex-1 rounded-xl font-semibold transition-all ${
            activeTab === "photos"
              ? "bg-orange-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Photos
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === "videos"
              ? "bg-orange-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Videos
        </button>
      </div>

      {/* Unified Scroll Area */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div
          className="flex flex-col gap-4 px-4 py-4"
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridTemplateRows: `repeat(${Math.min(rows.length, 2)}, 1fr)`,
            gridAutoColumns: "minmax(250px, 1fr)",
          }}
        >
          {mediaToShow.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden"
            >
              {activeTab === "photos" ? (
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  className="w-full h-48 object-cover"
                  poster="/images/video-placeholder.jpg"
                />
              )}
              <p className="p-3 text-center font-medium text-gray-700">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
