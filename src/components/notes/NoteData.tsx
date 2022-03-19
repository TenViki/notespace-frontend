import React from "react";
import { useQuery } from "react-query";
import { api } from "../../config/config";
import { Note } from "../../types";
import SlideMenu from "../shared/SlideMenu";

interface NoteDataProps {
  opened: boolean;
  close: () => void;
  stringid: string;
}

const NoteData: React.FC<NoteDataProps> = ({ opened, close, stringid }) => {
  const { data, isLoading } = useQuery(["note", stringid], async () => api.get<Note>(`/notes/${stringid}`), {
    enabled: !!stringid,
  });

  return (
    <SlideMenu opened={opened} close={close} title={`${isLoading ? "Loading" : data?.data.label}`} width="30rem">
      {data?.data && (
        <div className="note-data">
          <div className="note-tag" style={{ backgroundColor: data.data.tag.color }}>
            {data.data.tag.name}
          </div>
          <div className="note-content">{data.data.content}</div>

          {data.data.files.map((file) => (
            <div className="note-file" key={file.id}>
              <a href={`${import.meta.env.VITE_API_URL}/files/${file.id}`} target="_blank" rel="noopener noreferrer">
                {file.originalname}
              </a>

              <div className="note-file-type">{file.mimetype}</div>
            </div>
          ))}
        </div>
      )}
    </SlideMenu>
  );
};

export default NoteData;
