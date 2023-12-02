import * as React from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

type CalendarProps = {
  date: Dayjs | null;
  setDate: (date: Dayjs | null) => void;
};

export const Calendar: React.FC<CalendarProps> = ({
  date,
  setDate,
}: CalendarProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={date}
        onChange={(newValue) => setDate(newValue)}
        showDaysOutsideCurrentMonth
        disablePast
      />
    </LocalizationProvider>
  );
};
