import React, { useEffect } from "react";
import "./newnote.scss";
import SlideMenu from "../shared/SlideMenu";
import { FiUpload } from "react-icons/fi";
import { api } from "../../config/config";
import Document from "./Document";
import { FileType } from "../../types";
import { toast } from "react-toastify";
import axios from "axios";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { useMutation } from "react-query";

interface NewNoteProps {
  opened: boolean;
  close: () => void;
  open: () => void;
}

const NewNote: React.FC<NewNoteProps> = ({ opened, close, open }) => {
  const [dragging, setDragging] = React.useState(false);
  const [dragCounter, setDragCounter] = React.useState(0);
  const [files, setFiles] = React.useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = React.useState<ProgressEvent>();
  const [bytesLoaded, setBytesLoaded] = React.useState(0);
  const [uploadQueue, setUploadQueue] = React.useState<File[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [fileIds, setFileIds] = React.useState<string[]>([]);

  const [label, setLabel] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [content, setContent] = React.useState("");
  const [date, setDate] = React.useState(new Date());

  const createNote = useMutation(
    async (data: {
      tag: string;
      label: string;
      content: string;
      files: string[];
      forDay: Date;
    }) => {
      return api.post("/notes", { ...data, forDay: data.forDay.toISOString() });
    },
    {
      onSuccess: () => {
        toast.success("Note created");
        close();
      },
      onError: () => {
        toast.error("Error creating note");
      },
    }
  );

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
      setFiles([...files, ...e.dataTransfer.files]);
      uploadFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
  };

  const uploadFiles = async (files: FileList | File[]) => {
    if (uploading) return setUploadQueue([...uploadQueue, ...files]);
    if (!files) return;
    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    let lastBytesLoaded: number = 0;
    let totalBytesLoaded = bytesLoaded;

    console.log("Using last total bytes loaded: ", totalBytesLoaded);

    try {
      const serverfiles = await api.post<FileType[]>("/files", formData, {
        onUploadProgress: (e) => {
          setUploadProgress(e);
          console.log();
          totalBytesLoaded += e.loaded - lastBytesLoaded;
          console.log("totalBytesLoaded: ", totalBytesLoaded);
          setBytesLoaded(totalBytesLoaded);
          lastBytesLoaded = e.loaded;
        },
      });

      setFileIds([...fileIds, ...serverfiles.data.map((f) => f.id)]);
    } catch (error) {
      if (axios.isAxiosError(error))
        toast.error(error?.response?.data?.message || "Something went wrong");
      else toast.error("Something went wrong");
    }
    setUploading(false);
  };

  useEffect(() => {
    if (uploadQueue.length > 0) {
      uploadFiles(uploadQueue);
      setUploadQueue([]);
    }
  }, [uploading]);

  let bytesBefore = 0;

  return (
    <>
      <SlideMenu opened={opened} close={close} title="New note" width="20rem">
        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note content"
        ></textarea>
        <DayPickerInput onDayChange={setDate} value={date} />

        <div className="add-note-files">
          <div className="file-title">Attachements:</div>

          {uploadProgress &&
            files.map((file, i) => {
              const oldValue = bytesBefore;
              bytesBefore += file.size;
              return (
                <Document
                  key={i}
                  file={file}
                  bytesBefore={oldValue}
                  loaded={bytesLoaded}
                />
              );
            })}
        </div>

        <button
          onClick={() => {
            createNote.mutate({
              content: content,
              files: fileIds,
              label: label,
              tag: tag,
              forDay: date,
            });

            setLabel("");
            setTag("");
            setContent("");
            setDate(new Date());
            setFiles([]);
            setFileIds([]);
          }}
        >
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
