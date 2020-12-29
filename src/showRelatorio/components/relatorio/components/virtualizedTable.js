import React from 'react';
import { Grid, AutoSizer, ScrollSync, ColumnSizer } from 'react-virtualized';
import MTableFilterRow from './mTableFilterRow';
import MTableHeader from './mTableHeader';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './style';
import InfoIcon from '@material-ui/icons/Info';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class GridBody extends React.PureComponent {

  constructor(props, context) {

    super(props, context);

    this.state = {
      columnWidth: 75,
      columnCount: 50,
      heightGeral: this.props.tableHeight || 240,
      overscanColumnCount: 0,
      overscanRowCount: 5,
      rowHeight: 40,
      rowCount: 100,
      headerHeight: 50,
      headerTitleHeight: 90,
      showTableRows: true,
      larguraDaTabela: ''
    };

    this.headerRef = React.createRef();

  }

  componentDidMount(){

    if( this.headerRef.current ){

      this.setState({
        larguraDaTabela: this.headerRef.current.props.width
      });
      
    }

  }

  setShowTableRows = ( value ) => {
    this.setState({
      showTableRows: value
    });
  }

    getColumnWidth = ({index}) => {

        const largura = this.props.larguraVirtualizedTableColum;

        let larguraFinal = [];

        largura.map( (larg, i) => {

        if( i == largura.length -1){

          larguraFinal.push(larg + 40 );


        }else if( i == index){

            larguraFinal.push(larg );
        }

        })

        return larguraFinal[0];
    
    }

  render() {
    const {
      columnCount,
      columnWidth,
      heightGeral,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
      headerHeight,
      headerTitleHeight
    } = this.state;
    const { classes } = this.props

    return (
      <div style={{padding: 10}}>

        <ScrollSync>
          {({
            clientHeight,
            clientWidth,
            onScroll,
            scrollHeight,
            scrollLeft,
            scrollTop,
            scrollWidth,
          }) => {
            const x = scrollLeft / (scrollWidth - clientWidth);
            const y = scrollTop / (scrollHeight - clientHeight);

            return (
              // <div className={classes.GridRow}>
                <div style={{width: '100%'}}>
                  <AutoSizer disableHeight>
                    {({width, height}) => (
                            <ColumnSizer
                                columnMaxWidth={950}
                                columnMinWidth={150}
                                columnCount={this.props.virtualizedTableColum.length}
                                width={width * this.props.virtualWidth}
                                height={height}
                                >
                                  
                                {({adjustedWidth, getColumnWidth, registerChild}) => (
                                   <Table style={{height: height}}>
                                      <TableHead style={{height: height}}>
                                        <TableRow style={{height: height}}>
                                          <Grid
                                            ref={registerChild}
                                            style={{overflow: 'hidden'}}
                                            columnWidth={getColumnWidth}
                                            columnCount={this.props.virtualizedTableColum.length}
                                            height={headerTitleHeight}
                                            overscanColumnCount={overscanColumnCount}
                                            cellRenderer={this._renderTitleCell}
                                            rowHeight={headerTitleHeight}
                                            rowCount={1}
                                            scrollLeft={scrollLeft}
                                            width={width}
                                          />
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        <TableRow>
                                          {this.state.showTableRows && 
                                            <Grid
                                              ref={registerChild}
                                              columnWidth={getColumnWidth}
                                              columnCount={this.props.qtdColunas.length}
                                              height={heightGeral}
                                              onScroll={onScroll}
                                              overscanColumnCount={overscanColumnCount}
                                              overscanRowCount={overscanRowCount}
                                              cellRenderer={this._renderBodyCell}
                                              rowHeight={rowHeight}
                                              rowCount={this.props.renderData.length || 1}
                                              width={width}
                                            />
                                          } 
                                        </TableRow> 
                                      </TableBody>


                                      
                                    </Table>

                                )}
                              </ColumnSizer>

                        // <TableHead>
                        //   <TableRow>
                                      
                        //     <Grid
                        //       style={{overflow: 'hidden'}}
                        //       className={classes.HeaderGrid}
                        //       columnWidth={this.getColumnWidth}
                        //       columnCount={this.props.virtualizedTableColum.length}
                        //       height={headerHeight}
                        //       overscanColumnCount={overscanColumnCount}
                        //       cellRenderer={this._renderHeaderCell}
                        //       rowHeight={headerHeight}
                        //       rowCount={1}
                        //       scrollLeft={scrollLeft}
                        //       width={width}
                        //     />
                        //   </TableRow>
                        // </TableHead> 

                        // <div
                        //   style={{
                        //     height: heightGeral,
                        //     width: width,
                        //   }}>
                        //   {this.state.showTableRows && <Grid
                        //     className={classes.BodyGrid}
                        //     columnWidth={this.getColumnWidth}
                        //     columnCount={this.props.qtdColunas.length}
                        //     height={heightGeral}
                        //     onScroll={onScroll}
                        //     overscanColumnCount={overscanColumnCount}
                        //     overscanRowCount={overscanRowCount}
                        //     cellRenderer={this._renderBodyCell}
                        //     rowHeight={rowHeight}
                        //     rowCount={this.props.renderData.length || 1}
                        //     width={width}
                        //   />}
                        // </div>

                    )}
                  </AutoSizer>
              </div>
              // </div>
            );
          }}
        </ScrollSync>
      </div>
    );
  }

  _renderTitleCell = ({columnIndex, key, style}) => {

    const props = this.props;
    const {classes } = props;
    let filterProps = this.props.localization;

    return (
      <div className={classes.headerCell} style={style} key={key}>
    
            <MTableFilterRow
            sortingLabel={<MTableHeader {...props} colunas={[this.props.columns[columnIndex]]} setShowTableRows={this.setShowTableRows} />}
            columns={[this.props.columns[columnIndex]]}
            icons={this.props.icons}
            hasActions={
            this.props.actions.filter(
                (a) => a.position === "row" || typeof a === "function"
            ).length > 0
            }
            actionsColumnIndex={this.props.options.actionsColumnIndex}
            onFilterChanged={this.props.onFilterChanged}
            selection={this.props.options.selection}
            localization={{
              ...filterProps,
            ...this.props.localization.filterRow,
            dateTimePickerLocalization: this.props.localization
                .dateTimePickerLocalization,
            }}
            hasDetailPanel={!!this.props.detailPanel}
            detailPanelColumnAlignment={
            this.props.options.detailPanelColumnAlignment
            }
            isTreeData={this.props.isTreeData}
            filterCellStyle={this.props.options.filterCellStyle}
            filterRowStyle={this.props.options.filterRowStyle}
            hideFilterIcons={this.props.options.hideFilterIcons}
            scrollWidth={this.props.scrollWidth}
          />

        </div>
    )

  }

  _renderHeaderCell = ({columnIndex, key, style}) => {

    let filterProps = this.props.localization;
    const { classes } = this.props;

    return (
      
      // <div className={classes.headerCell} key={key} style={style}>

        <MTableFilterRow
          columns={[this.props.columns[columnIndex]]}
          icons={this.props.icons}
          hasActions={
          this.props.actions.filter(
              (a) => a.position === "row" || typeof a === "function"
          ).length > 0
          }
          actionsColumnIndex={this.props.options.actionsColumnIndex}
          onFilterChanged={this.props.onFilterChanged}
          selection={this.props.options.selection}
          localization={{
            ...filterProps,
          ...this.props.localization.filterRow,
          dateTimePickerLocalization: this.props.localization
              .dateTimePickerLocalization,
          }}
          hasDetailPanel={!!this.props.detailPanel}
          detailPanelColumnAlignment={
          this.props.options.detailPanelColumnAlignment
          }
          isTreeData={this.props.isTreeData}
          filterCellStyle={this.props.options.filterCellStyle}
          filterRowStyle={this.props.options.filterRowStyle}
          hideFilterIcons={this.props.options.hideFilterIcons}
          scrollWidth={this.props.scrollWidth}
        />

      // </div>
      
    );

  }

  _renderBodyCell = ({columnIndex, key, rowIndex, style}) => {

    const { classes } = this.props

    if( this.props.renderData.length == 0 && rowIndex == 0){ //Força a tabla a manter sua largura original caso não haja registro
      return <div style={{position: 'absolute', background: '#FFF4E5', 
      width: '100%', padding: 5, margin: 5, display: 'flex', alignItems: 'center'}}> <InfoIcon style={{marginRight: 4}}/> Nenhum registro</div>

    }else if( this.props.renderData.length > 0 ){

      return (

        // <TableCell align="right" className={classes.cell} key={key} style={style}>
        <TableCell className={classes.BodyCell} style={style}>
          {this.props.renderData[rowIndex][this.props.virtualizedTableColum[columnIndex]]}
        </TableCell>
      );

    }

  }
}

export default withStyles(styles)(GridBody)


