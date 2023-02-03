import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("todotbl")
    .addColumn("task", "text", (col) => col.primaryKey())
    .addColumn("completed", "boolean")
    .execute();

  // await db
  //   .insertInto("todotbl")
  //   .values({
  //     task: "Create SST App",
  //     completed: false,
  //   })
  //   .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("todotbl").execute();
}