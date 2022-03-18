import React, { useEffect } from "react";
import "./calendar.scss";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Note } from "../../types";
import DateItem from "./Date";
import { useQuery } from "react-query";
import { api } from "../../config/config";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface CalendarProps {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

const Calendar: React.FC<CalendarProps> = ({ setNotes, notes }) => {
  const [date, setDate] = React.useState(new Date());
  const [days, setDays] = React.useState<
    {
      date: number;
      inMonth: boolean;
    }[]
  >([]);

  const month = date.getMonth();
  const year = date.getFullYear();

  useQuery(
    ["notes", { month: month + 1, year }],
    async () => api.get<Note[]>(`/notes/${year}/${month + 1}`),
    {
      onSuccess: (data) => {
        setNotes(data.data);
      },
    }
  );

  const loadCalendarDates = () => {
    const tmpDate = new Date(year, month, 0);
    const num = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = tmpDate.getDay() - 1;

    const array = [];

    // create day prefixes
    for (let i = dayOfWeek; i >= 0; i--) {
      array.push({
        date: tmpDate.getDate() - i,
        inMonth: false,
      });
    }

    // render the rest of the days
    for (let i = 0; i < num; i++) {
      array.push({ date: i + 1, inMonth: true });
    }

    let i = 0;
    while (array.length % 7 != 0) {
      array.push({ date: ++i, inMonth: false });
    }

    setDays(array);
  };

  useEffect(loadCalendarDates, [date]);

  return (
    <div className="calendar container">
      <div className="date-selection">
        <div className="date-month">
          {date.getFullYear()} - {months[date.getMonth()]}
        </div>

        <div className="date-buttons">
          <button
            onClick={() =>
              setDate(new Date(date.getFullYear(), date.getMonth() - 1))
            }
          >
            <FiChevronUp />
          </button>

          <button
            onClick={() => {
              setDate(new Date(date.getFullYear(), date.getMonth() + 1));
            }}
          >
            <FiChevronDown />
          </button>
        </div>
      </div>

      <div className="calendar-dates">
        <div className="day label">Mon</div>
        <div className="day label">Tue</div>
        <div className="day label">Wed</div>
        <div className="day label">Thu</div>
        <div className="day label">Fri</div>
        <div className="day label">Sat</div>
        <div className="day label">Sun</div>

        {days.map((day, i) => (
          <DateItem
            date={day.date}
            month={month}
            year={+year}
            inMonth={day.inMonth}
            key={i}
            notes={notes.filter(
              (note) => note.forDay.split("-")[2] == day.date + ""
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
