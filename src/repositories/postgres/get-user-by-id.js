import { PostgresHelper } from "../../db/postgres/helper.js";

class PostgresGetUserByIdRepository {
  async execute(userId) {
    const user = await PostgresHelper.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    return user[0];
  }
}

export { PostgresGetUserByIdRepository };
