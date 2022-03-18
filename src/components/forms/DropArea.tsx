import React, { DragEventHandler } from "react";
// import "./droparea.scss";

export interface DropAreaProps {
  handleDrop: (files: FileList) => void;
  setDragging: (dragging: boolean) => void;
}

const DropArea: React.FC<DropAreaProps> = ({
  handleDrop,
  children,
  setDragging: setDraggingParent,
}) => {
  const [dragging, setDragging] = React.useState(false);
  const [dragCounter, setDragCounter] = React.useState(0);

  const onDrag: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragIn: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
      setDraggingParent(true);
    }
  };

  const onDragOut: DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter - 1);
    if (dragCounter - 1 > 0) return;
    setDragging(false);
    setDraggingParent(false);
  };

  const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    setDraggingParent(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
  };

  return (
    <div
      onDragEnter={onDragIn}
      onDragLeave={onDragOut}
      onDragOver={onDrag}
      onDrop={onDrop}
      className={`files-container ${dragging ? "active" : ""}`}
    >
      {children}
    </div>
  );
};

export default DropArea;
