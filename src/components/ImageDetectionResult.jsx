import { useEffect, useRef } from "react";

import ImageUpload from "/src/components/ImageUpload";
import useImageUpload from "/src/hook/UseImageUpload";

function ImageDetectionResult({ image, detections }) {
  const canvasRef = useRef(null);
  const { newImageUpload, handleUploadNewButtonClick } = useImageUpload();

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Get the parent div's width
      const parentDiv = canvas.parentElement;
      const maxWidth = parentDiv.clientWidth; // Ensures canvas fits within the div

      // Maintain aspect ratio
      const scale = maxWidth / img.width;
      const scaledHeight = img.height * scale;

      canvas.width = maxWidth;
      canvas.height = scaledHeight;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw bounding boxes
      detections[0].predictions.predictions.forEach((prediction) => {
        const { x, y, width, height, class: label, confidence } = prediction;

        // Scale bounding box positions and sizes
        const scaledX = x * scale;
        const scaledY = y * scale;
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "lime";
        ctx.rect(
          scaledX - scaledWidth / 2,
          scaledY - scaledHeight / 2,
          scaledWidth,
          scaledHeight
        );
        ctx.stroke();

        ctx.font = "14px Arial";
        ctx.fillStyle = "lime";
        ctx.fillText(
          `${label} (${(confidence * 100).toFixed(1)}%)`,
          scaledX - scaledWidth / 2,
          scaledY - scaledHeight / 2 - 10
        );
      });
    };
  }, [image, detections]);

  return (
    <>
      {newImageUpload ? (
        <ImageUpload />
      ) : (
        <div className="flex flex-col justify-center items-center m-10 p-5 border-2 border-solid border-gray-300 rounded-xl">
          <h3 className="text-2xl font-semibold text-center">
            Detection Result
          </h3>
          <div className="flex flex-col justify-center items-center mt-5">
            <canvas
              ref={canvasRef}
              className="border-2 border-gray-300 rounded-lg"
            />

            {/* Labels */}
            <ol className="flex flex-col list-decimal text-gray-700">
              {detections[0].predictions.predictions.map((prediction, idx) => (
                <li
                  key={idx}
                  className="m-1 font-normal text-[20px] md:text-2xl text-gray-700"
                >
                  <span>{prediction.class}</span>{" "}
                  <span>({(prediction.confidence * 100).toFixed(1)}%)</span>
                </li>
              ))}
            </ol>

            <button
              onClick={handleUploadNewButtonClick}
              className="mt-4 bg-blue-500 text-white w-full font-bold py-3 px-5 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Upload New Image
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageDetectionResult;
