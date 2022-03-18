import React from "react";
import "./newnote.scss";
import SlideMenu from "../shared/SlideMenu";

interface NewNoteProps {
  opened: boolean;
  close: () => void;
}

const NewNote: React.FC<NewNoteProps> = ({ opened, close }) => {
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
    </>
  );
};

export default NewNote;
