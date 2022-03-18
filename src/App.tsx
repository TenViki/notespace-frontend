import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Calendar from "./components/calendar/Calendar";
import NewNote from "./components/forms/NewNote";
import Header from "./components/header/Header";
import TagList from "./components/notes/TagList";
import { Note } from "./types";

function App() {
  const [newNoteOpened, setNewNoteOpened] = useState(false);
  const [taglistOpened, setTaglistOpened] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [formDate, setFormDate] = useState<Date>(new Date());

  return (
    <div className="app">
      <div className="main">
        <Header />
        <Calendar
          notes={notes}
          setNotes={setNotes}
          selectedDate={selectedDate}
          onDateSelect={
            newNoteOpened
              ? setFormDate
              : (date) => {
                  setSelectedDate(date);
                  setTaglistOpened(true);
                }
          }
        />

        <button
          className="add-new"
          onClick={() => {
            setNewNoteOpened(!newNoteOpened);
            setTaglistOpened(false);
            setSelectedDate(new Date());
          }}
        >
          <FiPlus />
          <div className="text">Add note</div>
        </button>
      </div>

      <TagList
        opened={taglistOpened}
        close={() => {
          setTaglistOpened(false);
        }}
        date={selectedDate}
        notes={notes.filter((note) => note.forDay.split("-")[2] === selectedDate.getDate() + "")}
      />

      <NewNote
        opened={newNoteOpened}
        close={() => setNewNoteOpened(false)}
        open={() => setNewNoteOpened(true)}
        formDate={formDate}
        setFormDate={setFormDate}
      />
    </div>
  );
}

export default App;
