export function setOptions( e ){
    return {
        type: 'SET_OPTIONS',
        payLoad: e
    }
}

export function setGraphType( e ){

    return {
        type: 'SET_GRAPH_TYPE',
        payLoad: e
    }
}

export function isVisiblePieChart( e ){

    return {
        type: 'SET_SHOW_CHART',
        payLoad: e
    }
}

export function setFilteredData( e ){

    return {
        type: 'SET_FILTERED_DATA',
        payLoad: e
    }
}

export function filterListFromTable( e ){

    return {
        type: 'SET_FILTERED_LIST_FROM_TABLE',
        payLoad: e
    }
}

export function setClickEvent( e ){

    return {
        type: 'SET_CLICK_EVENT',
        payLoad: e
    }
}

