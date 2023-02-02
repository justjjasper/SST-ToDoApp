import { StackContext, ReactStaticSite,  Api } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "functions/lambda.handler",
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
  });
}
