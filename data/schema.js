import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId
} from 'graphql-relay';

import { resolveArrayData } from 'sequelize-relay';

import models from './database';

const ClienteModel = new GraphQLObjectType({
  name: 'ClienteModel',
  fields: () => ({
    cedula: {
      type: GraphQLString,
    },
    nombre: {
      type: GraphQLString,
    },
    telefono: {
      type: GraphQLString,
    },
    detalles: {
      type: new GraphQLList(DetalleModel),
      resolve({cedula}) {
        return resolveArrayData(models.detalle.findAll({where: {clienteCedula: cedula}}));
      },
    }
  })
});

const ClienteType = new GraphQLObjectType({
  name: 'ClienteType',
  fields: () => ({
    cliente: {
      type: new GraphQLList(ClienteModel),
      args: {
        cedula: {
          type: new GraphQLNonNull(GraphQLString),
        }
      },
      resolve(root,{cedula}) {
        return resolveArrayData(models.cliente.findAll({where: {cedula}}))
      },
    },
  }),
});

const ArticuloModel = new GraphQLObjectType({
  name: 'ArticuloModel',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    descripcion: {
      type: GraphQLString,
    },
    cantidad: {
      type: GraphQLInt,
    },
    precio: {
      type: GraphQLFloat,
    },
  })
});

const ArticuloType = new GraphQLObjectType({
  name: 'ArticuloType',
  fields: () => ({
    articulos: {
      type: new GraphQLList(ArticuloModel),
      resolve(root,args) {
        return root;
      }
    },
  })
});

const DetalleModel = new GraphQLObjectType({
  name: 'DetalleModel',
  fields: () => {
    return {
      cantidad: {
        type: GraphQLInt,
        resolve({cantidad}) {
          return cantidad;
        },
      },
      articulo: {
        type: new GraphQLList(ArticuloModel),
        resolve({articuloId}) {
          return resolveArrayData(models.articulo.findAll({where:{id: articuloId}}));
        },
      }
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    cliente: {
      type: ClienteType,
      resolve: () => ClienteType,
    },
    articulos: {
      type: ArticuloType,
      resolve: () => resolveArrayData(models.articulo.findAll()),
    },
  }),
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createComment: CreateCommentMutation,
  }),
});

export const Schema = new GraphQLSchema({
  query: queryType,
});

/*

*/
