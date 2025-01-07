import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import styles from "../styles/categoryPage.module.css";
type Category = {
  id: number;
  name: string;
};

function CategoryIndex() {
  const [categories, setCategories] = useState([] as Category[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategories(data);
      });
  }, []);

  return (
    <>
      <div className={styles.categoryPage}>
        <Header />

        <Link to={"/categories/new"}>Ajouter</Link>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/categories/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CategoryIndex;
