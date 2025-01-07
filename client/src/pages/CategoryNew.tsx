import { useNavigate } from "react-router-dom";
import CategoryForm from "../components/categoryForm";
import Header from "../components/header";
import styles from "../styles/categoryPage.module.css";

function CategoryNew() {
  const navigate = useNavigate();

  const newCategory = {
    name: "",
  };

  return (
    <div className={styles.categoryPage}>
      <Header />
      <CategoryForm
        defaultValue={newCategory}
        onSubmit={(categoryData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryData),
          }).then((response) => {
            if (response.status === 204) {
              navigate("/categories");
            }
          });
        }}
      >
        Ajouter
      </CategoryForm>
    </div>
  );
}

export default CategoryNew;
