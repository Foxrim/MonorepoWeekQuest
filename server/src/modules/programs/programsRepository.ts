import { a3 } from "@faker-js/faker/dist/airline-C5Qwd7_q";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class ProgramsRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM program");

    return rows as Program[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM program WHERE id = ?",
      [id],
    );

    return rows as Program[];
  }

  async create(program: Omit<Program, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO program (title, synopsis, poster, country, year, category_id) values (?,?,?,?,?,?)",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        program.category_id,
      ],
    );

    return result.insertId;
  }

  async update(id: number, program: Omit<Program, "id">) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE program SET title = ?, synopsis = ?, poster = ?, country = ?, year = ?, category_id = ? WHERE id = ?",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        program.category_id,
        id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM program WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new ProgramsRepository();