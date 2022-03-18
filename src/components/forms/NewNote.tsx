import React from "react";
import "./newnote.scss";
import SlideMenu from "../shared/SlideMenu";
import DropArea from "./DropArea";
import { FiUpload } from "react-icons/fi";

interface NewNoteProps {
  opened: boolean;
  close: () => void;
  open: () => void;
}

const NewNote: React.FC<NewNoteProps> = ({ opened, close, open }) => {
  const [dragging, setDragging] = React.useState(false);
  const [dragCounter, setDragCounter] = React.useState(0);
  const [files, setFiles] = React.useState<FileList>();
  const uploadProgress = React.useRef(0);

  document.ondragenter = (e) => {
    e.preventDefault();
    setDragCounter(dragCounter + 1);
    if (e?.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  document.ondragover = (e) => e.preventDefault();

  document.ondragleave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter - 1);
    if (dragCounter - 1 > 0) return;
    setDragging(false);
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    open();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
  };

  return (
    <>
      <SlideMenu opened={opened} close={close} title="New note" width="20rem">
        <input type="text" placeholder="Tag" />
        <input type="text" placeholder="Label" />
        <input type="date" placeholder="For date" />

        <div className="add-note-files">
          <div className="file-title">Attachements:</div>
        </div>

        <button>
          <div className="text">Create</div>
        </button>
      </SlideMenu>

      <div
        className={`file-overlay ${dragging ? "active" : ""}`}
        onDrop={onDrop}
      >
        <div className="file-overlay-content">
          <FiUpload />
          <div className="drop-label">Drop files here</div>
        </div>
      </div>
    </>
  );
};

export default NewNote;
