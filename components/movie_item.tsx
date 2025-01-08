"use client";

import Link from "next/link";
import styles from "../styles/(home)/movie_item.module.css"
import { useRouter } from "next/navigation";

interface IMovieProps {
    title: string;
    id: string;
    poster_path: string;
}

export default function Movie({ title, id, poster_path }: IMovieProps) {
    const router = useRouter(); // hook 사용으로 client component

    return (
        <div className={styles.movie}>
            <img src={poster_path} alt={title} onClick={() => router.push(`/movies/${id}`)} />
            <Link href={`/movies/${id}`}>
                {title}
            </Link>
        </div>
    );
}