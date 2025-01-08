"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from '../styles/(global)/nav.module.css'


export default function Navigation() {
    const path = usePathname();
    return (
        <nav className={styles.nav}>
            <ul>
                <li className={path === "/" ? styles.active : ""}>
                    <Link href="/">Home{path === "/" ? "💕" : ""}</Link>
                </li>
                <li className={path === "/about-us" ? styles.active : ""}>
                    <Link href="/about-us">About Project{path === "/about-us" ? "💕" : ""}</Link>
                </li>
            </ul>
        </nav>
    )
}