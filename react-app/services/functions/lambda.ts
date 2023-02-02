import { RDSDataService } from "aws-sdk";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "@serverless-stack/node/rds";

interface Database {
  todotbl: {
    task: string;
    completed: boolean;
  };
}

const db = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      database: RDS.Cluster.defaultDatabaseName,
      secretArn: RDS.Cluster.secretArn,
      resourceArn: RDS.Cluster.clusterArn,
      client: new RDSDataService(),
    },
  }),
});

export async function handler() {
  const record = await db
    .selectFrom("todotbl")
    .select("task")
    .executeTakeFirstOrThrow();

  await db
  .updateTable("todotbl")
  .set({
    completed: false,
  })
  .execute();

  return {
    statusCode: 200,
    body: record.task,
  };
}
// import { APIGatewayProxyHandlerV2 } from "aws-lambda";

// export const handler: APIGatewayProxyHandlerV2 = async (event) => {
//   return {
//     statusCode: 200,
//     headers: { "Content-Type": "text/plain" },
//     body: `Hello, World!`,
//   };
// };
