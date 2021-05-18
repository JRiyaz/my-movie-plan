export interface Application {
}

export interface Movie {
    id?: number;
    name: string;
    image?: string;
    bgImage?: string;
    addedOn?: Date;
    rating?: string;
    release?: Date;
    generes?: string[];
    languages?: string[];
    year?: string;
    story?: string;
    duration?: string;
    casts?: Cast[];
    crews?: Cast[];
}

export interface Auditorium {
    id?: number;
    name: string;
    image?: string;
    email?: string;
    address?: string;
    cutomerCare?: string;
    seatCapacity?: string;
    facilities?: string[];
    safeties?: string[];
    shows: Show[];
}

export interface Show {
    id?: number;
    name: string;
    startTime: string;
    prices?: Price;
    movieShows?: MovieShow[];
    bookings?: Booking[];
}

export interface MovieShow {
    id?: number;
    showId?: number;
    movieId?: number;
    from?: Date;
    to?: Date;
}

export interface Booking {
    id?: number;
    showId?: number;
    movieId?: number;
    userId?: number;
    seatNumbers?: string[];
    amount?: number;
    totalSeats?: number;
    dateOfBooking?: Date;
    status?: boolean;
    paymentId?: Payment;
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
    date: Date;
    bookingId: number;
    cardNumber: string;
    cardExpiryMonth: string;
    cardExpiryYear: string;
    cardCVV: string;
}

export interface Cast {
    id?: number;
    name: string;
    role: string;
    image: string;
}

export interface ShowMovie {
    movieId: number;
    from: Date,
    to: Date,
    prices: Price,
}
