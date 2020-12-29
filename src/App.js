import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ShowRelatorio from './showRelatorio';
import {arrayTabela1, arrayTabela2, arrayTabela3} from './showRelatorio/array';
import customColumns from './colunaCustom';
import consolidado from './consolidado';
// import ShowRelatorio from '@lestetelecom/showrelatorio';
// import ShowRelatorio from 'lib';
import { arrayColunasTeste, arrayDadosTeste} from './array';
import Virtual from './virtualized';
import cc from './funcionar/customColumns';
import rela from './funcionar/relatorio.json';
import Table from './testeTable';

class App extends Component {

  constructor( props ){
        
    super( props );

    this.state = {
      relat: consolidado,
    }

  this.array1 = this.array1.bind(this);
  this.array2 = this.array2.bind(this);
  this.array3 = this.array3.bind(this);
    
}

async array1(){

  await this.setState((state, props) => ({
    relat: arrayTabela1
  }));
  
}

  async array2(){

    await this.setState({
      relat: arrayTabela2
    })
    
  }

  async array3(){

    await this.setState((state, props) => ({
      relat: arrayTabela3
    }));
    
  }s
  render(){
    
    return (
      < div style={{height: '100%'}}>

      <div style={{height: '100%'}}>
          <ShowRelatorio 
          // relatorio={consolidado} 
          // customColumns ={customColumns}
          // virtualWidth={3.5}

          // relatorio={arrayDadosTeste} 
          // customColumns ={ arrayColunasTeste}
          // virtualWidth={1}

          relatorio={rela} 
          customColumns={ cc}
          virtualWidth={2}
          
          />

      </div>

      <Table/>

      </div>
    );
  }
}

export default App;

