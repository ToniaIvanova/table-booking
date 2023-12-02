import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector,
} from "react-redux";
import { usersApi } from "./slices/users/api";
import { bookingsApi } from "./slices/bookings/api";

const reducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [bookingsApi.reducerPath]: bookingsApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    usersApi.middleware,
    bookingsApi.middleware,
  ],
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type ThunkApi = {
  dispatch: Dispatch;
  state: State;
};

export const useDispatch = () => useDefaultDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<State> = useDefaultSelector;
