export interface Application {
}

export interface User {
    id?: string;
    name?: string;
    email: string;
    mobile?: string;
    gender?: string;
    terms?: boolean;
    password?: string;
    userRole: string;
    isAccountNonExpired?: boolean;
    isAccountNonLocked?: boolean;
    isCredentialsNonExpired?: boolean;
    isEnabled?: boolean;
}

export class UserImpl implements User {
    id: string = '';
    name: string = '';
    email: string = '';
    mobile: string = '';
    gender: string = '';
    terms: boolean = true;
    password: string = '';
    userRole: string = '';

}

export interface Credentials {
    username: string;
    password: string;
}

export interface Movie {
    id?: number;
    name: string;
    image?: string;
    bgImage?: string;
    year?: string;
    story?: string;
    duration?: string;
    addedOn?: Date;
    caption?: string;
    release?: Date;
    genres?: string[];
    language?: string;
    casts?: Actor[];
    crews?: Actor[];
}

export interface Auditorium {
    id?: number;
    name: string;
    image?: string;
    email?: string;
    address?: string;
    customerCareNo?: string;
    seatCapacity?: number;
    facilities?: string[];
    safeties?: string[];
    shows: Show[];
}

export interface Show {
    id?: number;
    name: string;
    startTime: string;
    movieShows?: MovieShow[];
}

export interface MovieShow {
    id?: number;
    start?: Date;
    end?: Date;   // Add this field in backend
    movieId?: number;              // Need movie, add this in backed
    bookings?: Booking[];
    price?: Price;
}

export interface Booking {
    id?: number;
    amount?: number;
    totalSeats?: number;
    bookedOn?: Date;
    dateOfBooking?: Date;
    seatNumbers?: string[];
    userId?: string;                 // Need user, add this in backed
    payment?: Payment;
    bookingDetails: BookingDetails;
}

export interface BookingDetails {
    id?: number;
    auditoriumId: number;
    showId: number;
    movieShowId: number;
    movieId: number;
}

export interface Price {
    id?: number;
    general: number;
    silver: number;
    gold: number;
}

export interface Payment {
    id?: number;
    amount: number;
    paymentDate: Date;
    cardNumber: string;
    cardExpiryMonth: string;
    cardExpiryYear: string;
    cardCVV: string;
}

export interface Actor {
    id?: number;
    isCast: string;
    name: string;
    role: string;
    image: string;
}

export interface TempSelectMembers {
    auditoriumId: number,
    auditoriumName: string;
    showId: number,
    showName: string;
    showTime: string;
    movieShowId: number;
    bookedSeats: number;
    bookedSeatNumbers: string[];
    date: Date;
    movieName: string;
    movieId: number;
    movieLanguage: string;
    seats: number;
}

export interface TempScreen {
    selectedSeats: number;
    selectedSeatNumbers: string[];
    amount: number;
}

export interface TempAuditoriumShowSelectedForSeatBooking {
    auditoriumId: number;
    showId: number;
    noOfSeats: number;
    alreadySelectedSeats: string[];
}

export interface Token {
    token: string;
}

export interface HttpResponse {
    statusCode: number;
    error: string;
    message: string;
}

export interface BookedSeats {
    count: number;
    seats: string[];
}

export interface LeaveForm {
    areYouSure(): boolean;
}
