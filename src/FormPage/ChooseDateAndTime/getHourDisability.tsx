import { Booking } from "../../slices/bookings/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const changeDate = (date: Date, hour?: number | null, day?: number) => {
  const newDate = new Date(date);
  if (hour) {
    newDate.setHours(date.getHours() + hour);
  }

  if (day) {
    newDate.setDate(date.getDate() + day);
  }
  return newDate;
};

// array for 0 to 23 hours: 0 - disabled, 1 - one seat is available, 2 - free table
export const getHourDisability = (
  date: Date | null,
  now: Date,
  localBookings: Booking[],
  userId: string
) => {
  if (!localBookings) {
    return [];
  }

  const allHours = Array.from(Array(24).keys());
  if (!date) {
    return allHours;
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nextDay = changeDate(date, null, 1);
  const hourNow = now.getHours();

  // disabled hours before now
  let dh: number[];
  if (date.getTime() === today.getTime()) {
    dh = allHours.map((hour) => (hour <= hourNow ? 0 : 2));
  } else {
    dh = allHours.map(() => 2);
  }

  const startForFilter = changeDate(date, -3);
  const endForFilter = changeDate(date, 3, 1);

  const bookingsForDate = localBookings.filter(({ start }) => {
    return start >= startForFilter && start < endForFilter;
  });

  // disability based on existed bookings
  bookingsForDate.forEach((booking) => {
    const { start, userSecond, userFirst } = booking;

    for (let hour = -2; hour < 3; hour++) {
      const hourForDisable = changeDate(start, hour);
      if (hourForDisable >= date && hourForDisable < nextDay) {
        dh[hourForDisable.getHours()] = 0;
      }
    }

    if (start >= date && start < nextDay && !userSecond) {
      dh[start.getHours()] = userFirst === userId ? 0 : 1;
    }
  });

  return dh;
};
