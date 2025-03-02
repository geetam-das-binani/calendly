"use client";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { useRouter, useSearchParams } from "next/navigation";
interface RenderCalendarProps {
  day: string;
  isActive: boolean;
}

const RenderCalendar = ({
  availability,
}: {
  availability: Array<RenderCalendarProps>;
}) => {
  const searchParams = useSearchParams();
  const minValue = today(getLocalTimeZone());
  const [date, setDate] = useState(() => {
    const dateParam = searchParams.get("date");
    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
  });

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      setDate(parseDate(dateParam));
    }
  }, [searchParams]);
  const router = useRouter();
  const handleDateChange = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set("date", date.toString());
    router.push(url.toString());
  };
  const isDateUnavailable = (date: DateValue) => {
    const dateObj = date.toDate(getLocalTimeZone()); // Convert DateValue to a JavaScript Date object

    const fullDayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(dateObj);

    // !! return availability.filter((data) => data.day === fullDayName && !data.isActive)
    //  !!   .length > 0  or below approach
    return availability.some(
      (data) => data.day === fullDayName && !data.isActive
    );
  };

  return (
    <Calendar
      value={date}
      minValue={minValue}
      isDateUnavailable={isDateUnavailable}
      onChange={handleDateChange}
    />
  );
};

export default RenderCalendar;
