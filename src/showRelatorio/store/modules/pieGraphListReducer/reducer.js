const INITIAL_STATE =  { 

    list: '',
    
}

export default function reserve( state = INITIAL_STATE , action ){
    
    switch( action.type ){
        
        case 'SET_LIST':

            return { ...state,
                list : action.payLoad
            }

        default:
            return state;
    }
  
  }
  
  
 