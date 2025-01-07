import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ProgramDeleteFormProps = {
  id: number;
  children: ReactNode;
};

function ProgramDeleteForm({ id, children }: ProgramDeleteFormProps) {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`, {
          method: "delete",
        })
          .then((response) => {
            if (response.status === 204) {
              navigate("/programs");
            } else {
              console.error("Failed to delete program:", response.status);
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

export default ProgramDeleteForm;
