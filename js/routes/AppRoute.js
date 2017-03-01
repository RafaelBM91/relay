import Relay from 'react-relay';

export class ClienteRoute extends Relay.Route {
  static routeName = 'ClienteRoute';
  static queries = {
    cliente: (Component) => {
      return Relay.QL`
      query {
        cliente {
          ${Component.getFragment('cliente')}
        }
      }
    `},
  };
}

export class ArticuloRoute extends Relay.Route {
  static routeName = 'ArticuloRoute';
  static queries = {
    articulos: (Component) => {
      return Relay.QL`
      query {
        articulos {
          ${Component.getFragment('articulos')}
        }
      }
    `},
  };
}

/*

*/
