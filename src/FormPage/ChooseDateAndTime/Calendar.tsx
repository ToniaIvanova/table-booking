import React, { useCallback, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Booking } from "../../slices/bookings/types";
import { getHourDisability } from "./getHourDisability";

type CalendarProps = {
  date: Dayjs | null;
  setDate: (date: Dayjs | null) => void;
  data: Booking[];
  userId: string;
};

export const Calendar: React.FC<CalendarProps> = ({
  date,
  setDate,
  data,
  userId,
}: CalendarProps) => {
  const now = useMemo(() => new Date(), []);
  const shouldDisableDate = useCallback(
    (day: Dayjs) => {
      const localBookings = data?.map((booking) => ({
        ...booking,
        start: dayjs(booking.start).local().toDate(),
      }));
      const hd = getHourDisability(
        day?.toDate() ?? null,
        now,
        localBookings ?? [],
        userId
      );

      for (const disability of hd) {
        if (disability > 0) {
          return false;
        }
      }
      return true;
    },
    [data, now, userId]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={date}
        onChange={(newValue) => setDate(newValue)}
        showDaysOutsideCurrentMonth
        disablePast
        shouldDisableDate={shouldDisableDate}
      />
    </LocalizationProvider>
  );
};
