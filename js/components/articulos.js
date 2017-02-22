import React, { Component } from 'react';
import Relay from 'react-relay';

class Articulo extends React.Component {
  render() {
    var {id, descripcion} = this.props.articulo;
    return (
      <li key={id}>
        {id} (<em>{descripcion}</em>)
      </li>
    );
  }
}

Articulo = Relay.createContainer(Articulo, {
  fragments: {
    articulo: () => Relay.QL`
      fragment on Articulo {
        id,
        descripcion,
      }
    `,
  },
});

class Store extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.store.articulos.map(
            (articulo,index) => <Articulo key={`articulo-${index}`} articulo={articulo} />
          )}
        </ul>
      </div>
    );
  }
}

Store = Relay.createContainer(Store, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        articulos {
          ${Articulo.getFragment('articulo')}
        },
      }
    `,
  },
});

export default Store;

/*

*/
