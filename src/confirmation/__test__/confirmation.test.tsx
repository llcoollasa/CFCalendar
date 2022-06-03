import React from "react";
import { render, screen } from "@testing-library/react";
import { Confirmation } from "../confirmation";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import * as service from "../service";
import { InterviewDataStub } from "../../stubs/stub";

test("Render cannot find interview confirmation", () => {
  render(
    <BrowserRouter>
      <Confirmation />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(
    /Couldnt find the Interview information/i
  );
  expect(linkElement).toBeInTheDocument();
});

test("should render confirmation details", () => {
  const addMock = jest.spyOn(service, "getInterviewById");
  addMock.mockImplementationOnce(() => InterviewDataStub);
  render(
    <MemoryRouter initialEntries={["/schedule/confirmation/1"]}>
      <Routes>
        <Route
          path="/schedule/confirmation/:interviewId"
          element={<Confirmation />}
        ></Route>
      </Routes>
    </MemoryRouter>
  );
  const head = screen.getByText(/Your Interview has been scheduled/i);
  const name = screen.getByText(/William John/i);
  const dateValue = screen.getByText(/2022-06-02/i);
  const timeValue = screen.getByText(/12:00 AM/i);
  const reason = screen.getByText(/Some Reason/i);

  expect(head).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(dateValue).toBeInTheDocument();
  expect(timeValue).toBeInTheDocument();
  expect(reason).toBeInTheDocument();
});
