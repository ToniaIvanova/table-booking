import React from "react";
import { Button, Grid } from "@mui/material";

type TimeTableProps = {
  hourDisability: number[];
  choosenHour: number | null;
  setChoosenHour: (hour: number | null) => void;
};

export const TimeTable: React.FC<TimeTableProps> = ({
  hourDisability,
  choosenHour,
  setChoosenHour,
}: TimeTableProps) => {
  const onTimeChange = (e: any) => {
    setChoosenHour(Number(e?.target?.value) ?? null);
  };
  return (
    <Grid container item spacing={1} xs={7}>
      {hourDisability.map((value, index) => (
        <Grid item xs={2} key={`${value}-${index}`}>
          <Button
            variant="outlined"
            disabled={!value}
            color={
              choosenHour === index
                ? "secondary"
                : value === 1
                ? "success"
                : "primary"
            }
            onClick={onTimeChange}
            value={index}
          >
            {("00" + index).slice(-2) + ":00"}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
