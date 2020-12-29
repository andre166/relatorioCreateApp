
const INITIAL_STATE =  { 

    isVisibleTable: false, 
    showError: false, 
    relatorioFiltro: '', 
    relatorioKeyNames: '', 
    keyForTableHead: '',
    virtualizedTableColum: '',
    larguraVirtualizedTableColum: '',

}

export default function reserve( state = INITIAL_STATE , action ){

    switch( action.type ){

        case 'HAS_ERROR':
            return { ...state, showError: action.payLoad }

        case 'SHOW_TABLE':
            return { ...state, isVisibleTable: action.payLoad}

        case 'RELATORIO_KEY_NAMES':
            return { ...state, relatorioKeyNames: action.payLoad}

        case 'RELATORIO_FILTROS':
            return { ...state, relatorioFiltro: action.payLoad}

        case 'VIRTUALIZED_TABLE_COLUMNS':

            return { ...state, 
                virtualizedTableColum: action.payLoad.coluna,
                larguraVirtualizedTableColum: action.payLoad.largura
            }
            
        default:
            return state;
    }

    return [];
  
  }

 