import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM category");

    return rows as Category[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      select 
        category.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", program.id, "title", program.title
          )
        ) as programs 
      from 
        category 
        left join program on program.category_id = category.id 
      where 
        category.id = ? 
      group by 
        category.id
      `,
      [id],
    );

    return rows as Category[];
  }

  async create(category: Omit<Category, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO category (name) values (?)",
      [category.name],
    );

    return result.insertId;
  }

  async update(id: number, category: Omit<Category, "id">) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE category SET name = ? WHERE id = ?",
      [category.name, id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM category WHERE id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new CategoryRepository();
