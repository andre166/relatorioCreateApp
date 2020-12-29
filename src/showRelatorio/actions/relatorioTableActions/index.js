export function generateError( e ){
    return {
        type: 'HAS_ERROR',
        payLoad: e
    }
}

export function showTable( e ){
    
    return {
        type: 'SHOW_TABLE',
        payLoad: e
    }
}

export function generateRelatorioKeyNames( e ){
   
    return {
        type: 'RELATORIO_KEY_NAMES',
        payLoad: e
    }
}

export function generateRelatorioFiltro( e ){
   
    return {
        type: 'RELATORIO_FILTROS',
        payLoad: e
    }
}

export function generateColumForVirtulizedTable( e ){
   
    return {
        type: 'VIRTUALIZED_TABLE_COLUMNS',
        payLoad: e
    }
}
