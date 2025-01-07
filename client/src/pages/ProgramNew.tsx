import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import ProgramForm from "../components/programForm";
import styles from "../styles/categoryPage.module.css";

function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: 0,
    category_id: 0,
  };

  return (
    <div className={styles.categoryPage}>
      <Header />
      <ProgramForm
        defaultValue={newProgram}
        onSubmit={(programData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(programData),
          })
            .then((response) => {
              if (response.status === 204) {
                navigate("/programs");
              } else {
                console.error(
                  "Failed to add program:",
                  response.status,
                  response.statusText,
                );
                return response
                  .json()
                  .then((data) => console.error("Error details:", data));
              }
            })
            .catch((error) => {
              console.error("Error during fetch:", error);
            });
        }}
      >
        Ajouter
      </ProgramForm>
    </div>
  );
}

export default ProgramNew;
