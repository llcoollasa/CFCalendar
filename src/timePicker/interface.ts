interface IMentor {
  name: string;
  time_zone: string;
}

export interface ICalendar {
  date_time: string;
}

export interface IAllocatedSlotsResponse {
  mentor: IMentor;
  calendar: ICalendar[];
}

export interface IBrowserTimeSlots extends ICalendar {
  browserDateTimeHour: number;
}

export interface ITimeslotInput {
  getDataCallback: CallableFunction;
  slots: IBrowserTimeSlots[];
}

export interface IHandleTimeInput {
  displayValue: string;
  value: Date;
  available: boolean;
}

export interface IInterviewData {
  interviewId: number;
  studentId: number;
  mentorId: number;
  interviewDate: string;
  interviewTime: string;
  reason: string;
}

export interface ITimeSlotButton {
  index: number;
  displayValue: string;
  value: string;
  available: boolean;
}
