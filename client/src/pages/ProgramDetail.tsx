import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ProgramDeleteForm from "../components/ProgramDeleteForm";
import Header from "../components/header";
import ProgramCard from "../components/programCard";
import styles from "../styles/categoryPage.module.css";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

function ProgramDetail() {
  const { id } = useParams();
  const [programs, setPrograms] = useState<Program[] | null>(null);

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
            <ProgramCard
              key={program.id}
              title={program.title}
              synopsis={program.synopsis}
              poster={program.poster}
              country={program.country}
              year={program.year}
            />
            <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
            <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
          </div>
        ))}
    </div>
  );
}

export default ProgramDetail;
