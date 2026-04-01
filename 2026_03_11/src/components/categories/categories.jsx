import styles from "./categories.module.scss";

export default function Categories() {
  const items = ["Gaming", "Polityka", "Jedzenie", "Muzyka", "Sport"];

  return (
    <section className={styles.Categories}>
      <header>
        <h1>Lista kategorii</h1>
      </header>

      <ul>
        {items.map((cat, index) => (
          <li key={index}>{cat}</li>
        ))}
      </ul>
    </section>
  );
}
