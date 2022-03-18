import React from "react";

interface DateProps {
  date: number;
  inMonth?: boolean;
}

const DateItem: React.FC<DateProps> = ({ date, inMonth }) => {
  return (
    <div className={`calendar-date ${!inMonth ? "inactive" : ""}`}>{date}</div>
  );
};

export default DateItem;
