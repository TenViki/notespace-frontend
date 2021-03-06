import React from "react";
import { Note } from "../../types";

interface DateProps {
  date: number;
  month: number;
  year: number;
  inMonth?: boolean;
  notes: Note[];
  onClick: () => void;
  selected: boolean;
}

const DateItem: React.FC<DateProps> = ({ date, inMonth, notes, month, year, onClick, selected }) => {
  const today = new Date().getDate();
  const isToday = date === today && month === new Date().getMonth() && year === new Date().getFullYear();
  return (
    <div
      className={`calendar-date ${!inMonth ? "inactive" : ""} ${isToday ? "active" : ""} ${selected ? "selected" : ""}`}
      onClick={inMonth ? onClick : undefined}
    >
      <div className="calendar-date-num">{date}</div>
      <div className="calendar-date-tags">
        {Array.from(new Set(notes.map((n) => n.tag.color))).map((color, i) => (
          <div className="calendar-date-tag" key={i} style={{ backgroundColor: color }} />
        ))}
      </div>
    </div>
  );
};

export default DateItem;
