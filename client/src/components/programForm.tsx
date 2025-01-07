import type { ReactNode } from "react";

type ProgramData = {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: ProgramData;
  onSubmit: (program: ProgramData) => void;
}

export default function ProgramForm({
  children,
  defaultValue,
  onSubmit,
}: ProgramFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get("title") as string;
        const synopsis = formData.get("synopsis") as string;
        const poster = formData.get("poster") as string;
        const country = formData.get("country") as string;
        const year = Number(formData.get("year"));
        const category_id = Number(formData.get("category_id"));

        onSubmit({
          title,
          synopsis,
          poster,
          country,
          year,
          category_id,
        });
      }}
    >
      <label htmlFor="title">
        Titre
        <input type="text" name="title" defaultValue={defaultValue.title} />
      </label>
      <label htmlFor="synopsis">
        Synopsis
        <input
          type="textarea"
          name="synopsis"
          defaultValue={defaultValue.synopsis}
        />
      </label>
      <label htmlFor="poster">
        Poster
        <input type="text" name="poster" defaultValue={defaultValue.poster} />
      </label>
      <label htmlFor="country">
        Pays
        <input type="text" name="country" defaultValue={defaultValue.country} />
      </label>
      <label htmlFor="year">
        Année
        <input type="number" name="year" defaultValue={defaultValue.year} />
      </label>
      <label htmlFor="category_id">
        Catégorie
        <input
          type="number"
          name="category_id"
          defaultValue={defaultValue.category_id}
        />
      </label>
      <button type="submit">{children}</button>
    </form>
  );
}
