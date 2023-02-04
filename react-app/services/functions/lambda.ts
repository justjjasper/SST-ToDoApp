import { RDSDataService } from "aws-sdk";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "@serverless-stack/node/rds";
import { APIGatewayProxyEventV2 } from "aws-lambda"
import { CreateAWSLambdaContextOptions, awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { initTRPC } from '@trpc/server';
import * as trpc from '@trpc/server'
import { z } from 'zod';

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

// implement tRPC router
const appRouter = initTRPC.create().router({
  getTasks: initTRPC.create().procedure.output(z.array(z.object({task: z.string(), completed: z.boolean()}))).query(async () => {
    const record = await db
    .selectFrom("todotbl")
    .selectAll()
    .execute();

    return record

  })
});

export type AppRouter = typeof appRouter

// **Do not need Context atm, it's meant for Auth**
// const createContext = ({
//   event,
//   context,
// }: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}) // no context
// type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const trpcHandler = awsLambdaRequestHandler({
  router: appRouter,
  // createContext,
})









// handles GET function (controller)
// export async function getHandler() {
//   const record = await db
//     .selectFrom("todotbl")
//     .selectAll()
//     .execute();

//   return {
//     statusCode: 200,
//     body: JSON.stringify(record)
//   };
// }

// export async function postHandler(event:any) {
//   // const postBody = JSON.parse(event.body)
//   console.log('what is the body', event.body)

//   return {
//     statusCode: 200,
//     body: event.body
//   }
// }
// export async function handler() {
//   const record = await db
//     .selectFrom('todotbl')
//     .selectAll()
//     .execute()

  // await db
  // .updateTable("todotbl")
  // .set({
  //   completed: false,
  // })
  // .execute();

//   return {
//     statusCode: 200,
//     body: record
//   }
// }
// import { APIGatewayProxyHandlerV2 } from "aws-lambda";

// export const handler: APIGatewayProxyHandlerV2 = async (event) => {
//   return {
//     statusCode: 200,
//     headers: { "Content-Type": "text/plain" },
//     body: `Hello, World!`,
//   };
// };
