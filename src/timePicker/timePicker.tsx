import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllSlots,
  filterBrowserTimeSlotsByDay,
  saveInterview,
} from "./service";
import {
  IAllocatedSlotsResponse,
  TimeSlots,
  IBrowserTimeSlots,
  IHandleTimeInput,
} from "./index";
import Calendar from "react-widgets/Calendar";
import "react-widgets/styles.css";
import "./styles.css";
import moment from "moment";

export const TimePicker = () => {
  const { interviewId } = useParams();
  const [interviewDate, setInterviewDate] = React.useState<Date | null>(null);
  const [interviewTime, setInterviewTime] = React.useState<Date | null>(null);
  const [reason, setReason] = useState("");
  const [slots, setSlots] = useState<IAllocatedSlotsResponse>();
  const [browserSlots, setBrowserSlots] = useState<IBrowserTimeSlots[]>();
  const [invalidTimeslot, setInvalidTimeslot] = useState(false);

  const navigate = useNavigate();

  const initialLoad = async () => {
    try {
      const occupiedSlots = await getAllSlots();
      setSlots(occupiedSlots);
      const slotsWithDayAndHour = filterBrowserTimeSlotsByDay(
        occupiedSlots,
        interviewDate || new Date()
      );

      if (slotsWithDayAndHour) setBrowserSlots(slotsWithDayAndHour);
    } catch (err) {
      // TODO Handle error scenario
      console.log({ err });
    }
  };

  useEffect(() => {
    interviewId && initialLoad();
  }, [interviewId]);

  const handleDate = (interviewDate: Date) => {
    setInterviewDate(interviewDate);
    if (slots) {
      const timeSlotsByDay = filterBrowserTimeSlotsByDay(
        slots,
        interviewDate || new Date()
      );
      if (timeSlotsByDay) setBrowserSlots(timeSlotsByDay);
    }
  };

  const handleTime = (data: IHandleTimeInput) => {
    if (!data.available) {
      return setInvalidTimeslot(true);
    }
    setInvalidTimeslot(false);
    setInterviewTime(data.value);
  };

  const handleReason = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value);
  };

  const handleSubmit = () => {
    /*
      Assumptions
      studentId & mentorId is 1
      in future we can add Student Id and mentor id from the DB
    */
    if (interviewId && interviewDate && interviewTime) {
      saveInterview({
        interviewId: Number(interviewId),
        studentId: 1,
        mentorId: 1,
        interviewDate: moment(interviewDate).utc().format(),
        interviewTime: moment(interviewTime).utc().format(),
        reason,
      });

      navigate(`/schedule/confirmation/${interviewId}`, { replace: true });
    }
  };

  // TODO: Use separate component to handle loading.
  if (!slots) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>Pick a date and time</h2>
        <p>
          Select a date and then preffered time to schedule a meeting with
          mentor.
        </p>
      </div>

      <div>
        <h3>Select a date</h3>
      </div>

      <Calendar
        data-testid="calendar-picker"
        value={interviewDate}
        onChange={(value) => handleDate(value)}
        className="calendar"
      />

      {interviewDate && browserSlots && (
        <TimeSlots getDataCallback={handleTime} slots={browserSlots} />
      )}

      {invalidTimeslot && (
        <div className="error-unavailable" data-testid="unavailable-error">
          This timeslot is not available. Please select a different time slot.
        </div>
      )}

      {!invalidTimeslot && interviewTime && (
        <div className="confirmation-button" data-testid="confirmation">
          <div>
            <h3>Type the reason</h3>
          </div>
          <div className="reason">
            <textarea
              id="reason"
              onChange={handleReason}
              value={reason}
              autoFocus={true}
            ></textarea>
          </div>
          <button data-testid="confirm-button" onClick={handleSubmit}>
            Cofirm
          </button>
        </div>
      )}
    </div>
  );
};
