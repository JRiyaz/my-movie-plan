export class GlobalConstants {

    public static APP_NAME: string = 'NMS Cinemas';

    public static SHOW_NAMES: string[] = ['Morning Show', 'Matinee', 'First Show', 'Second Show'];

    public static ALL_GENERS: string[] = ['Comedy', 'Romance', 'Action', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Crime', 'War'];

    public static ALL_LANGUAGES: string[] = ['English', 'Hindi', 'Telugu', 'Kanada', 'Tamil', 'Malayalam', 'Urdu', 'Marathi', 'Punjabi'];

    public static HALL_SAFETIES: string[] = ['Thermal Scanning', 'Contactless Security ChecK', 'Hand Sanitizers Available',
        'Sanitization Before Every Show', 'In-Cinema Social Distancing',
        'Contactless Food Service', 'Packaged Food and Beverage', 'Daily Temperature Checks for Staff',
        'Deep Cleaning of Restrooms', 'Limited Occupancy In Restrooms', 'Sanitized / Sterilized 3D Glasses'];

    public static HALL_FACILITIES: string[] = ['MTicket', 'Wheel Chair Facility', 'Recliner Seats', 'Parking Facility', 'Food Court', 'Ticket Cancellation', 'f & B'];

    public static ROOT_URL = 'http://34.204.2.214:5555/my-movie-plan';

    public static REGISTER_URL = `${GlobalConstants.ROOT_URL}/user/sign-up`;

    public static CHECK_UNIQUENESS_URL = `${GlobalConstants.ROOT_URL}/user/check`;

    public static UPDATE_USER_URL = `${GlobalConstants.ROOT_URL}/user/update`;

    public static GET_LOGGED_IN_USER_URL = `${GlobalConstants.ROOT_URL}/user/get-user`;

    public static AUTHENTICATE_URL = `${GlobalConstants.ROOT_URL}/user/authenticate`;

    public static UNIQUE_USER_URL = `${GlobalConstants.ROOT_URL}/user/check`;

    public static FORGOT_PASSWORD_URL = `${GlobalConstants.ROOT_URL}/user/forgot-password`;

    public static AUDITORIUM_URL = `${GlobalConstants.ROOT_URL}/auditorium`;

    public static GET_ALL_AUDITORIUMS_URL = `${GlobalConstants.ROOT_URL}/auditorium/all`;

    public static ADD_AUDITORIUM_URL = `${GlobalConstants.ROOT_URL}/auditorium/add`;

    public static UPDATE_AUDITORIUM_URL = `${GlobalConstants.ROOT_URL}/auditorium/update`;

    public static DELETE_AUDITORIUM_URL = `${GlobalConstants.ROOT_URL}/auditorium/delete`;

    public static MOVIE_URL = `${GlobalConstants.ROOT_URL}/movie`;

    public static NOW_PLAYING_AND_UP_COMING_MOVIES_URL = `${GlobalConstants.MOVIE_URL}/now-playing-up-coming`;

    public static NOW_PLAYING_MOVIES_URL = `${GlobalConstants.MOVIE_URL}/now-playing`;

    public static UP_COMING_MOVIES_URL = `${GlobalConstants.MOVIE_URL}/up-coming`;

    public static NOT_PLAYING_MOVIES_URL = `${GlobalConstants.MOVIE_URL}/not-playing`;

    public static GET_ALL_MOVIES_URL = `${GlobalConstants.ROOT_URL}/movie/all`;

    public static ADD_MOVIE_URL = `${GlobalConstants.ROOT_URL}/movie/add`;

    public static UPDATE_MOVIE_URL = `${GlobalConstants.ROOT_URL}/movie/update`;

    public static DELETE_MOVIE_URL = `${GlobalConstants.ROOT_URL}/movie/delete`;

    public static SHOW_URL = `${GlobalConstants.ROOT_URL}/show`;

    public static MOVIESHOWS_URL = `${GlobalConstants.ROOT_URL}/movie-show`;

    public static NOW_PLAYING_AND_UP_COMING_MOVIE_SHOWS_URL = `${GlobalConstants.ROOT_URL}/movie-show/now-playing-up-coming`;

    public static NOW_PLAYING_MOVIE_SHOWS_URL = `${GlobalConstants.MOVIESHOWS_URL}/now-playing`;

    public static UP_COMING_MOVIE_SHOWS_URL = `${GlobalConstants.MOVIESHOWS_URL}/up-coming`;

    public static NOT_PLAYING_MOVIE_SHOWS_URL = `${GlobalConstants.MOVIESHOWS_URL}/not-playing`;

    public static BOOKING_URL = `${GlobalConstants.ROOT_URL}/booking`;
}
