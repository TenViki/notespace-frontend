import React from "react";
import SlideMenu from "../shared/SlideMenu";

interface NoteDataProps {
  opened: boolean;
  close: () => void;
  stringid: string;
}

const NoteData: React.FC<NoteDataProps> = ({ opened, close, stringid }) => {
  return (
    <SlideMenu opened={opened} close={close} title="Loading" width="30rem">
      NoteData
    </SlideMenu>
  );
};

export default NoteData;
