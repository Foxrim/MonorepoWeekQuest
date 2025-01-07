import { Link } from "react-router-dom";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>Site de film</h1>
        <hr />
        <nav>
          <ul>
            <li>
              <Link to="/categories">Catégories</Link>
            </li>
            <li>
              <Link to="/programs">Programs</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
