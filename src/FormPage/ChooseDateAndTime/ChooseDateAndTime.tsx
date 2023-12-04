import React, { useCallback, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { Alert, Box, Button, CircularProgress, Grid } from "@mui/material";
import { Calendar } from "./Calendar";
import { TimeTable } from "./TimeTable";
import {
  useAddBookingMutation,
  useGetAllBookingsQuery,
} from "../../slices/bookings/api";
import { getHourDisability } from "./getHourDisability";
import { useFeedError, useFeedSuccess } from "../../common/feedHook";
dayjs.extend(utc);

type ChooseDateAndTimeProps = {
  userId: string;
};

export const ChooseDateAndTime: React.FC<ChooseDateAndTimeProps> = ({
  userId,
}) => {
  const feedSuccess = useFeedSuccess();
  const feedError = useFeedError();
  const now = useMemo(() => new Date(), []);
  const [date, setDate] = useState<Dayjs | null>(
    dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
  );
  const [choosenHour, setChoosenHour] = useState<number | null>(null);
  const { data, error, isLoading, refetch } = useGetAllBookingsQuery();
  const [addBooking] = useAddBookingMutation();

  const onDateChange = useCallback(
    (newDate: Dayjs | null) => {
      setChoosenHour(null);
      setDate(newDate);
    },
    [setChoosenHour, setDate]
  );

  // array for 0 to 23 hours: 0 - disabled, 1 - one seat is available, 2 - free table
  const hourDisability = useMemo(() => {
    const localBookings = data?.map((booking) => ({
      ...booking,
      start: dayjs(booking.start).local().toDate(),
    }));
    return getHourDisability(
      date?.toDate() ?? null,
      now,
      localBookings ?? [],
      userId
    );
  }, [date, now, data, userId]);

  const onNext = useCallback(() => {
    if (date && choosenHour !== undefined && choosenHour !== null) {
      addBooking({
        start: date?.add(choosenHour, "hour").utc().toDate(),
        userId,
      })
        .unwrap()
        .then((res) => {
          feedSuccess("Thanks for reservation");
        })
        .catch((err) => {
          feedError(err.data.message);
        });
    } else {
      feedError("Choose date and time");
    }
  }, [addBooking, choosenHour, date, feedError, feedSuccess, userId]);

  if (isLoading) {
    return <CircularProgress color="success" />;
  }

  if (error) {
    return (
      <Alert severity="error">
        Something go wrong... <Button onClick={refetch}>Try again</Button>
      </Alert>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Calendar date={date} setDate={onDateChange} />
        </Grid>

        {date && hourDisability && (
          <TimeTable
            hourDisability={hourDisability}
            choosenHour={choosenHour}
            setChoosenHour={setChoosenHour}
          />
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          disabled={!date || !choosenHour}
          onClick={onNext}
          sx={{ mt: 3, ml: 1 }}
        >
          Book
        </Button>
      </Box>
    </>
  );
};
