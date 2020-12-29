import React, { Component } from 'react';
import { styles } from './relatorioStyles';
// ======== Material table ========= //
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import MTableBody from './components/mtableBody';
import tableIcons from './tableIcons';
import { withStyles } from '@material-ui/core/styles';
import PieChartDialog from '../pieGraph/pieChartDialog';
import Paper from '@material-ui/core/Paper';
// ======== REDUX ========= //
import { connect } from 'react-redux';
import { 
    showTable, 
    generateError, 
    generateRelatorioKeyNames, 
    generateRelatorioFiltro,
    generateColumForVirtulizedTable
} from '../../actions/relatorioTableActions';
import CleanIcon from '../../utils/CleanIcon';
import { setFilteredData, filterListFromTable, setGraphType, setClickEvent} from '../../actions/pieGraphActions';
import { bindActionCreators } from 'redux';
//======================= utils ======= //
import { format } from 'date-fns';
import isValid from 'date-fns/isValid'
import { formatRelatorio, generateDateFilterCustom } from './formatarRelatorio';
import Clear from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const clearBtn = ( idColuna, fnClearFiltro, fnChangeGraph, props ) => {

    async function clearFilter() {

        const {  keyOriginal, title } = props.pieGraph.graphType;

        if( idColuna == 'Global Filter'){
            await fnClearFiltro('')
        }else{
            await fnClearFiltro(idColuna, '')

            fnChangeGraph(  keyOriginal, title );

        }

    }

    return (
        <IconButton size="small" aria-label="Delete" onClick={() => clearFilter()}>
            <Clear fontSize="small"/>
        </IconButton>
    )
}

class BasicFiltering extends Component{

    constructor( props ){
        
        super( props );

        this.state = { 
            renderBtn: true,
            pageSize: 10,
            pageSizeOptions: [10,20,30]
        }
        
        this.tableRef = React.createRef();
        this.headerTableRef = React.createRef();

    }
    

    generateDate = ( props = this.props ) => {

        let relaKey = [];

        if( !props.relatorio ){

            this.props.generateError(true);
            return;

        }
        
        if( props.customColumns ){

            let colunasParaFormatar = [];
            let colunas = [];
            let larguraParaColunasVirtualizedTable = [];
            let arr = [];

            this.props.customColumns.map( coluna => { 
                arr.push(coluna.field);
            });

            props.customColumns.map( coluna => {
                
                if( coluna['type'] == 'date' || coluna['type'] == 'datetime'){ // cria um array com as colunas de datas para serem formatadas em dd/MM/yyyy
                    
                    generateDateFilterCustom( colunasParaFormatar, coluna );

                }

                let graphKey = { keyOriginalForGraph: coluna.field };

                relaKey.push( Object.assign( coluna, graphKey ) );

                if( coluna.virtualizedWidth ){
                    larguraParaColunasVirtualizedTable.push( coluna.virtualizedWidth);
                }else{
                    Object.assign( coluna, {virtualizedWidth: 300 } )
                    larguraParaColunasVirtualizedTable.push(coluna.virtualizedWidth)
                }


                colunas.push(coluna.field);

            });

            this.props.generateColumForVirtulizedTable({coluna: arr, largura: larguraParaColunasVirtualizedTable});

            formatRelatorio( props.relatorio, colunasParaFormatar, colunas );

            this.renderRelatorio( relaKey, props.relatorio);
            
        }else if( !props.customColumns ){ // cria um array com as keys do obj relatório, 

            Object.keys( props.relatorio[0] ).forEach(key => {

                let formatKey = key.trim().replace(/_/g, ' ')
                formatKey = formatKey.substring( 0, 1 ).toUpperCase() + formatKey.substring( 1 )
        
                if( key !== 'tableData'){
                    relaKey.push({ 
                        title: formatKey, 
                        field: key, 
                        type: typeof props.relatorio[0][key],
                        keyOriginalForGraph: key,
                        
                    })
                }
        
            });


            this.renderRelatorio( relaKey, props.relatorio);
            
        }
        
    }
    
    
    renderRelatorio( relaKey, relatorio){

        this.props.generateError( false );
        this.props.showTable( true );
        this.props.generateRelatorioKeyNames( relaKey );
        this.props.generateRelatorioFiltro( relatorio );

    }

    componentDidMount(){
        
        this.generateDate( this.props );
        if( this.props.relatorio.length <= 10){

            this.setState({
                pageSize: this.props.relatorio.length,
                pageSizeOptions: [],
            })

        }else if( this.props.relatorio.length > 10 && this.props.relatorio.length < 50){

            this.setState({
                pageSizeOptions: [10, 20, 50],
            })

        }else if( this.props.relatorio.length >= 50 && this.props.relatorio.length <= 300){

            this.setState({
                pageSizeOptions: [10, 20, 50],
            })

        }else if( this.props.relatorio.length > 300 && this.props.relatorio.length < 1000){
            this.setState({
                pageSizeOptions: [10, 50, 100],
            })
        }else if( this.props.relatorio.length >= 1000 ){

            this.setState({
                pageSize: 50,
                pageSizeOptions: [10, 50, 100],
            })
        }

    }

    generateInputReforGraph(){
    
        const relatorioKey = this.props.relatorioKeyNames
        let inputList = []

        if(this.tableRef.current){
            
            if( this.tableRef.current.dataManager.filteredData.length == 0 && this.state.renderBtn){

                this.setState({renderBtn: false})

            }else if( this.tableRef.current.dataManager.filteredData.length > 0 && !this.state.renderBtn ){
                this.setState({renderBtn: true})

            }


            var inputRef = this.tableRef.current.dataManager.columns;
            var searchText = this.tableRef.current.dataManager.searchText;
            var refOnfilterChange = this.tableRef.current.onFilterChange;
            var refOnSearchChange = this.tableRef.current.onSearchChange

            for (let indice = 0; indice < inputRef.length; indice++) {

                if( inputRef[indice].tableData.filterValue !== undefined && inputRef[indice].tableData.filterValue !== ''){

                    let columnName = relatorioKey[indice].title;
                    let columnValor = inputRef[indice].tableData.filterValue;
                    let columnId = inputRef[indice].tableData.id;

                    

                    if( Array.isArray( columnValor ) ){
                        
                        columnValor = columnValor.map( column => {
                            return column;
                        })

                        columnValor = columnValor.join(',');

                    }


                    if( columnValor !== null){
                        if( columnValor.length !== 0){

                            if( isValid( columnValor ) ){
                                columnValor = format(columnValor, 'dd/MM/yyyy')
                            }

                            inputList.push( { coluna: columnName , valor: columnValor, clearBtn: clearBtn, idColuna: columnId, clearTableFilter: refOnfilterChange } )  
                        }
                    }   
                    
                }
                
                
            }
            
            if( searchText.length > 0 ){
                inputList[inputList.length] = { coluna: 'Filtro global' , valor: searchText, clearBtn: clearBtn, idColuna: 'Global Filter', clearTableFilter: refOnSearchChange };
            }

            this.props.filterListFromTable(inputList);
            
        }
    
    }

    clearFilters = () => {

        let inputsRef = this.tableRef.current.dataManager.columns;
        let ref = this.tableRef.current;
    
        for (let indice = 0; indice < inputsRef.length; indice++) {
            
            ref.onFilterChange( inputsRef[indice].tableData.id, '' )
    
        }
    
        ref.dataManager.searchText = '';
    
    }

    render(){
        
        const { classes, ...other } = this.props;
        const referencia = this.tableRef;
        let headerProps = '';

        let tWidth = '';
        let tHeight = '';

        if( this.props.TableDimension ){
            tWidth = this.props.TableDimension.tWidth;
            tHeight = this.props.TableDimension.tHeight;
        }

        if( !tWidth ){
            tWidth = '100%'
        }

        if( !tHeight ){
            tHeight = 800
        }

        return (
            <div style={{width: tWidth, height: '100%'}}>

                { this.props.showError === false ? '' : 
                    <span className={classes.warning}>
                        <WarningIcon className={classes.iconVariant}/>
                        Erro - relatorio vazio, Entre em contato com o administrador do sistema.
                    </span>
                
                }
                
                {this.props.isVisibleTable === true && this.props.showError === false? 
                    <MaterialTable  
                        style={{height: '100%'}}
                        tableRef={this.tableRef}
                        icons={tableIcons}
                        title={
                            <div className={classes.divBtnsTitle} >

                                <PieChartDialog 
                                    relatorioKeyNames={this.props.relatorioKeyNames}
                                    customColumns={this.props.customColumns}
                                    relatorioFiltro={this.props.relatorioFiltro}  
                                    renderBtn={this.state.renderBtn}
                                    renderGraphBtn={this.props.renderGraphBtn}
                                    tableRef={referencia}
                                    clearFilters={this.clearFilters}
                                /> 
                                <Button 
                                    color="secondary" 
                                    style={{marginLeft: 5}}
                                    onClick={this.clearFilters}
                                >
                                    
                                    <CleanIcon style={{marginRight: 2}}/>
                                    Limpar filtros
                                </Button>

                           </div>
                        }
                        
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir'
                            },
                            toolbar: {
                              searchTooltip: 'Pesquisar'
                            },
                            pagination: {
                              labelRowsSelect: 'linhas',
                              labelDisplayedRows: ' {from}-{to} de {count}',
                              firstTooltip: 'Primeira página',
                              previousTooltip: 'Página anterior',
                              nextTooltip: 'Próxima página',
                              lastTooltip: 'Última página'
                            },
                            
                          }}
                        columns={this.props.relatorioKeyNames}
                        data={this.props.relatorioFiltro}    
                        options={{
                            emptyRowsWhenPaging: false,
                            pageSize: this.state.pageSize,
                            pageSizeOptions: this.state.pageSizeOptions,
                            filtering: true,
                            paging: false,
                            draggable: false,
                            toolbar: true,
                            headerStyle: {
                                textAlign: 'center',
                                position: 'sticky', top: 0
                            },
                            maxBodyHeight: tHeight,
                        }}
                        
                        components={{
                            Body: (props) => {

                                const myRenderData = props.renderData;  

                                if(this.tableRef.current){

                                    if( this.tableRef.current.dataManager.searchText.length > 0){
                                        this.props.setFilteredData(this.tableRef.current.dataManager.searchedData)
                                    }else{

                                        this.props.setFilteredData( this.tableRef.current.dataManager.filteredData )
                                    }
               
                                }                       

                                this.generateInputReforGraph();

                                return (
                                    <>
                                        {this.tableRef.current && headerProps !== '' && 
                                            <MTableBody 
                                                style={{height: '100%'}}
                                                {...props} 
                                                tableHeight={this.props.tableHeight}
                                                tableRef={this.tableRef.current}
                                                renderData={myRenderData} 
                                                virtualizedTableColum={this.props.virtualizedTableColum}
                                                larguraVirtualizedTableColum={this.props.larguraVirtualizedTableColum}
                                                headerProps={headerProps}
                                            />
                                        }
                                    </>
                                )
                            },
                            //Pega as props do component Header para injetar no body
                            Header: (props) => {

                                headerProps = props;

                                return(
                                    ''
                                )
                            },

                            Container: props => <Paper {...props} elevation={0}/>
                            
                        }}
                        
                    
                    />
                
                : '' }

            </div>

        )
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({ 
    generateError, showTable, generateRelatorioKeyNames, generateRelatorioFiltro,
    setFilteredData, filterListFromTable, setGraphType, setClickEvent, generateColumForVirtulizedTable
}, dispatch)

const mapStateToProps =  state => {
    
    return state.relatorioTable;

};

export default connect( mapStateToProps, mapDispatchToProps)(withStyles(styles)(BasicFiltering))
