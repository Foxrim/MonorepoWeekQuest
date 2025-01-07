import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../components/categoryForm";
import Header from "../components/header";
import styles from "../styles/categoryPage.module.css";

type Category = {
  id: number;
  name: string;
};

function CategoryEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [category, setCategory] = useState<Category[] | null>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategory(data);
      });
  }, [id]);

  return (
    <div className={styles.categoryPage}>
      <Header />

      {category &&
        category.length > 0 &&
        category.map((category) => (
          <div key={category.id}>
            <CategoryForm
              defaultValue={{ name: category.name }}
              onSubmit={(categoryData) => {
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/categories/${category.id}`,
                  {
                    method: "put",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(categoryData),
                  },
                ).then((response) => {
                  if (response.status === 204) {
                    navigate(`/categories/${category.id}`);
                  }
                });
              }}
            >
              Modifier
            </CategoryForm>
          </div>
        ))}
    </div>
  );
}

export default CategoryEdit;
