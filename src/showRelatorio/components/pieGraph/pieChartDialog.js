import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import PieChartIcon from '@material-ui/icons/PieChart';
import Typography from '@material-ui/core/Typography';
import PieChart from "./pieChart";
import Divider from '@material-ui/core/Divider';
import FilterList from '@material-ui/icons/FilterList';
// ======== REDUX ======== //
import { connect } from 'react-redux';
import { setGraphType, isVisiblePieChart } from '../../actions/pieGraphActions';
import { bindActionCreators } from 'redux';
import styles from './dialogStyle';
import CleanIcon from '../../utils/CleanIcon';

class pieChartDialog extends React.Component {

  state = {
    showChart: false,
    teste: true,
  };

  basicFiltering = React.createRef();
  testing = React.createRef();

  handleTeste = () => {
    this.setState({
      teste: !this.state.teste
    })
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  changeGraph = async ( keyOriginalForGraph, title ) => {

    // await this.props.isVisiblePieChart( false );

    // var container = ReactDOM.findDOMNode(this).parentNode;
    // ReactDOM.unmountComponentAtNode(this.testing);

    this.props.setGraphType( { keyOriginal: keyOriginalForGraph, title: title } );

    // this.props.isVisiblePieChart(true);

  };

  componentDidMount(){
        
    this.props.setGraphType( this.props.relatorioTable.relatorioKeyNames[0].keyOriginalForGraph );

    this.props.isVisiblePieChart( true );

  }

  renderColumnList( relatorioKey, style ){

    const { keyOriginalForGraph, title} = relatorioKey;

    const { keyOriginal } = this.props.pieGraph.graphType;


    if( relatorioKey.renderGraph && this.props.customColumns){
      return(
          <ListItem button selected={ keyOriginal == keyOriginalForGraph } onClick={() => this.changeGraph( keyOriginalForGraph, title )} >
            
            <ListItemText 
              
              primary={<Typography type="body2" className={ style }>{relatorioKey.title}</Typography>}
            />
  
          </ListItem>
      )

    }else if( this.props.customColumns == undefined){

      return(
        <ListItem button onClick={() => this.changeGraph( keyOriginalForGraph, title )} >
            
        <ListItemText 
          
          primary={<Typography type="body2" className={ style }>{relatorioKey.title}</Typography>}
        />

      </ListItem>
      )

    }


  }

  render() {

    const { classes, onClose, selectedValue, ...other } = this.props;
    const tableRef = this.props.tableRef.current;
    const props = this.props

    return (
      <Dialog onClose={this.handleClose} 
        aria-labelledby="simple-dialog-title" 
        {...other} 
        maxWidth="false"
      >
          {/* <DialogTabs {...props}/> */}
        <div className={classes.divModal}>

          <div className={classes.leftSideNav}> 
          <div style={{ height: '100%', overflow: 'auto'}}>
            <List style={{position: 'relative'}}>
              {this.props.relatorioTable.relatorioKeyNames.map( relatorioKey => (

                this.renderColumnList( relatorioKey, classes.listSection)

              ))}
            </List>

          </div>

          </div>

            {this.props.open === false || this.props.pieGraph.graphType == '' || this.props.pieGraph.showChart === false ? '' : 
              // <div className={classes.grafico} >
                <PieChart tableRef={tableRef} changeGraph={this.changeGraph} teste={this.state.teste} handleTeste={this.handleTeste}/>
              // </div>
            }
          

            <div className={classes.rigthSideNav}>

              <List style={{ height: 'calc(100% - 60px)', overflow: 'auto'}}>

                <ListItem style={{textAlign: 'center'}}>

                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1" style={{
                        // letterSpacing: '1.5px',
                        color: '#222831',
                        fontWeight: 'bold',
                      }}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                          Lista de Filtros
                          <FilterList style={{marginBottom: -4}}/>
                        </div>
                      </Typography>
                    }
                    />
                  

                </ListItem>

                <Divider />

      
               { this.props.pieGraph.filterListFromTable.length === 0 &&  <Typography  align="center" variant="body2" >Nenhum filtro selecionado.</Typography>}

                { this.props.pieGraph.filterListFromTable && this.props.pieGraph.filterListFromTable.map( filter => (
                  <>
                    <ListItem>
                      <ListItemText 
                        primary={<Typography  variant="subtitle1" style={{color: '#323232'}}>{ filter.coluna  + ':'}</Typography>}
                        secondary={ <Typography variant="body1" style={{color: '#686d76', wordBreak: 'break-all'}}>{ filter.valor }</Typography>}
                      />
                      { filter.clearBtn( filter.idColuna, filter.clearTableFilter, this.changeGraph, {...other} ) }
                    </ListItem>

                    <Divider/>
                  </>
                ))}

              </List>

              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 3}}>
                <Button disabled={ this.props.pieGraph.filterListFromTable.length === 0 ? true : false}  onClick={ () => this.props.clearFilters() }> <CleanIcon/> Limpar filtro </Button>
              </div>



            </div>
          
        </div>

          {/* <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: 0, width: '100%'}}> */}

            {/* <div style={{bottom: 0, right: 0}}>

              <Button style={{margin: 10}} onClick={ () => this.props.clearFilters() }> <CleanIcon/> Limpar filtro </Button>

            </div> */}
            
          {/* </div> */}

      </Dialog>
    );
  }
}

pieChartDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const PieChartDialogWrapped = withStyles(styles)(pieChartDialog);

class pieChartDialogDemo extends React.Component {
  state = {
    open: false,
    msgError: false,
  };

  handleClickOpen = (e) => {

    if(this.props.renderBtn === false ){

      this.setState({
        msgError: true,
      });

      return;
    }

    this.setState({
      msgError: false,
    });

    let firstItemColumn = this.props.relatorioTable.relatorioKeyNames.filter( e => e.renderGraph )[0];

    if( firstItemColumn == undefined ){

      firstItemColumn = this.props.relatorioTable.relatorioKeyNames[0]

    }

    this.props.setGraphType( { keyOriginal: firstItemColumn.keyOriginalForGraph, title: firstItemColumn.title} );


    this.setState({
      open: true,
    });

  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const { classes, onClose, selectedValue, renderGraphBtn, ...other } = this.props;

    return (
      <div>

          <Button disabled={ this.props.pieGraph.filteredData.length > 0 ? false : true}  color="primary" onClick={(e) => this.handleClickOpen(e)}>
              <PieChartIcon style={{marginRight: '2px'}}/>
              Gráfico
          </Button>

          <PieChartDialogWrapped
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
            {...this.props}
          />

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setGraphType, isVisiblePieChart }, dispatch);

const mapStateToProps =  state => state ;

export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(pieChartDialogDemo));


