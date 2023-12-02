import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LogInRequestDto, LogInResponseDto } from "./types";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_PUBLIC_URL}/user`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: rawBaseQuery,
  endpoints: (builder) => ({
    getOrAddUser: builder.mutation<LogInResponseDto, LogInRequestDto>({
      query: (body) => ({ url: "", method: "POST", body }),
    }),
  }),
});

export const { useGetOrAddUserMutation } = usersApi;
