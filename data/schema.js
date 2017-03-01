import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import { ClienteType, ClienteMutation } from './shemas/cliente';

import { ArticuloType, ArticuloMutation } from './shemas/articulos';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    cliente: {
      type: ClienteType,
      resolve: () => ClienteType,
    },
    articulos: {
      type: ArticuloType,
      resolve: () => ArticuloType,
    },
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ClienteMutation: ClienteMutation,
    ArticuloMutation: ArticuloMutation,
  })
});

export const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

/*

*/
