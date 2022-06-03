import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "../home";
import { BrowserRouter } from "react-router-dom";

test("renders home page", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Student Access the Interview confirmation link again/i);
  expect(linkElement).toBeInTheDocument();
});
