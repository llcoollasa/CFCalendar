import React, { FC, useState } from "react";
import moment from "moment";

import { ITimeslotInput } from "./index";
import { ITimeSlotButton } from "./interface";

export const TimeSlots: FC<ITimeslotInput> = ({ getDataCallback, slots }) => {
  const [id, setId] = useState<number>();
  const timePeriods = Array.from({ length: 24 }, (_, i) => ({
    index: i,
    value: moment().set({ hour: i, minute: 0, second: 0 }).utc().format(),
    displayValue: moment().set({ hour: i, minute: 0, second: 0 }).format("LT"),
    available: slots.find(
      (item) => Number(item.browserDateTimeHour) === Number(i)
    )
      ? false
      : true,
  }));

  const handleButtonClick = (item: ITimeSlotButton) => {
    setId(item.index);
    getDataCallback(item);
  };

  return (
    <div className="time-slots">
      <div>
        <h3 data-testid="select-a-time">Select a time</h3>
      </div>
      <div className="slots" data-testid="time-picker">
        {timePeriods.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(item)}
            value={item.value}
            className={id === index ? "selected" : ""}
          >
            <span className={!item.available ? "not-available" : ""}>
              {item.displayValue}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
