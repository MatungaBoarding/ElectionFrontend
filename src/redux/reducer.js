import { combineReducers } from 'redux';
import { ADD_COND_TO_LOG, SET_FIELD } from './actions';

const logState = {
    log_data: {},
}

const formState = {}

const LogReducer = (state=logState, action) => {
    switch(action.type){
        case ADD_COND_TO_LOG:
            return ({...state, log_data: action.payload})
        default:
            return state
    }
}

const FormReducer = (state=formState, action) => {
    switch(action.type){
        case SET_FIELD:
            return ({...state, [action.payload[0]]: action.payload[1]})
        default:
            return state
    }
}

const reducer = {
    log: LogReducer,
};

export default reducer