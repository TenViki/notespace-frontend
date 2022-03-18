import React from "react";
import { FiPlus } from "react-icons/fi";
import SlideMenu from "../shared/SlideMenu";

interface NewNoteProps {
  opened: boolean;
  close: () => void;
}

const NewNote: React.FC<NewNoteProps> = ({ opened, close }) => {
  return <SlideMenu opened={opened} close={close} title="New note"></SlideMenu>;
};

export default NewNote;
