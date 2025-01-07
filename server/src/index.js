import "dotenv/config";

import mysql from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class CategoryRepository {
  constructor() {
    // Create a connection pool to the database
    this.databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }

  async readAll() {
    // Access data
    const [rows] = await this.databaseClient.query("SELECT * FROM category");

    return rows;
  }

  close() {
    // Close the connection pool
    this.databaseClient.end();
  }
}

const accessData = async () => {
  try {
    const categoryRepository = new CategoryRepository();

    const categories = await categoryRepository.readAll();

    categoryRepository.close();

    console.info(categories);
  } catch (err) {
    console.error("Error accessing the database:", err.message, err.stack);
  }
};

accessData();
