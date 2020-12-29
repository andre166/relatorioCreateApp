import { combineReducers } from 'redux';

import relatorioTableReducer from './relatorioTableReducer/reducer';
import pieGraphReducer from './pieGraphRelatorioReducer/reducer';
import pieGraphListReducer from './pieGraphListReducer/reducer';

export default combineReducers({
    relatorioTable: relatorioTableReducer,
    pieGraph: pieGraphReducer,
    pieGraphList: pieGraphListReducer
})