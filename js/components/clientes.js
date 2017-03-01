import React, { Component } from 'react';
import Relay from 'react-relay';

class ClienteMutation extends Relay.Mutation {
  static fragments = {
    cliente: () => Relay.QL`
      fragment on ClienteType { codigo }
    `,
  };
  getMutation() {
    return Relay.QL`
      mutation{ ClienteMutation }
    `;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ClienteMutationPayload { 
        cliente {
          cedula,
          nombre,
          telefono,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { cliente: this.props.cliente.codigo },
    }];
  }
  getVariables() {
    return {
      cedula: this.props.cedula,
      nombre: this.props.nombre,
      telefono: this.props.telefono,
    };
  }
}

class Cliente extends React.Component {
  constructor(props) {
    super(props);
    this._handleBuscar = this._handleBuscar.bind(this);
    this._handleGuardar = this._handleGuardar.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    let { cliente } = this.props.cliente;
    if (cliente.length) {
      this.refs.nombre.value = cliente[0].nombre;
      this.refs.telefono.value = cliente[0].telefono;
    }
  }
  _handleBuscar() {
    let cedula = (this.refs.cedula.value) ? this.refs.cedula.value : '';
    this.props.relay.setVariables({ cedula });
  }
  _handleGuardar() {
    let operacion = Relay.Store.applyUpdate(
      new ClienteMutation({
        cliente: this.props.cliente,
        cedula: this.refs.cedula.value,
        nombre: this.refs.nombre.value,
        telefono: this.refs.telefono.value,
      })
    );
    operacion.commit();
  }
  render() {
    return (
      <div>
        <h1>Cliente</h1>
        <input ref="cedula" placeholder="Cedula" type="text" defaultValue="19529584" />
        <br/><br/>
        <input ref="nombre" placeholder="Nombre" type="text" />
        <br/><br/>
        <input ref="telefono" placeholder="Telefono" type="text" />
        <br/><br/>
        <input type="button" value="Buscar" onClick={this._handleBuscar} />
        &nbsp;&nbsp;
        <input type="button" value="Guardar" onClick={this._handleGuardar} />
      </div>
    );
  }
}

Cliente = Relay.createContainer(Cliente, {
  initialVariables: {
    cedula: '',
  },
  fragments: {
    cliente: () => Relay.QL`
      fragment on ClienteType {
        cliente (cedula:$cedula) {
          nombre,
          telefono,
        },
        ${ClienteMutation.getFragment('cliente')},
      }
    `,
  },
});

export default Cliente;

/*

*/
