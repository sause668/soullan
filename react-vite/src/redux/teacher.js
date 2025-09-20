import { csrfFetch } from "./csrf";

const SET_TEACHERS = 'class/setTeachers';
const REMOVE_TEACHERS = 'class/removeTeachers';
const SET_TEACHER = 'class/setTeacher';
const REMOVE_TEACHER = 'class/removeTeacher';

const setTeachers = (teachers) => ({
    type: SET_TEACHERS,
    teachers
});
  
const removeTeachers = () => ({
    type: REMOVE_TEACHERS
});

const setTeacher = (teacher) => ({
    type: SET_TEACHER,
    teacher
});
  
const removeTeacher = () => ({
    type: REMOVE_TEACHER
});
  

export const fetchTeachers = () => async (dispatch) => {
	const response = await csrfFetch(`/api/teachers`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setTeachers(data));
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

export const fetchSearchTeachers = (params) => async (dispatch) => {
    const { search } = params;
	const response = await csrfFetch(`/api/teachers?search=${search}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setTeachers(data));
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

export const fetchTeacher = (params) => async (dispatch) => {
    const { teacherId } = params;
	const response = await csrfFetch(`/api/teachers/${teacherId}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setTeacher(data));
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

export const removeTeachersState = () => async (dispatch) => {
    dispatch(removeTeachers());
};

export const removeTeacherState = () => async (dispatch) => {
    dispatch(removeTeacher());
};

const initialState = { 
    teachers: null,
    teacher: null
};

function teacherReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TEACHERS:
            return { ...state, teachers: action.teachers };
        case REMOVE_TEACHERS:
            return { ...state, teachers: null };
        case SET_TEACHER:
            return { ...state, teacher: action.teacher };
        case REMOVE_TEACHER:
            return { ...state, teacher: null };
        default:
            return state;
    }
}

export default teacherReducer;