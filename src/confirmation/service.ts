import moment from "moment";
import { IInterviewData } from "../timePicker/index";

/*
  Assumptions
    Data will get from the database according to the contract
    for this purpose I will be using the local storage
*/
export const getInterviewById = (interviewId: number) => {
  // TODO: call backend to get data
  const value = localStorage.getItem("interviewModel");
  if (value) {
    const interview = JSON.parse(value) as IInterviewData;

    if (interview.interviewId !== interviewId) {
      return null;
    }

    interview.interviewDate = moment(interview.interviewDate).format(
      "YYYY-MM-DD"
    );
    interview.interviewTime = moment(interview.interviewTime).format("LT");

    return interview;
  }

  return null
};
