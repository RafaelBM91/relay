import Relay from 'react-relay';

export class ClienteRoute extends Relay.Route {
  static routeName = 'ClienteRoute';
  static queries = {
    cliente: (Component) => {
      return Relay.QL`
      query {
        clientes {
          ${Component.getFragment('cliente')}
        }
      }
    `},
  };
}

export class ClienteIdRoute extends Relay.Route {
  static routeName = 'ClienteIdRoute';
  static queries = {
    cliente: (Component) => {
      return Relay.QL`
      query {
        clienteId(id:1) {
          ${Component.getFragment('cliente')}
        }
      }
    `},
  };
}

export class ArticuloRoute extends Relay.Route {
  static routeName = 'ArticuloRoute';
  static queries = {
    articulo: (Component) => Relay.QL`
      query {
        articulo {
          ${Component.getFragment('articulo')}
        }
      }
    `,
  };
}

/*

*/
