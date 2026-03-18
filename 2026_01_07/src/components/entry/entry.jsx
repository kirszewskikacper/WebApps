import styles from "./entry.module.scss";

const entryData = {
  title: "Outer wilds new dlc?",
  category: "Gaming",
  subtitle:
    "Pojawiły się nowe teorie odnośnie nowego dlc. Fani są w szoku.",
  content: `
    Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem 
    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem 
    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem 
    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
    Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem 
    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem 
    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem 
    ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
  `
};

export default function Entry() {
  const { title, category, subtitle, content } = entryData;

  return (
    <article className={styles.Entry}>
      <h1>{title}</h1>
      <h2>{category}</h2>
      <h3>{subtitle}</h3>
      <p>{content}</p>
    </article>
  );
}
