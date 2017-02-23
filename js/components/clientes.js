import React, { Component } from 'react';
import Relay from 'react-relay';

class Cliente extends React.Component {
  render() {
    var {id, cedula} = this.props.cliente;
    return (
      <li key={id}>
        {id} (<em>{cedula}</em>)
      </li>
    );
  }
}

Cliente = Relay.createContainer(Cliente, {
  fragments: {
    cliente: () => Relay.QL`
      fragment on ClienteModel {
        id,
        cedula,
      }
    `,
  },
});

class Store extends React.Component {
  render() {
    console.log(
      this.props.cliente.clientes[0]
    );
    return (
      <div>
        <ul>
          {this.props.cliente.clientes.map(
            (cliente,index) => <Cliente key={`cliente-${index}`} cliente={cliente} />
          )}
        </ul>
      </div>
    );
  }
}

Store = Relay.createContainer(Store, {
  fragments: {
    cliente: () => Relay.QL`
      fragment on ClienteType {
        clientes {
          ${Cliente.getFragment('cliente')}
        },
      }
    `,
  },
});

export default Store;

/*

*/
