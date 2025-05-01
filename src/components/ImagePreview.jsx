import { useState } from "react";

import ImageUpload from "/src/components/ImageUpload";
import Loading from "/src/components/Loading";
import ImageDetectionResult from "/src/components/ImageDetectionResult";
import api from "../api.js";
import useImageUpload from '../hook/useImageUpload.jsx';

function ImagePreview({ image, file }) {
  const { newImageUpload, handleUploadNewButtonClick } = useImageUpload();
  const [detection, setDetection] = useState(false);
  const [imageDetectionResult, setImageDetectionResult] = useState(null);

  const handleDetectButtonClick = async () => {
    setDetection(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload-image", formData, {
        baseURL: import.meta.env.VITE_IMAGE_API_URL,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageDetectionResult(response.data);
    } catch (error) {
      console.error("Error detecting traffic signs:", error);
    } finally {
      setDetection(false);
    }
  };

  if (newImageUpload) {
    return <ImageUpload />;
  }

  // Hide ImagePreview and only show ImageDetectionResult if detectionResult is available
  if (imageDetectionResult) {
    return <ImageDetectionResult image={image} detections={imageDetectionResult} />;
  }

  return (
    <div className="justify-center items-center p-5 m-10 text-2xl text-center font-semibold border-2 border-solid border-gray-300 rounded-xl">
      <h3>Image Preview</h3>
      <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-1">
        <div className="flex flex-col justify-center items-center m-5 text-xl text-left text-gray-800 h-120 border-2 w-full border-solid border-gray-300 rounded-xl p-5">
          <h4>Uploaded Image</h4>
          <img
            src={image}
            alt="uploaded image"
            className="pt-5 h-100"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "/src/assets/placeholder.png"; // Placeholder image
            }}
          />
        </div>

        <div className="flex flex-col justify-between m-5 text-xl text-center text-gray-800 h-auto md:h-120 lg:h-120 border-2 w-full border-solid border-gray-300 rounded-xl p-5">
          <div>
            <h4>Traffic Sign Detection</h4>
            <p className="text-md font-normal text-gray-700 mt-2">
              Analyze your image to detect traffic signs using our machine
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
              Upload New Image
            </button>
          </div>
        </div>
      </div>

      {/* Show loading while fetching */}
      {detection && <Loading />}
    </div>
  );
}

export default ImagePreview;
