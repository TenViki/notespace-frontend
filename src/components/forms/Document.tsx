import React from "react";

interface DocumentProps {
  file: File;
  bytesBefore: number;
  loaded: number;
  total: number;
}

const Document: React.FC<DocumentProps> = ({
  bytesBefore,
  file,
  loaded,
  total,
}) => {
  const localLoaded = Math.max(0, loaded - bytesBefore);
  const localPercentage = Math.min(
    100,
    Math.round((Math.min(localLoaded, file.size) / file.size) * 100)
  );

  return (
    <div>
      {file.name} - {localPercentage}%
    </div>
  );
};

export default Document;
