import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";

export class MTableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastX: 0,
      resizingColumnDef: undefined,
      thirdSortClick: {
        columnId: '',
        qtdClick: 0
      }
    };
  }


  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown = (e, columnDef) => {
    this.setState({
      lastAdditionalWidth: columnDef.tableData.additionalWidth,
      lastX: e.clientX,
      resizingColumnDef: columnDef,
    });
  };

  handleMouseMove = (e) => {
    if (!this.state.resizingColumnDef) {
      return;
    }

    let additionalWidth =
      this.state.lastAdditionalWidth + e.clientX - this.state.lastX;

    additionalWidth = Math.min(
      this.state.resizingColumnDef.maxWidth || additionalWidth,
      additionalWidth
    );

    if (
      this.state.resizingColumnDef.tableData.additionalWidth !== additionalWidth
    ) {
      this.props.onColumnResized(
        this.state.resizingColumnDef.tableData.id,
        additionalWidth
      );
    }
  };

  handleMouseUp = (e) => {
    this.setState({ resizingColumnDef: undefined });
  };

  getCellStyle = (columnDef) => {
    let isDate = false;
    const tipoDate = this.props.colunas[0]['type'] == 'date';
    const tipoDateTime = this.props.colunas[0]['type'] == 'dateTime';
    const tipoTime = this.props.colunas[0]['type'] == 'time';

    if( tipoDate || tipoDateTime || tipoTime){
      isDate = true;
    }

    let obj = {
      tipoDate: tipoDate,
      tipoDateTime: tipoDateTime,
      tipoTime: tipoTime
    }

    const style = {

      margin: '0px !important',
      boxSizing: "border-box",
      textAlign: 'center',
      width: this.props.colunas[0].virtualizedWidth || '100%',
    };

    if (
      this.props.options.tableLayout === "fixed" &&
      this.props.options.columnResizable &&
      columnDef.resizable !== false
    ) {
      style.paddingRight = 2;
    }

    return style;
  };

  changeOrder = (columId, orderDirection ) => {

    this.props.headerProps.onOrderChange(
      columId,
      orderDirection
    );
    this.props.setShowTableRows(false);

    new Promise((resolve, reject) => {
      setTimeout(() => {
          this.props.setShowTableRows(true);
          resolve();
      }, 100);
  })


  }

  

  renderHeader() {

    const showIcon = ( orderBy, id ) => {

      if( orderBy == id ){
        return true;
      }

    }

    const mapArr = this.props.colunas
      .filter(
        (columnDef) =>
          !columnDef.hidden && !(columnDef.tableData.groupOrder > -1)
      )
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map((columnDef, index) => {
        let content = columnDef.title;

        if (columnDef.sorting !== false && this.props.headerProps.sorting) {
          content = (
              <TableSortLabel
                style={{
                  border: 'none',
                }}
                
                IconComponent={this.props.icons.SortArrow}
                active={showIcon( this.props.headerProps.orderBy, columnDef.tableData.id) }
                direction={this.props.headerProps.orderDirection || "asc"}
                onClick={() => {
                  const orderDirection =
                    columnDef.tableData.id !== this.props.headerProps.orderBy
                      ? "asc"
                      : this.props.headerProps.orderDirection === "asc"
                      ? "desc"
                      : this.props.headerProps.orderDirection === "desc" &&
                        this.props.headerProps.thirdSortClick
                      ? ""
                      : this.props.headerProps.orderDirection === "desc" &&
                        !this.props.headerProps.thirdSortClick
                      ? "asc"
                      : this.props.headerProps.orderDirection === ""
                      ? "asc"
                      : "desc";
                      this.changeOrder( columnDef.tableData.id, orderDirection)
                  
                }}
              >
              {content}
            </TableSortLabel>
          );
        }

        const cellAlignment =
          columnDef.align !== undefined
            ? columnDef.align
            : ["numeric", "currency"].indexOf(columnDef.type) !== -1
            ? "right"
            : "left";
        return (
          <TableCell
            style={{border: 'none', textAlign: 'center', alignContent: 'center', justifyContent: 'center', display: 'flex'}}
            key={columnDef.tableData.id}
          >
            {content}
          </TableCell>
        );
      });
    return mapArr;
  }

  renderActionsHeader() {
    const localization = {
      ...MTableHeader.defaultProps.localization,
      ...this.props.localization,
    };
    const width = 100;
    return (
      <TableCell
        key="key-actions-column"
        padding="checkbox"
        className={this.props.classes.header}
        style={{
          ...this.props.headerStyle,
          width: width,
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <TableSortLabel hideSortIcon={true} disabled>
          {localization.actions}
        </TableSortLabel>
      </TableCell>
    );
  }
  renderSelectionHeader() {

    return (
      <TableCell
        style={{border: 'none'}}
        padding="none"
        key="key-selection-column"
      >
        {this.props.showSelectAllCheckbox && (
          <Checkbox
            indeterminate={
              this.props.selectedCount > 0 &&
              this.props.selectedCount < this.props.dataCount
            }
            checked={
              this.props.dataCount > 0 &&
              this.props.selectedCount === this.props.dataCount
            }
            onChange={(event, checked) =>
              this.props.onAllSelected && this.props.onAllSelected(checked)
            }
            {...this.props.options.headerSelectionProps}
          />
        )}
      </TableCell>
    );
  }

  renderDetailPanelColumnCell() {
    return (
      <TableCell
      style={{border: 'none'}}
        padding="none"
        key="key-detail-panel-column"
      />
    );
  }

  render() {

    const headers = this.renderHeader();
    if (this.props.hasSelection) {
      headers.splice(0, 0, this.renderSelectionHeader());
    }

    if (this.props.showActionsColumn) {
      if (this.props.actionsHeaderIndex >= 0) {
        let endPos = 0;
        if (this.props.hasSelection) {
          endPos = 1;
        }
        headers.splice(
          this.props.actionsHeaderIndex + endPos,
          0,
          this.renderActionsHeader()
        );
      } else if (this.props.actionsHeaderIndex === -1) {
        headers.push(this.renderActionsHeader());
      }
    }

    if (this.props.hasDetailPanel) {
      if (this.props.detailPanelColumnAlignment === "right") {
        headers.push(this.renderDetailPanelColumnCell());
      } else {
        headers.splice(0, 0, this.renderDetailPanelColumnCell());
      }
    }

    if (this.props.isTreeData > 0) {
      headers.splice(
        0,
        0,
        <TableCell
        style={{border: 'none'}}

          padding="none"
          key={"key-tree-data-header"}
          className={this.props.classes.header}
        />
      );
    }
    this.props.colunas
      .filter((columnDef) => columnDef.tableData.groupOrder > -1)
      .forEach((columnDef) => {
        headers.splice(
          0,
          0,
          <TableCell
            style={{border: 'none'}}
            padding="checkbox"
            key={"key-group-header" + columnDef.tableData.id}
          />
        );
      });

    return (
      <div style={{width: this.props.colunas[0].virtualizedWidth || '100%', margin: 0}}>
        {headers}
      </div>
    );
  }
}

MTableHeader.defaultProps = {
  dataCount: 0,
  hasSelection: false,
  headerStyle: {},
  selectedCount: 0,
  sorting: true,
  localization: {
    actions: "Actions",
  },
  orderBy: undefined,
  orderDirection: "asc",
  actionsHeaderIndex: 0,
  detailPanelColumnAlignment: "left",
  thirdSortClick: true,
};

MTableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  dataCount: PropTypes.number,
  hasDetailPanel: PropTypes.bool.isRequired,
  detailPanelColumnAlignment: PropTypes.string,
  hasSelection: PropTypes.bool,
  headerStyle: PropTypes.object,
  localization: PropTypes.object,
  selectedCount: PropTypes.number,
  sorting: PropTypes.bool,
  onAllSelected: PropTypes.func,
  onOrderChange: PropTypes.func,
  orderBy: PropTypes.number,
  orderDirection: PropTypes.string,
  actionsHeaderIndex: PropTypes.number,
  showActionsColumn: PropTypes.bool,
  showSelectAllCheckbox: PropTypes.bool,
  thirdSortClick: PropTypes.bool,
  tooltip: PropTypes.string,
};

export const styles = (theme) => ({
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: theme.palette.background.paper, // Change according to theme,
  },
});

export default withStyles(styles, { withTheme: true })(MTableHeader);