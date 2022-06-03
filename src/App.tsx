import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Confirmation } from "./confirmation";
import { TimePicker } from "./timePicker";
import { Home } from "./home";
import "./index.css";

function App() {
  return (
    <div>
      <div className="header">Career Foundry Calendar</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule/:interviewId" element={<TimePicker />} />
        <Route
          path="/schedule/confirmation/:interviewId"
          element={<Confirmation />}
        />
      </Routes>
    </div>
  );
}

export default App;
