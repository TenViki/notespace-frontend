import React from "react";
import { Note } from "../../types";
import SlideMenu from "../shared/SlideMenu";
import "./taglist.scss";

interface TagListProps {
  notes: Note[];
  opened: boolean;
  close: () => void;
  date: Date;
}

const TagList: React.FC<TagListProps> = ({ close, notes, opened, date }) => {
  return (
    <SlideMenu close={close} opened={opened} title={`${date.toLocaleDateString()}`} width="15rem">
      {notes.map((note) => (
        <div className="tag-list-item" key={note.id}>
          <div className="tag-list-item-tag" style={{ backgroundColor: note.tag.color }} />
          <div className="tag-list-item-label">{note.label}</div>
        </div>
      ))}
    </SlideMenu>
  );
};

export default TagList;
