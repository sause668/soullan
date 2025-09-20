import { csrfFetch } from "./csrf";

const SET_ADMINS = 'class/setAdmins';
const REMOVE_ADMINS = 'class/removeAdmins';
const SET_ADMIN = 'class/setAdmin';
const REMOVE_ADMIN = 'class/removeAdmin';

const setAdmins = (admins) => ({
    type: SET_ADMINS,
    admins
});
  
const removeAdmins = () => ({
    type: REMOVE_ADMINS
});

const setAdmin = (admin) => ({
    type: SET_ADMIN,
    admin
});
  
const removeAdmin = () => ({
    type: REMOVE_ADMIN
});
  

export const fetchAdmins = () => async (dispatch) => {
	const response = await csrfFetch(`/api/admins`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setAdmins(data));
        return data
    } else {
        const errorObj = {}
        if (response.status < 500) {
            const errorMessages = await response.json();
            errorObj.errors = errorMessages
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" }
        }
        return errorObj
    }
};

export const fetchSearchAdmins = (params) => async (dispatch) => {
    const { search } = params;
	const response = await csrfFetch(`/api/admins?search=${search}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setAdmins(data));
        return data
    } else {
        const errorObj = {}
        if (response.status < 500) {
            const errorMessages = await response.json();
            errorObj.errors = errorMessages
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" }
        }
        return errorObj
    }
};

export const fetchAdmin = (params) => async (dispatch) => {
    const { adminId } = params;
	const response = await csrfFetch(`/api/admins/${adminId}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setAdmin(data));
        return data
    } else {
        const errorObj = {}
        if (response.status < 500) {
            const errorMessages = await response.json();
            errorObj.errors = errorMessages
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" }
        }
        return errorObj
    }
};

export const removeAdminsState = () => async (dispatch) => {
    dispatch(removeAdmins());
};

export const removeAdminState = () => async (dispatch) => {
    dispatch(removeAdmin());
};

const initialState = { 
    admins: null,
    admin: null
};

function adminReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADMINS:
            return { ...state, admins: action.admins };
        case REMOVE_ADMINS:
            return { ...state, admins: null };
        case SET_ADMIN:
            return { ...state, admin: action.admin };
        case REMOVE_ADMIN:
            return { ...state, admin: null };
        default:
            return state;
    }
}

export default adminReducer;