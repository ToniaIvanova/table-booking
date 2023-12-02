import React, { useCallback } from "react";
import { FormPage } from "./FormPage/FormPage";
import { LogInPage } from "./LogInPage/LogInPage";
import { useLocalStorage } from "@uidotdev/usehooks";
import { LogInResponseDto } from "./slices/users/types";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { store } from "./store";

export const App: React.FC = () => {
  const [username, setUsername] = useLocalStorage("username", "");
  const [userId, setUserId] = useLocalStorage("userId", "");

  const login = useCallback(
    (user: LogInResponseDto) => {
      setUsername(user.name);
      setUserId(user._id);
    },
    [setUsername, setUserId]
  );

  const logout = useCallback(() => {
    setUsername("");
    setUserId("");
  }, [setUsername, setUserId]);

  return (
    <Provider store={store}>
      <SnackbarProvider>
        {!userId && <LogInPage login={login} />}
        {userId && (
          <FormPage username={username} userId={userId} logout={logout} />
        )}
      </SnackbarProvider>
    </Provider>
  );
};
