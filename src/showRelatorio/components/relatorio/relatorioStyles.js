import amber from '@material-ui/core/colors/amber';

export const styles = theme => ({

    warning: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: 400,
        borderRadius: 3,
        padding: 15,
        backgroundColor: amber[700],
        color: '#fff'
    },
    iconVariant: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    btnGraphDiv:{
        padding: '15px', 
        marginTop: '-60px',
    },
    divBtnsTitle: {
        display: 'flex',
        alignItems: 'center',
        flexDirections: 'row',
    }
  });