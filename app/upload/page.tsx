"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">
          Upload New Reel
        </h1>
        <VideoUploadForm />
      </div>
    </div>
  );
}
