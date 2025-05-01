import { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";

function LiveDetection() {
  const [startCamera, setStartCamera] = useState(false);
  const [startDetection, setStartDetection] = useState(false);
  const [cameraText, setCameraText] = useState("Start Camera");
  const [detectionText, setDetectionText] = useState("Start Detection");

  const handleStartCameraClick = () => {
    if (startCamera) {
      setCameraText("Start Camera");
      setStartCamera(false);
      // ensure detection is stopped when camera is stopped
      setDetectionText("Start Detection");
      setStartDetection(false);
    } else {
      setCameraText("Stop Camera");
      setStartCamera(true);
    }
  };

  const handleStartDetectionClick = () => {
    if (startDetection) {
      setDetectionText("Start Detection");
      setStartDetection(false);
    } else {
      setDetectionText("Stop Detection");
      setStartDetection(true);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center text-center justify-center p-10 m-10 border-2 border-solid border-gray-300 rounded-xl gap-5">
      <div className="flex flex-col items-center text-center justify-center p-5 w-full border-2 border-solid border-gray-300 rounded-xl gap-3">
        <div className="flex flex-row items-center justify-center gap-3">
          <FontAwesomeIcon
            icon={faVideoCamera}
            className="text-gray-700 text-3xl"
          />
          <h3 className="text-xl font-bold text-gray-700">Live Detection</h3>
        </div>
        <p className="text-lg md:text-xl text-gray-700">
          Start your camera to detect traffic signs in real-time
        </p>
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
          <button
            onClick={handleStartCameraClick}
            className={`mt-2 text-white w-full font-bold py-3 px-5 rounded-lg transition duration-200 ease-in-out
              ${
                startCamera
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {cameraText}
          </button>
          <button
            onClick={handleStartDetectionClick}
            disabled={!startCamera}
            className={`mt-2 text-white w-full font-bold py-3 px-5 rounded-lg transition duration-200 ease-in-out
              ${
                startDetection
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }
              ${!startCamera ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {detectionText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LiveDetection;
