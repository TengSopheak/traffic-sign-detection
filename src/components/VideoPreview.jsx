import { useState } from "react";

import VideoUpload from "/src/components/VideoUpload";
import Loading from "/src/components/Loading";
import VideoDetectionResult from "/src/components/VideoDetectionResult";
import api from "../api.js";
import useVideoUpload from "../hook/useVideoUpload.jsx";

function VideoPreview({ video, file }) {
  const { newVideoUpload, handleUploadNewButtonClick } = useVideoUpload();
  const [detection, setDetection] = useState(false);
  const [videoDetectionResult, setVideoDetectionResult] = useState(null);

  const handleDetectButtonClick = async () => {
    setDetection(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload-video", formData, {
        baseURL: import.meta.env.VITE_VIDEO_API_URL,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Detection response:", response.data); // for debugging

      // Make sure to access the results property
      setVideoDetectionResult(response.data.results || []);
    } catch (error) {
      console.error("Error detecting traffic signs:", error);
      setVideoDetectionResult([]); // Set empty array on error
    } finally {
      setDetection(false);
    }
  };

  if (newVideoUpload) {
    return <VideoUpload />;
  }

  // Hide VideoPreview and only show VideoDetectionResult if detectionResult is available
  if (videoDetectionResult) {
    return <VideoDetectionResult video={video} detections={videoDetectionResult} />;
  }

  return (
    <div className="justify-center items-center p-5 m-10 text-2xl text-center font-semibold border-2 border-solid border-gray-300 rounded-xl">
      <h3>Video Preview</h3>
      <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-1">
        <div className="flex flex-col justify-center items-center p-5 m-5 text-xl text-left text-gray-800 h-120 border-2 w-full border-solid border-gray-300 rounded-xl">
          <h4>Uploaded Video</h4>
          <video
            src={video}
            controls
            autoPlay
            muted
            playsInline
            className="p-5 h-full w-full"
          />
        </div>

        <div className="flex flex-col justify-between m-5 text-xl text-center text-gray-800 h-auto md:h-120 lg:h-120 border-2 w-full border-solid border-gray-300 rounded-xl p-5">
          <div>
            <h4>Traffic Sign Detection</h4>
            <p className="text-md font-normal text-gray-700 mt-2">
              Analyze your video to detect traffic signs using our machine
              learning model.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={handleDetectButtonClick}
              className="mt-4 bg-blue-500 text-white w-full font-bold py-3 px-5 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Detect Traffic Signs
            </button>
            <button
              onClick={handleUploadNewButtonClick}
              className="mt-4 text-gray-800 w-full font-bold py-3 px-5 rounded-lg border-2 border-gray-200 hover:bg-gray-200 transition duration-200 ease-in-out"
            >
              Upload New Video
            </button>
          </div>
        </div>
      </div>

      {/* Show loading while fetching */}
      {detection && <Loading />}
    </div>
  );
}

export default VideoPreview;
