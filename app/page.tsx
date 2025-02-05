"use client";

import { apiClient } from "@/lib/api-client";
import Video, { IVideo } from "@/models/Video";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data || []);
      } catch (error) {
        console.error("Error Fetching videos", error);
        setError("Failed to fetch videos");
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Next.js Video Library</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {videos && videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id?.toString()} className="card shadow-lg p-4">
              <Image src={video.thubmnailUrl} alt={video.title} width={300} height={200} className="rounded-lg" />
              <h2 className="text-xl font-semibold mt-2">{video.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{video.description}</p>
              <video controls={video.controls} className="w-full mt-2">
                <source src={video.videourl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No videos available</p>
        )}
      </div>
    </div>
  );
}
