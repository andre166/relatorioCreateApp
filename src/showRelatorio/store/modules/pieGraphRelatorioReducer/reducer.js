const INITIAL_STATE =  { 

    filterListFromTable: '',

    filteredData: '',

    graphType: '',

    showChart: false,

    chartOptions: {

        credits: {
            enabled: false
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',         
            width: '600',
        },
        title: {
            text: 'Chart'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                
            }
        },
        series: [{
            data: [1],
            name: 'Quantidade',
            turboThreshold:10000,
            cursor: 'pointer', 
            point: {
                events: {
                    click: '',
                },  
            },
        }],
    }
    
}

export default function reserve( state = INITIAL_STATE , action ){
    
    switch( action.type ){

        case 'SET_OPTIONS':

            let dataFormatada = [];

            action.payLoad.series[0].data.map( e => {

                if( e.name !== '' && e.name !== null && e.name !== undefined){

                    if( e.name ){
                        if( e.name.length ){
                            return dataFormatada.push(e)
                        }
                    }
                }

            })

            if( dataFormatada.length === 0){

                dataFormatada =  [{name: "Coluna Vazia", y: 1}]

            }
        
            return { ...state,
                chartOptions:{
                    ...state.chartOptions,
                        plotOptions: {
                            ...state.chartOptions.plotOptions,

                            pie: {
                                ...state.chartOptions.plotOptions.pie,

                                dataLabels: {
                                    ...state.chartOptions.plotOptions.pie.dataLabels,
                                    // enabled: true,
                                },
                                
                            }
                        },
                        title: {
                            text: action.payLoad.title.text
                        },
                        series: [{
                            ...state.chartOptions.series[0],
                            data: dataFormatada,
                            name: action.payLoad.name || 'Quantidade',
                            turboThreshold: action.payLoad.turboThreshold || 10000,
                            point: {
                                events: {
                                    click: action.payLoad.series[0].point.events.click,
                                },  
                            }
                        }]
                }
            }

        case 'SET_CLICK_EVENT':

            if(action.payLoad == undefined ){
                return state;
            }

            return { ...state,
                chartOptions:{
                    ...state.chartOptions,
                    series: [{
                        ...state.chartOptions.series[0],
                        point: {
                            events: 
                                action.payLoad
                            
                        }
                    }]
                    
                }
            }
        
        case 'SET_GRAPH_TYPE':

            return { ...state,
                graphType : action.payLoad
            }
        case 'SET_SHOW_CHART':

            return { ...state,
                showChart : action.payLoad
            }
        case 'SET_FILTERED_DATA':
        
            return { ...state,
                filteredData : action.payLoad
            }
        case 'SET_FILTERED_LIST_FROM_TABLE':
        
            return { ...state,
                filterListFromTable : action.payLoad
            }

        default:
            return state;
    }
  
  }
  
  
 