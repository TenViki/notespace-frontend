import { FiPlus } from "react-icons/fi";
import Calendar from "./components/calendar/Calendar";
import NewNote from "./components/forms/NewNote";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="app">
      <div className="main">
        <Header />
        <Calendar />

        <button className="add-new">
          <FiPlus />
          <div className="text">Add note</div>
        </button>
      </div>
    </div>
  );
}

export default App;
