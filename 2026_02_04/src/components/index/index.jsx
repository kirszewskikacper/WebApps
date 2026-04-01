import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { entryData } from "../entry/entry.jsx";



export default function Main() {
    const { title, content } = entryData;

    return (
        <main className={styles.Index}>
            <h1>Strona główna</h1>

            <section>
                <h2>Najnowszy wpis:</h2>

                <article>
                    <Link to="/nwpis">
                        <h4>{title}</h4>
                        <p>{content.slice(0, 120)}...</p> {/* skrót treści */}
                    </Link>
                </article>
            </section>
        </main>
    );
}