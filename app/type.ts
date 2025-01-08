/** types */
export interface IMovieDetail {
    title?: string;
    poster_path?: string;
    vote_average?: number;
    videos?: string;
    overview?: string;
    homepage?: string;
}

export interface IMovieDetailVideo {
    id: string;
    key: string;
    name: string;
}