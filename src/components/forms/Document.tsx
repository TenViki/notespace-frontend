import React from "react";

interface DocumentProps {
  file: File;
  bytesBefore: number;
  loaded: number;
}

const Document: React.FC<DocumentProps> = ({ bytesBefore, file, loaded }) => {
  const localLoaded = Math.max(0, loaded - bytesBefore);
  const localPercentage = Math.min(
    100,
    (Math.min(localLoaded, file.size) / file.size) * 100
  );

  if (file.type.includes("image")) {
    const url = URL.createObjectURL(file);
    return (
      <div className="upload-image">
        <img src={url} alt="" />
        <div
          className="progress"
          style={
            {
              "--progress": localPercentage,
            } as React.CSSProperties
          }
        ></div>
      </div>
    );
  }

  return (
    <div className="file-upload">
      <div className="file-title">{file.name}</div>
      <div className="file-percentage">{Math.round(localPercentage)}%</div>
      <div
        className="progress"
        style={{ "--progress": localPercentage } as React.CSSProperties}
      ></div>
    </div>
  );
};

export default Document;
