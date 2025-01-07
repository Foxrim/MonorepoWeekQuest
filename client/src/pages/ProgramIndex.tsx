import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import styles from "../styles/categoryPage.module.css";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

function ProgramIndex() {
  const [programs, setPrograms] = useState([] as Program[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        setPrograms(data);
      });
  }, []);

  return (
    <>
      <div className={styles.categoryPage}>
        <Header />

        <Link to={"/programs/new"}>Ajouter</Link>
        <ul>
          {programs.map((category) => (
            <li key={category.id}>
              <Link to={`/programs/${category.id}`}>{category.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ProgramIndex;
