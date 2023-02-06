import { StackContext, StaticSite, Api, RDS } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  // create Aurora DB cluster
  const cluster = new RDS(stack, 'Cluster', {
    engine: "postgresql10.14",
    defaultDatabaseName: 'ToDoDB',
    migrations: 'services/migrations'
  });

  const api = new Api(stack, "api", {
    defaults : {
      function: {
        bind: [cluster]  // <--- Adds PSQL Api
      },
    },
    // cors: {
    //   allowHeaders: ["Authorization"],
    //   allowMethods: ["ANY"],
    //   allowOrigins: ['http://localhost:3000'],
    // },
    routes: {
      "GET /trpc/{proxy+}": "functions/lambda.trpcHandler",
      "POST /trpc/{proxy+}": "functions/lambda.trpcHandler",
      // "PATCH /trpc/{proxy+}": "functions/lambda.trpcHandler",
      // "DELETE /trpc/{info}": "functions/lambda.trpcHandler",
    },
  });


  // deploy react app
  const site = new StaticSite(stack, "ReactSite", {
    path: "frontend",
    buildCommand: "npm run build", // or "yarn build"
    buildOutput: "build",
    environment: {
      REACT_APP_API_URL: api.url,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
    SecretArn: cluster.secretArn,
    ClusterIdentifier: cluster.clusterIdentifier,
  });
}
