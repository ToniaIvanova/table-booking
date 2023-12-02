import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";

type HeaderProps = {
  logout: () => void;
  username: string;
}

export const Header: React.FC<HeaderProps> = ({logout, username}) => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Table Booking
        </Typography>
        <Button onClick={logout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Logout
        </Button>
        <Avatar>{username.slice(0, 1).toUpperCase()}</Avatar>
      </Toolbar>
    </AppBar>
  );
};
