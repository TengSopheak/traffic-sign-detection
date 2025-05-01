import { useState } from "react";

const UseVideoUpload = () => {
  const [newVideoUpload, setNewVideoUpload] = useState(false);

  const handleUploadNewButtonClick = () => {
    setNewVideoUpload(true);
  };

  return { newVideoUpload, handleUploadNewButtonClick };
};

export default UseVideoUpload;