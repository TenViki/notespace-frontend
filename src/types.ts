export interface FileType {
  originalname: string;
  filename: string;
  mimetype: string;
  id: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Note {
  id: string;
  label: string;
  content: string;
  created: string;
  forDay: string;
  tag: Tag;
  files: FileType[];
}
