import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { content as entryContent } from "../entry/entry.jsx";

export default function Main() {
  const [title, , description] = entryContent;

  return (
    <main className={styles.Index}>
      <h1>Strona główna</h1>

      <section>
        <h2>Najnowszy wpis:</h2>

        <article>
          <Link to="/nwpis">
            <h4>{title}</h4>
            <p>{description}</p>
          </Link>
        </article>
      </section>
    </main>
  );
}
