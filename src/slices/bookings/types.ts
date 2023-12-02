export type Booking = {
  start: Date;
  userFirst?: string;
  userSecond?: string;
}

export type GetAllResponse = Booking[];

export type AddBookingRequest = {
  start: Date;
  userId: string;
};
