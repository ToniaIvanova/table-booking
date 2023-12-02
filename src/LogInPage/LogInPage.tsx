import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LogInResponseDto } from "../slices/users/types";
import { useGetOrAddUserMutation } from "../slices/users/api";
import { Copyright } from "../common/Copyright";
import { useFeedError, useFeedSuccess } from "../common/feesHook";

const defaultTheme = createTheme();

export const LogInPage = ({
  login,
}: {
  login: (user: LogInResponseDto) => void;
}) => {
  const feedSuccess = useFeedSuccess();
  const feedError = useFeedError();
  const [getOrAddUser] = useGetOrAddUserMutation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");

    if (username && typeof username === "string") {
      getOrAddUser({ username })
        .unwrap()
        .then((res) => {
          login(res);
          feedSuccess(`Hello, ${res.name}!`);
        })
        .catch(() => feedError("Something went wrong, try again"));
    } else {
      feedError("Type in your name, please");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};
