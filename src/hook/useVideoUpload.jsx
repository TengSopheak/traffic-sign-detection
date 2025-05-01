import { useState } from "react";

const useVideoUpload = () => {
  const [newVideoUpload, setNewVideoUpload] = useState(false);

  const handleUploadNewButtonClick = () => {
    setNewVideoUpload(true);
  };

  return { newVideoUpload, handleUploadNewButtonClick };
};

export default useVideoUpload;