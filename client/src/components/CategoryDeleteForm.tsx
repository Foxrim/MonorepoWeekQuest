import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type CategoryDeleteFormProps = {
  id: number;
  children: ReactNode;
};

function CategoryDeleteForm({ id, children }: CategoryDeleteFormProps) {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`, {
          method: "delete",
        })
          .then((response) => {
            if (response.status === 204) {
              navigate("/categories");
            } else {
              console.error("Failed to delete category:", response.status);
            }
          })
          .catch((error) => {
            console.error("Error during fetch:", error);
          });
      }}
    >
      <button type="submit">{children}</button>
    </form>
  );
}

export default CategoryDeleteForm;
