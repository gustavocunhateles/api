import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { PanelMenu } from 'primereact/panelmenu';
import Flags from 'country-flag-icons/react/3x2';
import "./sass/App.scss";
 
class App extends Component {
  
  render() {

    /* Opções do menu */
    const menu = [
      {
        label: <Flags.BR title="Português" className="br"/>, /* Bandeira do Brasil */
        command:() => this.props.history.push('/pt') /* Adicionar /pt no fim da url */
      },
      {
        label: <Flags.US title="English" className="us"/>, /* Bandeira dos USA */
        command:() => this.props.history.push('/en') /* Adicionar /us no fim da url */
      }
    ];

    return (
      
      <div className="container App">        
        <PanelMenu model={menu} className="us br"/> {/* Opções do menu */}       
        {this.props.children} {/* Opção do menu escolhida */}
      </div>

    );
  }
}

export default withRouter(App);
