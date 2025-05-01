import { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

import VideoPreview from "/src/components/VideoPreview";

function VideoUpload() {
  const [uploadVideo, setUploadVideo] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [videoURL, setVideoURL] = useState(null);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVideoUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFile = (file) => {
    if (file) {
      if (!file.type.startsWith("video/")) {
        setErrorMessage(
          "Unsupported file format. Please upload a video file (e.g., MP4, MOV, MKV)."
        );
        return;
      }

      if (file.size > 100 * 1024 * 1024) {
        // Check if file size exceeds 100MB
        setErrorMessage(
          "File size exceeds 100MB. Please upload a smaller video."
        );
        return;
      }

      const url = URL.createObjectURL(file);
      setVideoURL(url); // Set URL to show preview
      setUploadVideo(true);
      setFile(file); // Store the file for later use
      setErrorMessage(""); // Clear any previous error
    }
  };

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    handleFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    handleFile(file);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      console.log("Dropped file:", file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  return (
    <div>
      {!uploadVideo ? (
        <div
          onClick={handleVideoUploadClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center text-center justify-center p-10 m-10 border-3 border-dashed border-gray-300 rounded-xl
              ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        >
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className="text-gray-700 text-5xl md:text-7xl lg:text-10xl"
          />
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mt-3">
            Drag and Drop Your Video Here
          </h3>
          <p className="text-lg md:text-xl lg:text-xl text-gray-700 mt-1">
            or click to browse your file.
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering container click
              handleVideoUploadClick();
            }}
            className="mt-5 mb-5 bg-blue-500 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Select Video
          </button>
          <input
            type="file"
            accept="video/mp4, video/mov, video/mkv"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-md md:text-lg lg:text-lg text-gray-700">
            Supported formats: MP4, MOV, MKV (Max size: 100MB)
          </p>

          {errorMessage && (
            <p className="text-red-500 font-bold mt-2">{errorMessage}</p> // Display error message
          )}

          <div>
            {uploadVideo && videoURL && (
              <VideoPreview video={videoURL} file={file} />
            )}
          </div>
        </div>
      ) : (
        <VideoPreview video={videoURL} file={file} />
      )}
    </div>
  );
}

export default VideoUpload;
