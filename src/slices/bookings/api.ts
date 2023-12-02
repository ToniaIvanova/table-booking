import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddBookingRequest, Booking, GetAllResponse } from "./types";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_PUBLIC_URL}/booking`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const bookingsApi = createApi({
  reducerPath: "bookingsApi",
  baseQuery: rawBaseQuery,
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    getAllBookings: builder.query<GetAllResponse, void>({
      query: () => ({ url: "", method: "GET" }),
      providesTags: [{ type: "Booking", id: "list" }],
    }),
    addBooking: builder.mutation<Booking, AddBookingRequest>({
      query: (body) => ({ url: "", method: "POST", body }),
      invalidatesTags: [{ type: "Booking", id: "list" }],
    }),
  }),
});

export const { useGetAllBookingsQuery, useAddBookingMutation } = bookingsApi;
