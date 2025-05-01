import { useState } from "react";

const UseImageUpload = () => {
  const [newImageUpload, setNewImageUpload] = useState(false);

  const handleUploadNewButtonClick = () => {
    setNewImageUpload(true);
  };

  return { newImageUpload, handleUploadNewButtonClick };
};

export default UseImageUpload;