import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import "./Uploader.css";

export default function Uploader({ setInstructionsFile }) {
  const onDrop = useCallback(acceptedFiles => {
    setInstructionsFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="uploader" {...getRootProps()}>
      <input {...getInputProps()} />
      <div>Drop the instruction file here ...</div>
      <button>Or click to upload</button>
    </div>
  );
}
