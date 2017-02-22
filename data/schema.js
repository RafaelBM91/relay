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

import datos from './database';

import { getArrayData, resolveModelsByClass } from 'sequelize-relay';

const DB = {
  clientes: [
    {id: "0", cedula: "19529584", nombre: "Rafael", telefono: "0414-7375800"},
    {id: "1", cedula: "19529584", nombre: "Rafael", telefono: "0414-7375800"},
    {id: "2", cedula: "19529584", nombre: "Rafael", telefono: "0414-7375800"},
    {id: "3", cedula: "19529584", nombre: "Rafael", telefono: "0414-7375800"},
    {id: "4", cedula: "19529584", nombre: "Rafael", telefono: "0414-7375800"},
    {id: "5", cedula: "19529584", nombre: "Rafael", telefono: "0414-7375800"},
    {id: "6", cedula: "19529584", nombre: "Rafael", telefono: "0414-7375800"},
    {id: "7", cedula: "19529584", nombre: "Rafael", telefono: "0414-7375800"},
    {id: "8", cedula: "19529584", nombre: "Rafael", telefono: "0414-7375800"},
    {id: "9", cedula: "19529584", nombre: "Rafael", telefono: "0414-7375800"},
  ],
  articulos: [
    {id: "0", descripcion: "articulo"},
    {id: "1", descripcion: "articulo"},
    {id: "2", descripcion: "articulo"},
    {id: "3", descripcion: "articulo"},
    {id: "4", descripcion: "articulo"},
  ],
};

const ClienteModel = new GraphQLObjectType({
  name: 'ClienteModel',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    cedula: {
      type: GraphQLString,
    },
    nombre: {
      type: GraphQLString,
    },
    telefono: {
      type: GraphQLString,
    },
  })
});

/*const ArticulosType = new GraphQLObjectType({
  name: 'Articulo',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    descripcion: {
      type: GraphQLString,
    },
  })
});*/

const ClienteType = new GraphQLObjectType({
  name: 'ClienteType',
  fields: () => ({
    clientes: {
      type: new GraphQLList(ClienteModel),
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    cliente: {
      type: ClienteType,
      resolve: () => DB,
    },
  }),
});

export const Schema = new GraphQLSchema({
  query: queryType,
});

/*

*/