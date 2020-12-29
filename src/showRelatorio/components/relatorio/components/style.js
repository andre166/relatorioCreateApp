export const styles = {

    GridRow : {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden !important',
    },
    GridColumn : {
      overflow: 'hidden !important',
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      
    },
    LeftSideGridContainer : {
      flex: '0 0 75px',
      zIndex: 10,
    },
      
    LeftSideGrid : {
      overflow:' hidden !important',
    },
    HeaderGrid : {
      width: '100%',
      overflow: 'hidden !important',
    },
    BodyGrid : {
      width: '100%',
    },
      
    cell: {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '11pt',
    },
    
    headerTitleCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0px important',
        border: 'none',
        textAlign: 'center !important',

    },
    
    headerTitleDateCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textAlign: 'center',
    },
    
    headerCell: {
      textAlign: 'center !important',
      boxSizing: 'border-box',
    }
}
