import styles from "../styles/programCard.module.css";

type Program = {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

export default function ProgramCard({
  title,
  synopsis,
  poster,
  country,
  year,
}: Program) {
  return (
    <>
      <div className={styles.programCard}>
        <figure>
          <img src={poster} alt={title} />
        </figure>
        <h3>{title}</h3>
        <p>{synopsis}</p>
        <p>{country}</p>
        <p>{year}</p>
      </div>
    </>
  );
}
