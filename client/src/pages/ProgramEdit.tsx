import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/categoryPage.module.css";

import Header from "../components/header";
import ProgramForm from "../components/programForm";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function ProgramEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [programs, setPrograms] = useState<Program[] | null>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        setPrograms(data);
      });
  }, [id]);

  return (
    <div className={styles.categoryPage}>
      <Header />

      {programs &&
        programs.length > 0 &&
        programs.map((program) => (
          <div key={program.id}>
            <ProgramForm
              defaultValue={{
                title: program.title,
                synopsis: program.synopsis,
                poster: program.poster,
                country: program.country,
                year: program.year,
                category_id: program.category_id,
              }}
              onSubmit={(programData) => {
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/programs/${program.id}`,
                  {
                    method: "put",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(programData),
                  },
                ).then((response) => {
                  if (response.status === 204) {
                    navigate(`/programs/${program.id}`);
                  }
                });
              }}
            >
              Modifier
            </ProgramForm>
          </div>
        ))}
    </div>
  );
}

export default ProgramEdit;
