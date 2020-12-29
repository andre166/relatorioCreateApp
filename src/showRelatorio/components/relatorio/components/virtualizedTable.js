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
      heightGeral: this.props.tableHeight || 300,
      overscanColumnCount: 0,
      overscanRowCount: 5,
      rowHeight: 40,
      rowCount: 100,
      headerTitleHeight: 90,
      showTableRows: true,
    };

    this.headerRef = React.createRef();

  }

  setShowTableRows = ( value ) => {
    this.setState({
      showTableRows: value
    });
  }

  render() {
    const {
      heightGeral,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
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

                    )}
                  </AutoSizer>
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
      
    );

  }

  _renderBodyCell = ({columnIndex, key, rowIndex, style}) => {

    const { classes } = this.props

    if( this.props.renderData.length == 0 && rowIndex == 0){ //Força a tabla a manter sua largura original caso não haja registro
      return <div style={{position: 'absolute', background: '#FFF4E5', 
      width: '100%', padding: 5, margin: 5, display: 'flex', alignItems: 'center'}}> <InfoIcon style={{marginRight: 4}}/> Nenhum registro</div>

    }else if( this.props.renderData.length > 0 ){

      return (
        <TableCell className={classes.BodyCell} style={style}>
          {this.props.renderData[rowIndex][this.props.virtualizedTableColum[columnIndex]]}
        </TableCell>
      );

    }

  }
}

export default withStyles(styles)(GridBody)


