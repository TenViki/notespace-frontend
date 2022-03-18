import React from "react";
import { FiPlus } from "react-icons/fi";

interface NewNoteProps {
  opened: boolean;
  close: () => void;
}

const NewNote = () => {
  return <div className="overlay"></div>;
};

export default NewNote;
