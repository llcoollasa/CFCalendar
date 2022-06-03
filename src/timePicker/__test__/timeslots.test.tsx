import React from "react";
import axios from "axios";

import { render, screen } from "@testing-library/react";

import { TimeSlots } from "../timeSlots";
import { BrowserRouter } from "react-router-dom";
import * as service from "../service";
import { BrowserTimeSlotMock, AgendaRequestStub } from "../../stubs/stub"; 

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;

test("Render time slot component", () => {
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
    <BrowserRouter>
      <TimeSlots getDataCallback={() => {}} slots={BrowserTimeSlotMock} />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Select a time/i);
  expect(linkElement).toBeInTheDocument();
});

test("It should contain 24 time slots", async () => {
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
    <BrowserRouter>
      <TimeSlots getDataCallback={() => {}} slots={BrowserTimeSlotMock} />
    </BrowserRouter>
  );

  const timeSlot = await screen.findAllByRole("button");

  expect(timeSlot).toHaveLength(24);
});
