import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faFileVideo } from "@fortawesome/free-solid-svg-icons";

import ImageUpload from "/src/components/ImageUpload";
import VideoUpload from "/src/components/VideoUpload";
import LiveDetection from "/src/components/LiveDetection";

function Feature() {
  const [activeFeature, setActiveFeature] = useState("image");

  const handleImageUploadClick = () => {
    setActiveFeature("image");
  };

  const handleVideoUploadClick = () => {
    setActiveFeature("video");
  };

  const handleLiveDetectionClick = () => {
    setActiveFeature("live");
  };

  return (
    <div>
      <div className="m-10 justify-center items-center">
        <div className="flex flex-row justify-center items-center gap-3 border-2 border-gray-300 rounded-lg p-2 bg-gray-50">
          <button
            onClick={handleImageUploadClick}
            className={`flex flex-row gap-3 items-center justify-center w-screen rounded-lg p-2 hover:bg-gray-200 transition duration-200 ease-in-out ${
              activeFeature === "image" ? "bg-gray-200" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faUpload}
              size="1x"
              className="text-gray-700"
            />
            <p className="text-md font-bold text-gray-700">Image Upload</p>
          </button>

          <button
            onClick={handleVideoUploadClick}
            className={`flex flex-row gap-3 items-center justify-center w-screen rounded-lg p-2 hover:bg-gray-200 transition duration-200 ease-in-out ${
              activeFeature === "video" ? "bg-gray-200" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faFileVideo}
              size="1x"
              className="text-gray-700"
            />
            <p className="text-md font-bold text-gray-700">Video Upload</p>
          </button>

          <button
            onClick={handleLiveDetectionClick}
            className={`flex flex-row gap-3 items-center justify-center w-screen rounded-lg p-2 hover:bg-gray-200 transition duration-200 ease-in-out ${
              activeFeature === "live" ? "bg-gray-200" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faCamera}
              size="1x"
              className="text-gray-700"
            />
            <p className="text-md font-bold text-gray-700">Live Detection</p>
          </button>
        </div>
      </div>

      <div>{activeFeature === "image" && <ImageUpload />}</div>
      <div>{activeFeature === "video" && <VideoUpload />}</div>
      <div>{activeFeature === "live" && <LiveDetection />}</div>
    </div>
  );
}

export default Feature;
