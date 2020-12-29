import React from 'react';
import ReactDOM from 'react-dom';
import {Grid} from 'react-virtualized';

// Grid data as an array of arrays
const list = [
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125 /* ... */],
  // And so on...
];

function cellRenderer({columnIndex, key, rowIndex, style}) {
  return (
    <div key={key} style={style}>
      {list[rowIndex][columnIndex]}
    </div>
  );
}

function cellRangeRenderer({
    cellCache, // Temporary cell cache used while scrolling
    cellRenderer, // Cell renderer prop supplied to Grid
    columnSizeAndPositionManager, // @see CellSizeAndPositionManager,
    columnStartIndex, // Index of first column (inclusive) to render
    columnStopIndex, // Index of last column (inclusive) to render
    horizontalOffsetAdjustment, // Horizontal pixel offset (required for scaling)
    isScrolling, // The Grid is currently being scrolled
    rowSizeAndPositionManager, // @see CellSizeAndPositionManager,
    rowStartIndex, // Index of first row (inclusive) to render
    rowStopIndex, // Index of last row (inclusive) to render
    scrollLeft, // Current horizontal scroll offset of Grid
    scrollTop, // Current vertical scroll offset of Grid
    styleCache, // Temporary style (size & position) cache used while scrolling
    verticalOffsetAdjustment, // Vertical pixel offset (required for scaling)
  }) {
    const renderedCells = [];
  
    for (let rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
      // This contains :offset (top) and :size (height) information for the cell
      let rowDatum = rowSizeAndPositionManager.getSizeAndPositionOfCell(rowIndex);
  
      for (
        let columnIndex = columnStartIndex;
        columnIndex <= columnStopIndex;
        columnIndex++
      ) {
        // This contains :offset (left) and :size (width) information for the cell
        let columnDatum = columnSizeAndPositionManager.getSizeAndPositionOfCell(
          columnIndex,
        );
  
        // Be sure to adjust cell position in case the total set of cells is too large to be supported by the browser natively.
        // In this case, Grid will shift cells as a user scrolls to increase cell density.
        let left = columnDatum.offset + horizontalOffsetAdjustment;
        let top = rowDatum.offset + verticalOffsetAdjustment;
  
        // The rest of the information you need to render the cell are contained in the data.
        // Be sure to provide unique :key attributes.
        let key = `${rowIndex}-${columnIndex}`;
        let height = rowDatum.size;
        let width = columnDatum.size;
  
        // Now render your cell and additional UI as you see fit.
        // Add all rendered children to the :renderedCells Array.
      }
    }
  
    return renderedCells;
  }

export default function GridVirtual(){
    return(
        <Grid
            cellRenderer={cellRenderer}
            columnCount={list[0].length}
            columnWidth={100}
            height={300}
            rowCount={list.length}
            rowHeight={30}
            width={300}
        />
    )
}