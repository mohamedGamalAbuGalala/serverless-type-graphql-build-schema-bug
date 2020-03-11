import 'source-map-support/register'
import 'reflect-metadata'

import { APIGatewayProxyHandler } from 'aws-lambda'
import { ApolloServer } from 'apollo-server-lambda'
import { buildSchemaSync, Resolver, Query } from 'type-graphql'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
class User {
  @Field(() => ID)
  id: string
}

@Resolver()
class RegisterResolver {
  @Query(() => String, { name: 'helloWorld' })
  async helloWorld () {
    return 'Hello World!'
  }

  @Query(() => User)
  getUser (): User {
    return {
      id: 'fgf'
    }
  }
}

const schema = buildSchemaSync({
  resolvers: [RegisterResolver]
})

const server: ApolloServer = new ApolloServer({
  schema,
  playground: true,
  introspection: true
})

export const handler: APIGatewayProxyHandler = server.createHandler({
  cors: {
    origin: '*'
  }
})
