import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import { getInterviewById } from "./service";
import { IInterviewData } from "../timePicker";

export const Confirmation = () => {
  const { interviewId } = useParams();
  const [data, setData] = useState<IInterviewData>();

  useEffect(() => {
    if (interviewId) {
      const data = getInterviewById(Number(interviewId));
      if (data) {
        setData(data);
      }
    }
  }, [interviewId]);

  if (!data) {
    return (
      <div>
        <div className="error">Couldnt find the Interview information <br/><br/><Link to="/">Home Page</Link></div>
 
      </div>
    );
  }

  return (
    <div className="container">
      <h2>
        Your Interview has been scheduled. Please find the details given below.
      </h2>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Interview Id </strong>
              </td>
              <td>{interviewId}</td>
            </tr>
            <tr>
              <td>
                <strong>Mentor Id </strong>
              </td>
              <td>
                {data.mentorId} <br />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <em>Assumption: Mentor name should appear above</em>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Student Name </strong>
              </td>
              <td>William John </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <em>Assumption: Student name should appear above</em>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Date</strong>
              </td>
              <td>{data.interviewDate}</td>
            </tr>
            <tr>
              <td>
                <strong>Time</strong>
              </td>
              <td>{data.interviewTime}</td>
            </tr>
            <tr>
              <td>
                <strong>Reason</strong>
              </td>
              <td>{data.reason}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="home-link">
        <Link to="/">Home Page</Link>
      </div>
    </div>
  );
};
