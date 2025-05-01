import { useEffect, useRef, useMemo } from "react";
import useVideoUpload from "/src/hook/UseVideoUpload";
import VideoUpload from "/src/components/VideoUpload";

function VideoDetectionResult({ video, detections }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const { newVideoUpload, handleUploadNewButtonClick } = useVideoUpload();
  const frameRate = 30; // Default frame rate, adjust if needed

  // Group predictions by frame
  const groupedDetections = useMemo(() => {
    if (!Array.isArray(detections)) return new Map();

    const map = new Map();
    detections.forEach((det) => {
      const frame = det.frame;
      if (!map.has(frame)) {
        map.set(frame, []);
      }
      // Filter out invalid predictions
      const validPredictions = (det.predictions || []).filter(
        (p) => p.bbox && p.class && p.confidence !== undefined
      );
      map.get(frame).push(...validPredictions);
    });
    return map;
  }, [detections]);

  const handleResizeAndDraw = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;

    if (!video || !canvas || !container) return;

    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const containerWidth = container.clientWidth;
    const scaledHeight = containerWidth / videoAspectRatio;

    canvas.width = containerWidth;
    canvas.height = scaledHeight;
    video.width = containerWidth;
    video.height = scaledHeight;
  };

  const drawFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!video || !canvas || !ctx || video.paused || video.ended) return;

    const currentTime = video.currentTime;
    const currentFrame = Math.round(currentTime * frameRate);

    // Debugging (comment out for production)
    console.log(
      `Rendering Frame ${currentFrame} at ${currentTime.toFixed(2)}s`,
      `Detections: ${groupedDetections.get(currentFrame)?.length || 0}`
    );

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const framePredictions = groupedDetections.get(currentFrame);
    if (!framePredictions || framePredictions.length === 0) return;

    const imgWidth = video.videoWidth;
    const imgHeight = video.videoHeight;

    const scaleX = canvas.width / imgWidth;
    const scaleY = canvas.height / imgHeight;

    framePredictions.forEach((pred) => {
      const { bbox, class: label, confidence } = pred;
      if (!bbox) return;

      const scaledX = bbox.x * scaleX;
      const scaledY = bbox.y * scaleY;
      const scaledWidth = bbox.width * scaleX;
      const scaledHeight = bbox.height * scaleY;

      // Draw bounding box
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

      // Draw label
      ctx.font = "14px Arial";
      ctx.fillStyle = "lime";
      ctx.fillText(
        `${label} (${(confidence * 100).toFixed(1)}%)`,
        scaledX - scaledWidth / 2,
        scaledY - scaledHeight / 2 - 10
      );
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animationId;
    const animate = () => {
      handleResizeAndDraw();
      drawFrame();
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    video.addEventListener("loadedmetadata", handleResizeAndDraw);

    return () => {
      cancelAnimationFrame(animationId);
      video.removeEventListener("loadedmetadata", handleResizeAndDraw);
    };
  }, [groupedDetections]);

  return (
    <>
      {newVideoUpload ? (
        <VideoUpload />
      ) : (
        <div className="flex flex-col justify-center items-center m-10 p-5 border-2 border-solid border-gray-300 rounded-xl">
          <h3 className="text-2xl font-semibold text-center">
            Detection Result
          </h3>

          <div className="relative mt-5">
            <video
              ref={videoRef}
              src={video}
              controls
              muted
              playsInline
              className="border-2 border-gray-300 rounded-lg"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
          </div>

          <button
            onClick={handleUploadNewButtonClick}
            className="mt-10 bg-blue-500 text-white w-full font-bold py-3 px-5 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Upload New Video
          </button>
        </div>
      )}
    </>
  );
}

export default VideoDetectionResult;
