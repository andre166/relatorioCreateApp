import React, {Component} from 'react';
import RelatorioTable from './components/relatorio/relatorioTable';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import store from './store';

class ShowRelatorio extends Component {

  constructor( props ){
        
    super( props );

    this.state = {
      renderRelatorio: true,
      renderGraphBtn: false,
    }
    
  }

  componentDidUpdate( prevProps ){

    if( prevProps !== this.props ){

      const closeRelatorio = async () => {
        await this.setState(() => ({ renderRelatorio: false }) );
        openRelatorio()
      }


      const openRelatorio = async () => {
        await this.setState( () => ({ renderRelatorio: true }) );
      }

      closeRelatorio()
      
    }

  }

  renderizarGraphBtn = () => {

    let list = this.props.customColumns;
    let renderBtn = false;

    if( list ){
      list.map( e => {
  
        if( e['renderGraph'] ){
          renderBtn = true;
        }
  
      })
    }

    return renderBtn;
  }

  render(){
    const props = this.props;
    return (
    <Provider store={store}>
        <div>
          {this.state.renderRelatorio == false ? '' :
            <RelatorioTable {...props} relatorio={this.props.relatorio} customColumns={this.props.customColumns} renderGraphBtn={this.renderizarGraphBtn()} TableDimension={this.props.TableDimension}/>
          }
        </div>
    </Provider>
    );
  }
}

ShowRelatorio.propTypes = {
  relatorio: PropTypes.array.isRequired,
  customColumns: PropTypes.array,
  tableHeight: PropTypes.number
};

export default ShowRelatorio;
