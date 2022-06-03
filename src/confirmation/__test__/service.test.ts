import React from "react";
import { getInterviewById } from "../service";

beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn(
    () => '{"interviewDate": "2022-06-01T18:30:00Z"}'
  );
  global.Storage.prototype.getItem = jest.fn(
    () =>
      '{"interviewDate": "2022-06-01T18:30:00Z", "interviewId": 1, "interviewTime": "2022-06-02T18:30:00Z"}'
  );
});

afterAll(() => {
  global.Storage.prototype.setItem.mockReset();
  global.Storage.prototype.getItem.mockReset();
});

// Assumption: Currently this is local storage act as db request
// TODO: Implement mock axios
test("it should return data from getInterviewById", async () => {
  const res = getInterviewById(1);

  expect(global.Storage.prototype.getItem).toHaveBeenCalled();
  expect(res).toEqual({
    interviewDate: "2022-06-01",
    interviewId: 1,
    interviewTime: "6:30 PM",
  });
});

test("it should return null from if there is no interview exists", async () => {
  global.Storage.prototype.getItem = jest.fn(() => null);
  const res = getInterviewById(1);

  expect(global.Storage.prototype.getItem).toHaveBeenCalled();
  expect(res).toEqual(null);
});
