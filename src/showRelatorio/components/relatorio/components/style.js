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
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
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
      padding: '4px 24px',
      display: 'flex',
      flexDirection: 'column',
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      height: '80px !important',
      justifyContent: 'center',
      alignItems: 'center'
    },
    BodyCell: {
      padding: '4px 24px',
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      display: 'flex',
      alignItems: 'center',
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      borderSpacing: 0,
      borderCollapse: 'collapse',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '0.8125rem',
      fontWeight: 400,
      wordBreak: 'break-word',
      justifyContent: 'center'
    },
}
