import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Calendar from "./components/calendar/Calendar";
import NewNote from "./components/forms/NewNote";
import Header from "./components/header/Header";

function App() {
  const [newNoteOpened, setNewNoteOpened] = useState(false);

  return (
    <div className="app">
      <div className="main">
        <Header />
        <Calendar />

        <button
          className="add-new"
          onClick={() => setNewNoteOpened(!newNoteOpened)}
        >
          <FiPlus />
          <div className="text">Add note</div>
        </button>
      </div>
      <NewNote opened={newNoteOpened} close={() => setNewNoteOpened(false)} />
    </div>
  );
}

export default App;
