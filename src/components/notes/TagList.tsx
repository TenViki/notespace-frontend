import React from "react";
import { Note } from "../../types";
import SlideMenu from "../shared/SlideMenu";
import "./taglist.scss";

interface TagListProps {
  notes: Note[];
  opened: boolean;
  close: () => void;
  date: Date;
  selectNote: (noteid: string) => void;
  selectedNote: string | null;
}

const TagList: React.FC<TagListProps> = ({ close, notes, opened, date, selectNote, selectedNote }) => {
  return (
    <SlideMenu close={close} opened={opened} title={`${date.toLocaleDateString()}`} width="15rem">
      {notes.map((note) => (
        <div className={`tag-list-item ${selectedNote === note.id ? "active" : ""}`} key={note.id} onClick={() => selectNote(note.id)}>
          <div className="tag-list-item-tag" style={{ backgroundColor: note.tag.color }} />
          <div className="tag-list-item-label">{note.label}</div>
        </div>
      ))}
    </SlideMenu>
  );
};

export default TagList;
