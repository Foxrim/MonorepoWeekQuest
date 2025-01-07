import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CategoryDeleteForm from "../components/CategoryDeleteForm";
import Header from "../components/header";
import styles from "../styles/categoryPage.module.css";

type Category = {
  id: number;
  name: string;
};

function CategoryDetail() {
  const { id } = useParams();
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategories(data);
      });
  }, [id]);

  return (
    <div className={styles.categoryPage}>
      <Header />
      {categories &&
        categories.length > 0 &&
        categories.map((category) => (
          <div key={category.id}>
            <h1>{category.name}</h1>
            <Link to={`/categories/${category.id}/edit`}>Modifier</Link>
            <CategoryDeleteForm id={category.id}>Supprimer</CategoryDeleteForm>
          </div>
        ))}
    </div>
  );
}

export default CategoryDetail;
