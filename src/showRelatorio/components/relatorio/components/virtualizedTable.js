import React from 'react';
import { Grid, AutoSizer, ScrollSync } from 'react-virtualized';
import MTableFilterRow from './mTableFilterRow';
import MTableHeader from './mTableHeader';
import TableHead from "@material-ui/core/TableHead";
import { withStyles } from '@material-ui/core/styles';
import { styles } from './style';
import InfoIcon from '@material-ui/icons/Info';

class GridBody extends React.PureComponent {

  constructor(props, context) {

    super(props, context);

    this.state = {
      columnWidth: 75,
      columnCount: 50,
      height: this.props.tableHeight || 300,
      overscanColumnCount: 0,
      overscanRowCount: 5,
      rowHeight: 40,
      rowCount: 100,
      headerHeight: 50,
      headerTitleHeight: 60,
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
    height,
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
              <div className={classes.GridRow}>
                <div className={classes.GridColumn}>
                  <AutoSizer disableHeight>
                    {({width}) => (
                      <div>
                        <TableHead
                          style={{
                            borderBottom: '1px solid rgba(224, 224, 224, 1)',
                            backgroundColor: `#fff`,
                            height: headerHeight,
                            width: width,
                            overflow: 'hidden'
                          }}>
                                    
                          <Grid
                            ref={this.headerRef}
                            style={{overflow: 'hidden'}}
                            columnWidth={this.getColumnWidth}
                            columnCount={this.props.virtualizedTableColum.length}
                            height={headerTitleHeight}
                            overscanColumnCount={overscanColumnCount}
                            cellRenderer={this._renderTitleCell}
                            rowHeight={headerTitleHeight}
                            rowCount={1}
                            scrollLeft={scrollLeft}
                            width={width}
                          />
                        </TableHead>

                        <div
                          style={{
                            backgroundColor: `#fff`,
                            height: headerHeight,
                            width: width,
                            overflow: 'hidden',
                            borderBottom: '1px solid rgba(224, 224, 224, 1)',
                          }}>
                                    
                          <Grid
                            style={{overflow: 'hidden'}}
                            className={classes.HeaderGrid}
                            columnWidth={this.getColumnWidth}
                            columnCount={this.props.virtualizedTableColum.length}
                            height={headerHeight}
                            overscanColumnCount={overscanColumnCount}
                            cellRenderer={this._renderHeaderCell}
                            rowHeight={headerHeight}
                            rowCount={1}
                            scrollLeft={scrollLeft}
                            width={width}
                          />
                        </div>
                        <div
                          style={{
                            height: height,
                            width: width,
                          }}>
                          {this.state.showTableRows && <Grid
                            className={classes.BodyGrid}
                            columnWidth={this.getColumnWidth}
                            columnCount={this.props.qtdColunas.length}
                            height={height}
                            onScroll={onScroll}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            cellRenderer={this._renderBodyCell}
                            rowHeight={rowHeight}
                            rowCount={this.props.renderData.length || 1}
                            width={width}
                          />}
                        </div>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            );
          }}
        </ScrollSync>
      </div>
    );
  }

  _renderTitleCell = ({columnIndex, key, style}) => {

    const props = this.props;
    const {classes } = props;

    return (
      <div className={classes.headerTitleCell} key={key} style={style}>
          <MTableHeader {...props} colunas={[this.props.columns[columnIndex]]} setShowTableRows={this.setShowTableRows} />
      </div>

    )

  }

  _renderHeaderCell = ({columnIndex, key, style}) => {

    let filterProps = this.props.localization;
    const { classes } = this.props;

    return (
      
      <div className={classes.headerCell} key={key} style={style}>


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

      </div>
      
    );

  }

  _renderBodyCell = ({columnIndex, key, rowIndex, style}) => {

    const { classes } = this.props

    if( this.props.renderData.length == 0 && rowIndex == 0){ //Força a tabla a manter sua largura original caso não haja registro
      return <div style={{position: 'absolute', background: '#FFF4E5', 
      width: '100%', padding: 5, margin: 5, display: 'flex', alignItems: 'center'}}> <InfoIcon style={{marginRight: 4}}/> Nenhum registro</div>

    }else if( this.props.renderData.length > 0 ){
      return (
        <div className={classes.cell} key={key} style={style}>
          {this.props.renderData[rowIndex][this.props.virtualizedTableColum[columnIndex]]}
        </div>
      );

    }

  }
}

export default withStyles(styles)(GridBody)


