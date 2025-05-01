import { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

import ImagePreview from "/src/components/ImagePreview";

function ImageUpload() {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFile = (file) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage(
          "Unsupported file format. Please upload a JPG, PNG, or JPEG file."
        );
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        // Check if file size exceeds 10MB
        setErrorMessage(
          "File size exceeds 10MB. Please upload a smaller image."
        );
        return;
      }

      const url = URL.createObjectURL(file);
      setImageURL(url); // Set URL to show preview
      setImageUploaded(true);
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
      {!imageUploaded ? (
        <div
          onClick={handleButtonClick}
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
            Drag and Drop Your Image Here
          </h3>
          <p className="text-lg md:text-xl lg:text-xl text-gray-700 mt-1">
            or click to browse your file.
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering container click
              handleButtonClick();
            }}
            className="mt-5 mb-5 bg-blue-500 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Select Image
          </button>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-md md:text-lg lg:text-lg text-gray-700">
            Supported formats: JPG, PNG, JPEG (Max size: 10MB)
          </p>

          {errorMessage && (
            <p className="text-red-500 font-bold mt-2">{errorMessage}</p> // Display error message
          )}

          <div>
            {imageUploaded && imageURL && (
              <ImagePreview image={imageURL} file={file} />
            )}
          </div>
        </div>
      ) : (
        <ImagePreview image={imageURL} file={file} />
      )}
    </div>
  );
}

export default ImageUpload;
