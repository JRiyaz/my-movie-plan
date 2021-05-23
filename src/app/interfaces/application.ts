export interface Application {
}

export interface User {
    id?: string;
    name: string;
    email: string;
    mobile: string;
    gender: string;
    terms: boolean;
    password: string;
    userRole: string;
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
    rating?: string;
    release?: Date;
    genres?: string[];
    languages?: string[];
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
    end?: Date;
    avalibleSeats?: number;     // Add this field in backend
    movie?: Movie;              // Need movie, add this in backed
    bookings?: Booking[];
    price?: Price;
}

export interface Booking {
    id?: number;
    amount?: number;
    totalSeats?: number;
    dateOfBooking?: Date;
    status?: boolean;
    seatNumbers?: string[];
    user?: User;                 // Need user, add this in backed
    payment?: Payment;
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
    name: string;
    role: string;
    image: string;
}

export interface TempAddMovieToShow {
    movieId: number;
    start: Date,
    end: Date,
    price: Price,
}

export interface TempSelectMembers {
    auditoriumId: number;
    showId: number;
    seats: number;
}

export interface TempScreen {
    auditoriumId: number;
    showId: number;
    selectedSeats: Set<string>;
    amount: number;
}

export interface TempAuditoriumShowSelectedForSeatBooking {
    auditoriumId: number;
    showId: number;
    noOfSeats: number;
    alreadySelectedSeats: string[];
}
