import React, { Component } from 'react';
import Relay from 'react-relay';

class ArticuloModel extends React.Component {
  render() {
    var {id, descripcion} = this.props.articulo;
    return (
      <li key={id}>
        {id} (<em>{descripcion}</em>)
      </li>
    );
  }
}

ArticuloModel = Relay.createContainer(ArticuloModel, {
  fragments: {
    articulo: () => Relay.QL`
      fragment on ArticuloModel {
        id
        descripcion
      }
    `,
  },
});

class ArticuloType extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.articulo.articulos.map(
            (articulo,index) => <ArticuloModel key={`articulo-${index}`} articulo={articulo} />
          )}
        </ul>
      </div>
    );
  }
}

ArticuloType = Relay.createContainer(ArticuloType, {
  fragments: {
    articulo: () => {
      return Relay.QL`
      fragment on ArticuloType {
        articulos {
          ${ArticuloModel.getFragment('articulo')}
        },
      }
    `},
  },
});

export default ArticuloType;

/*

*/
