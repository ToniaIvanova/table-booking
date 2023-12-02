import * as React from "react";
import {
  CssBaseline,
  Container,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";

import { ChooseDateAndTime } from "./ChooseDateAndTime/ChooseDateAndTime";
import { Copyright } from "../common/Copyright";
import { Header } from "./Header";

export const FormPage = ({
  username,
  logout,
  userId,
}: {
  username: string;
  logout: () => void;
  userId: string;
}) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header logout={logout} username={username} />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Table Booking
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pb: 5 }}>
            <Button variant="outlined" disabled sx={{ mt: 3, ml: 1 }}>
              Booked
            </Button>
            <Button variant="outlined" sx={{ mt: 3, ml: 1 }} color="primary">
              Free
            </Button>
            <Button variant="outlined" sx={{ mt: 3, ml: 1 }} color="secondary">
              Choosen
            </Button>
            <Button variant="outlined" sx={{ mt: 3, ml: 1 }} color="success">
              Partly booked
            </Button>
          </Box>
          <ChooseDateAndTime userId={userId} />
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
};
