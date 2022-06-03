import React from "react";
import axios from "axios";

import {
  filterBrowserTimeSlotsByDay,
  getAllSlots,
  saveInterview,
} from "../service";
import { AgendaRequestStub, InterviewDataStub } from "../../stubs/stub";

jest.mock("axios");
axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn(
    () =>
      '{"interviewDate": "2022-06-01T18:30:00Z", "interviewId": 1, "interviewTime": "2022-06-02T18:30:00Z"}'
  );
});

afterAll(() => {
  global.Storage.prototype.setItem.mockReset();
});

// Assumption: Currently this is local storage act as db request
// TODO: Implement mock axios
test("it should save interview with given data", () => {
  saveInterview(InterviewDataStub);

  expect(global.Storage.prototype.setItem).toHaveBeenCalledWith(
    "interviewModel",
    JSON.stringify(InterviewDataStub)
  );
});

test("it should call getAllSlots and return data", async () => {
  jest.spyOn(axios, "get").mockResolvedValueOnce({
    data: AgendaRequestStub,
  });

  const res = await getAllSlots();
  expect(axios.get).toHaveBeenCalled();
  expect(res).toEqual(AgendaRequestStub);
});

test("it should call filterBrowserTimeSlotsByDay and return data", () => {
  const date = new Date("2022-01-01");

  const res = filterBrowserTimeSlotsByDay(AgendaRequestStub, date);
  expect(res).toEqual([
    { browserDateTimeHour: 14, date_time: "2022-01-01 15:55:09 +0100" },
    { browserDateTimeHour: 9, date_time: "2022-01-01 10:55:09 +0100" },
  ]);
});
