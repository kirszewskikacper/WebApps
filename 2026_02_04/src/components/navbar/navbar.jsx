import { Link as NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const links = [
    { to: "/", label: "Strona główna" },
    { to: "/nwpis", label: "Najnowszy wpis" },
    { to: "/kat", label: "Kategorie" }
  ];

  return (
    <nav className={styles.Navbar}>
      <ul>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
