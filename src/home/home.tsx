import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <main>
        <h2>Quick Start</h2>
      </main>
      <nav>
        <div>
          <p>
            Student schedule an interview with a Mentor. <br />
            <Link to="/schedule/1">Schedule Interview</Link>
          </p>
        </div>
        <div>
          <p>
            Student Access the Interview confirmation link again. <br />
            <Link to="/schedule/confirmation/1">Confirmation Page</Link>
          </p>
        </div>
        <div>
          <p>
            Student Access the Invalid Interview confirmation link
            <br />
            <Link to="/schedule/confirmation/2">Invalid Confirmation Page</Link>
          </p>
        </div>
      </nav>
    </>
  );
};
