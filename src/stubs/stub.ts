export const InterviewDataStub = {
  interviewDate: "2022-06-02",
  interviewId: 1,
  interviewTime: "12:00 AM",
  mentorId: 1,
  reason: "Some Reason",
  studentId: 1,
};

export const AgendaRequestStub = {
  mentor: {
    name: "Max Mustermann",
    time_zone: "-03:00",
  },
  calendar: [
    {
      date_time: "2022-01-01 15:55:09 +0100",
    },
    {
      date_time: "2022-01-01 10:55:09 +0100",
    },
    {
      date_time: "2022-02-01 10:55:09 +0100",
    },
  ],
};

export const BrowserTimeSlotMock = [
  {
    date_time: "2022-06-03 15:00:00 +0100",
    browserDateTimeHour: 14,
  },
];
