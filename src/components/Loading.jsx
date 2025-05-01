import { useEffect } from "react";

function Loading() {
  useEffect(() => {
    // Disable scrolling when the loading screen is active
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when the loading screen is removed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-20 w-20 lg:h-24 lg:w-24 border-t-4 border-b-4 border-primary mb-4"></div>
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">
            Processing Image
          </h3>
          <p className="text-[18px] lg:text-xl text-gray-600 text-center text-sm">
            Our AI model is analyzing your image or video to detect traffic signs. This may take a few moments.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
