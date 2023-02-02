import { StackContext, ReactStaticSite, Api, RDS } from "@serverless-stack/resources";

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
    routes: {
      "POST /": "functions/lambda.handler",
    },
  });

  // deploy react app
  const site = new ReactStaticSite(stack, "ReactSite", {
    path: "frontend",
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
