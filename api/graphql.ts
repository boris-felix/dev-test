import { ApolloServer } from "apollo-server-micro";
import { schema } from '../apollo/schema'
import { context } from '../apollo/context'

const server = new ApolloServer({
  schema: schema,
  context: context,
})

export const config = {
  api: {
    bodyParser: false
  }
};

export default server.createHandler({ path: "/api/graphql" });
