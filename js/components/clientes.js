import React, { Component } from 'react';
import Relay from 'react-relay';

class Articulo extends React.Component {
  render() {
    var {id,descripcion} = this.props.articulo;
    return (
      <span>id: {id} | descripcion: {descripcion}</span>
    );
  }
}

Articulo = Relay.createContainer(Articulo, {
  fragments: {
    articulo: () => Relay.QL`
      fragment on ArticuloModel {
        id
        descripcion,
      }
    `,
  },
})

class Detalles extends React.Component {
  render() {
    var {cantidad,articulo} = this.props.detalles;
    return (
      <div>
        <span>cantidad: {cantidad}</span>&nbsp;&nbsp;
        {
          articulo.map( (articulo,index) =>
            <Articulo key={`articulo-${index}`} articulo={articulo} />
          )
        }
      </div>
    );
  }
}

Detalles = Relay.createContainer(Detalles, {
  fragments: {
    detalles: () => Relay.QL`
      fragment on DetalleModel {
        cantidad,
        articulo {
          ${Articulo.getFragment('articulo')}
        }
      }
    `,
  },
})

class Cliente extends React.Component {
  render() {
    var {nombre,telefono,detalles} = this.props.cliente;
    return (
      <tr>
        <td>{nombre}&nbsp;&nbsp;|</td>
        <td>{telefono}&nbsp;&nbsp;|</td>
        <td>
          <ul>
            {
              detalles.map( (detalles,index) =>
                <Detalles key={`detalles-${index}`} detalles={detalles} />
              )
            }
          </ul>
        </td>
      </tr>
    );
  }
}

Cliente = Relay.createContainer(Cliente, {
  fragments: {
    cliente: () => Relay.QL`
      fragment on ClienteModel {
        nombre,
        telefono,
        detalles {
          ${Detalles.getFragment('detalles')}
        }
      }
    `,
  },
});

class Store extends React.Component {
  constructor(props) {
    super(props);
    this._handle = this._handle.bind(this);
  }
  _handle() {
    let cedula = (this.refs.cedula.value) ? this.refs.cedula.value : '';
    this.props.relay.setVariables({ cedula });
  }
  render() {
    return (
      <div>
        cedula:
        &nbsp;&nbsp;
        <input ref="cedula" placeholder="cedula" type="text" />
        &nbsp;&nbsp;
        <input type="button" value="Consulta" onClick={this._handle} />
        <h3>Cliente</h3>
        <table>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>TELEFONO</th>
              <th>COMPRAS</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cliente.cliente.map(
              (cliente,index) => <Cliente key={`cliente-${index}`} cliente={cliente} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

Store = Relay.createContainer(Store, {
  initialVariables: {
    cedula: '',
  },
  fragments: {
    cliente: () => Relay.QL`
      fragment on ClienteType {
        cliente (cedula:$cedula) {
          ${Cliente.getFragment('cliente')}
        },
      }
    `,
  },
});

export default Store;

/*

*/
