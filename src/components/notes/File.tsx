import React, { CSSProperties, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { FileType } from "../../types";

interface FileProps {
  file: FileType;
}

const FileComponent: React.FC<FileProps> = ({ file }) => {
  if (file.mimetype.startsWith("image/"))
    return (
      <div className={`file-image`}>
        <img
          src={`${import.meta.env.VITE_API_URL}/files/${file.id}`}
          alt={file.originalname}
          onClick={() => window.open(`${import.meta.env.VITE_API_URL}/files/${file.id}`)}
        />

        <div className="toolbar">
          <div className="file-name">{file.originalname}</div>
          <div className="file-download" onClick={() => downloadFile(file)}>
            <FiDownload />
          </div>
        </div>
      </div>
    );

  return (
    <div className="file-file">
      <div className="file-name">{file.originalname}</div>
      <div className="file-download" onClick={() => downloadFile(file)}>
        <FiDownload />
      </div>
    </div>
  );
};

async function downloadFile(file: FileType) {
  const imageSrc = `${import.meta.env.VITE_API_URL}/files/${file.id}`;
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = file.originalname;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default FileComponent;
