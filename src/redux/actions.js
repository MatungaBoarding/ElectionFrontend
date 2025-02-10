
export const ADD_COND_TO_LOG = "ADD_COND_TO_LOG";
export const SET_FIELD = "SET_FIELD";

export const setField = update => ({
    type : SET_FIELD,
    payload : update
})

export const add_cond_to_log = update => ({
    type : ADD_COND_TO_LOG,
    payload : update
})