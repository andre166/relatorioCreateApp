import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { withStyles } from '@material-ui/core/styles';
// ======== REDUX
import { connect } from 'react-redux';
import { setOptions } from '../../actions/pieGraphActions';
import { setList } from '../../actions/pieGraphList';
import { bindActionCreators } from 'redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

window.Highcharts = Highcharts;

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

let chartData = [];

class RenderPizzaChart extends Component {

    constructor( props ){
        
        super( props );

        this.pieRef = React.createRef();

        this.state ={
            renderGraph: true,
            dataList: 0,
            legendQtd: 0,
            formList: [],
            dataTeste: [],
        }

    }

    onChangeGraph = async ( ) => {

        await this.setState({
            renderGraph: false,
        })

        this.setState({
            renderGraph: true,
        })

    };

    filterParam = ( lista, objRelatorio ) => {

        var  objeto = objRelatorio;
        var especialChar = '';
        
        if( typeof objeto === 'string'){
            
            especialChar = objeto.trim().toLowerCase()
            especialChar = especialChar.replace(/[áàãâä]/g, 'a')
            .replace(/[éèêë]/g, 'e')
            .replace(/[íìîï]/g, 'i')
            .replace(/[óòõôö]/g, 'o')
            .replace(/[úùûü]/g, 'u')
            .replace(/[ç]/g, 'c')
        }else{
            especialChar =  objeto
        }

        let varItem = null;
        let index = null;

        lista.map((info, i) => { 
    
            if(info.objRelatorio == especialChar){

                index = i;
                varItem = info.objRelatorio;
        
            }
            
        })
        
        if (varItem == null){
            lista.push({objRelatorio:especialChar, quantidade: 1, realColumnName: objeto});
        }else{
           
            lista[index].quantidade++;
        }
    
    }

    pieGraphClickEvent = async (e) =>{

        let columnList = this.props.relatorioTable.relatorioKeyNames;
        let valueForFilter = e.point.name;
        const { keyOriginal, title } = this.props.pieGraph.graphType;
        let tableRef = this.props.tableRef;
        let columnId = '';

        let filterList = this.props.pieGraph.filterListFromTable;

        let addOnFilter = true;
        let isLookUp = false;

        filterList.map( e => { //Verifica se há valor no filtro se tiver irá remover ao clicar

            if(valueForFilter == e.valor){
                addOnFilter = false;
            }

        })

        columnList.map( column => { // pega o id da coluna e verifica se é uma coluna lookup( select com checkbox)

            if( column.field == keyOriginal ){

                columnId = column.tableData.id;

                if( column['lookup'] ){
                    isLookUp = true;
                }

            }

        })

        if( addOnFilter ){
            
            if( isLookUp ){
                
                await tableRef.onFilterChange( columnId, [valueForFilter] );
                
            }else{
                await tableRef.onFilterChange( columnId, valueForFilter );
            }
            
            
        }else{
            await tableRef.onFilterChange( columnId, '');
        }

        this.props.changeGraph( keyOriginal, title );

    }

    gerarGraph = ( ) => {

        this.state.legendQtd = 0; 

        let list = [];
        let formatedList = [];

        let dataFormatada = [];
        
        const relatorioParaGerarGrafico = this.props.pieGraph.filteredData || this.props.relatorioTable.relatorioFiltro;

        relatorioParaGerarGrafico.map( objRelatorio => {

            this.filterParam( list, objRelatorio[this.props.pieGraph.graphType.keyOriginal] )        
            
        });

        list.map((info) => {

            formatedList.push({ 

                name:info.realColumnName, 
                y: info.quantidade 

            }) 

        })

        formatedList.map( e => {

            if( e.name !== '' && e.name !== null && e.name !== undefined){
    
                if( e.name ){
                    if( e.name.length ){
                        return dataFormatada.push(e)
                    }
                }
            }

        })

        let chartOptions = {

            credits: {
                enabled: false
            },
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',         
                width: '600',
                height: 400
            },
            title: {
                text: this.props.pieGraph.graphType.title
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    
                }
            },
            series: [{
                data: dataFormatada,
                point: {
                    events: {
                        click:(e) => this.pieGraphClickEvent(e)
                    },  
                },
                name: 'Quantidade',
                turboThreshold:10000,
                cursor: 'pointer', 
            }],
        } 

        return chartOptions;

    }

    render(){

        return(

                <div style={{height: '100%', minHeight: 650,display: 'flex', overflow: 'hiden', flexDirection: 'column', alignItems: 'center', width: '100%', minWidth: 800}}>

                        <HighchartsReact highcharts={Highcharts} options={this.gerarGraph()} ref={el => {

                            if( el && this.props.pieGraphList.list.length !== el.chart.series[0].data.length ){
                                this.props.setList(el.chart.series[0].data);
                            }

                        }}/>
                    <div style={{width: '90%' }}>
                        <Divider  style={{marginBottom: 5 }} />
                    </div>

                        <List dense style={{width: '90%', height: 200, overflow: 'auto'}}>

                            { this.props.pieGraphList.list !== '' && 
                                
                                this.props.pieGraphList.list.map( ( e, i ) => {

                                    this.state.legendQtd += e.y;

                                return(

                                    <>

                                        <ListItem style={{background: i % 2 !== 0 && '#eeeeee46'}}>
                                            <Avatar style={{width: 20, height: 20, marginRight: 5, background: e.color}}>
                                                <span></span>
                                            </Avatar>
                                            <ListItemText primary={e.name} />

                                            <ListItemSecondaryAction>
                                                <ListItemText primary={e.y} />
                                            </ListItemSecondaryAction>
                                        </ListItem>

                                    </>
                                )

                            })}

                        </List>
                    

                    <div style={{width: '90%', display: 'flex', alignItems: 'flex-start', marginTop: -4}}>
                        <ListItem>
                            <ListItemText primary={"Total: " + this.state.legendQtd} />
                        </ListItem>

                    </div>

                </div>

        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setOptions, setList }, dispatch)

const mapStateToProps =  state => state ;

export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(RenderPizzaChart))