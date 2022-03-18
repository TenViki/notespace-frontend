import React, { useEffect } from "react";
import "./calendar.scss";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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

const Calendar = () => {
  const [date, setDate] = React.useState(new Date());
  const [days, setDays] = React.useState<string[]>([]);

  const loadCalendarDates = () => {
    const month = date.getMonth();
    const year = date.getFullYear();

    const tmpDate = new Date(year, month, 0);
    const num = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = tmpDate.getDay() - 1;

    const array = [];

    // create day prefixes
    for (var i = 0; i <= dayOfWeek; i++) {
      array.push("");
    }

    // render the rest of the days
    for (var i = 0; i < num; i++) {
      array.push(`${i + 1}`);
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

        {days.map((day) => (
          <div>{day}</div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
