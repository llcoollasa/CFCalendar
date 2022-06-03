import React from "react";
import axios from "axios";

import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { TimePicker } from "../timePicker";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import * as service from "../service";
import { BrowserTimeSlotMock, AgendaRequestStub } from "../../stubs/stub";
import userEvent from "@testing-library/user-event";

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;

test("Render loading component", () => {
  render(
    <BrowserRouter>
      <TimePicker />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});

test("should render Calendar picker", async () => {
  const getAllSlotsMock = jest.spyOn(service, "getAllSlots");
  getAllSlotsMock.mockImplementationOnce(() =>
    Promise.resolve(AgendaRequestStub)
  );

  const filterBrowserTimeSlotsByDayMock = jest.spyOn(
    service,
    "filterBrowserTimeSlotsByDay"
  );
  filterBrowserTimeSlotsByDayMock.mockImplementationOnce(
    () => BrowserTimeSlotMock
  );

  render(
    <MemoryRouter initialEntries={["/schedule/1"]}>
      <Routes>
        <Route path="/schedule/:interviewId" element={<TimePicker />}></Route>
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByText("Pick a date and time")).toBeInTheDocument();
  expect(await screen.findByText("Select a date")).toBeInTheDocument();
  expect(await screen.queryByTestId("select-a-time")).not.toBeInTheDocument();
});

test("should render Time picker", async () => {
  const getAllSlotsMock = jest.spyOn(service, "getAllSlots");
  getAllSlotsMock.mockImplementationOnce(() =>
    Promise.resolve(AgendaRequestStub)
  );

  const filterBrowserTimeSlotsByDayMock = jest.spyOn(
    service,
    "filterBrowserTimeSlotsByDay"
  );
  filterBrowserTimeSlotsByDayMock.mockImplementationOnce(
    () => BrowserTimeSlotMock
  );

  render(
    <MemoryRouter initialEntries={["/schedule/1"]}>
      <Routes>
        <Route path="/schedule/:interviewId" element={<TimePicker />}></Route>
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByText("Pick a date and time"));
  expect(await screen.findByText("Select a date"));

  const calendarDays = await screen.findAllByRole("gridcell");
  userEvent.click(calendarDays[10]);

  expect(await screen.queryByTestId("select-a-time")).toBeInTheDocument();
  expect(await screen.queryByTestId("time-picker")).toBeInTheDocument();

  const timeSlot = await screen.findAllByRole("button", {
    name: /12:00 AM/i,
  });

  expect(timeSlot).toHaveLength(1);
  expect(await screen.queryByTestId("confirmation")).not.toBeInTheDocument();
});

test("should render Reason and submit button", async () => {
  const getAllSlotsMock = jest.spyOn(service, "getAllSlots");
  getAllSlotsMock.mockImplementationOnce(() =>
    Promise.resolve(AgendaRequestStub)
  );

  const filterBrowserTimeSlotsByDayMock = jest.spyOn(
    service,
    "filterBrowserTimeSlotsByDay"
  );
  filterBrowserTimeSlotsByDayMock.mockImplementationOnce(
    () => BrowserTimeSlotMock
  );

  render(
    <MemoryRouter initialEntries={["/schedule/1"]}>
      <Routes>
        <Route path="/schedule/:interviewId" element={<TimePicker />}></Route>
      </Routes>
    </MemoryRouter>
  );

  const calendarDays = await screen.findAllByRole("gridcell");
  userEvent.click(calendarDays[10]);

  const timeSlot = await screen.findAllByRole("button", {
    name: /12:00 AM/i,
  });
  userEvent.click(timeSlot[0]);

  expect(await screen.queryByTestId("confirmation")).toBeInTheDocument();
  expect(await screen.queryByTestId("confirm-button")).toBeInTheDocument();
  expect(
    await screen.queryByTestId("unavailable-error")
  ).not.toBeInTheDocument();
});

test("should display error when clicking on unavailable slot", async () => {
  Date.now = jest.fn(() => 1654270105240) //03.06.2022

  const getAllSlotsMock = jest.spyOn(service, "getAllSlots");
  getAllSlotsMock.mockImplementationOnce(() =>
    Promise.resolve(AgendaRequestStub)
  );

  const filterBrowserTimeSlotsByDayMock = jest.spyOn(
    service,
    "filterBrowserTimeSlotsByDay"
  );
  filterBrowserTimeSlotsByDayMock.mockImplementation(
    () => BrowserTimeSlotMock
  );

  render(
    <MemoryRouter initialEntries={["/schedule/1"]}>
      <Routes>
        <Route path="/schedule/:interviewId" element={<TimePicker />}></Route>
      </Routes>
    </MemoryRouter>
  );

  const calendarDays = await screen.findAllByRole("gridcell"); 
  userEvent.click(calendarDays[5]);
  const timeSlot = await screen.findAllByRole("button");
 
  userEvent.click(timeSlot[18]);

  expect(await screen.queryByTestId("unavailable-error")).toBeInTheDocument();
  expect(await screen.getByText(/This timeslot is not available. Please select a different time slot./i)).toBeInTheDocument();;
});
