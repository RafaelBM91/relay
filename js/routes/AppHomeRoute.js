import Relay from 'react-relay';

export default class extends Relay.Route {
  static routeName = 'Home';
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