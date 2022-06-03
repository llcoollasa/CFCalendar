import axios from "axios";
import moment from "moment";

import { IAllocatedSlotsResponse, IInterviewData } from "./index";

export const getAllSlots = async () => {
  const { data: originalResponse } = await axios.get<IAllocatedSlotsResponse>(
    "https://private-anon-6f8d684ffa-cfcalendar.apiary-mock.com/mentors/1/agenda"
  );

  return originalResponse;
};

// Create timeslot using browser's TZ with moment
export const filterBrowserTimeSlotsByDay = (
  data: IAllocatedSlotsResponse,
  dateToFilter: Date
): any => {
  const fitlerDate = moment(dateToFilter).format("YYYY-MM-DD");
  const browserDateTime = data.calendar
    .filter((item) => {
      const browserDate = moment(item.date_time).format("YYYY-MM-DD");

      if (browserDate === fitlerDate) {
        return item;
      }
    })
    .map((item) => ({
      ...item,
      browserDateTimeHour: Number(moment(item.date_time).format("HH")),
    }));

  return browserDateTime;
};

/*
  Assumptions
    Data should be save to the database according to the contract
    for this purpose I will be saving the data to local storage
*/
export const saveInterview = (data: IInterviewData) => {
  const tempDataJson = JSON.stringify(data);
  localStorage.setItem("interviewModel", tempDataJson);
};
