import amber from '@material-ui/core/colors/amber';

const leftSideBarWidth = 180;
const rigthSideBarWidth = 200;

const styles = theme => ({
    tabsAppbar: {
      background: '#f5f5f5',
    },
    rigthSideNav:{
      minWidth: rigthSideBarWidth,
      maxWidth: rigthSideBarWidth * 2,
      backgroundColor: '#f5f5f5',
      overflowX: 'hidden',
      height: '100%',
      position: 'relative',

    },
    leftSideNav: {
      minWidth: leftSideBarWidth,
      maxWidth: 400,
      backgroundColor: '#4b5d67',
      position: 'relative',
      overflowX: 'hidden',
      height: '100%',
    },
    rootTabs: {
      position: 'relative',
      // flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      padding: 0,
      overflowY: 'hidden',
    },
    listSection: {
      letterSpacing: '1px',
      color:'#fff !important',
    },
    grafico:{
      width: 800,
      position: 'relative',
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      height: '100%',
      overflowY: 'hidden',
    },
    divModal: {
      overflowY: 'hidden',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      height: '650px !important',
    },
    errorDiv: {
      marginTop: 5,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      maxWidth: 400,
      borderRadius: 3,
      padding: 5,
      backgroundColor: amber[700],
      color: '#fff'
    }
    
  });

  export default styles;