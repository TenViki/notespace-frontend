import React from "react";
import "./newnote.scss";
import SlideMenu from "../shared/SlideMenu";
import DropArea from "./DropArea";

interface NewNoteProps {
  opened: boolean;
  close: () => void;
}

const NewNote: React.FC<NewNoteProps> = ({ opened, close }) => {
  const [dragging, setDragging] = React.useState(false);

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

      <div className="file-overlay">
        <DropArea
          setDragging={setDragging}
          handleDrop={() => console.log("dropped")}
        />
      </div>
    </>
  );
};

export default NewNote;
