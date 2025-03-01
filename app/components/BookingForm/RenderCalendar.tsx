"use cleint";
import React from "react";
import Calendar from "./Calendar";
import { getLocalTimeZone, today } from "@internationalized/date";
const RenderCalendar = () => {
  return <Calendar
  minValue={today(getLocalTimeZone())}
  />;
};

export default RenderCalendar;
