import { useState } from "react";

const useImageUpload = () => {
  const [newImageUpload, setNewImageUpload] = useState(false);

  const handleUploadNewButtonClick = () => {
    setNewImageUpload(true);
  };

  return { newImageUpload, handleUploadNewButtonClick };
};

export default useImageUpload;