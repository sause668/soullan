import { csrfFetch } from "./csrf";

const SET_STUDENTS = 'class/setStudents';
const REMOVE_STUDENTS = 'class/removeStudents';
const SET_STUDENT = 'class/setStudent';
const REMOVE_STUDENT = 'class/removeStudent';

const setStudents = (students) => ({
    type: SET_STUDENTS,
    students
});
  
const removeStudents = () => ({
    type: REMOVE_STUDENTS
});

const setStudent = (student) => ({
    type: SET_STUDENT,
    student
});
  
const removeStudent = () => ({
    type: REMOVE_STUDENT
});
  

export const fetchStudents = () => async (dispatch) => {
	const response = await csrfFetch(`/api/students`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setStudents(data));
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

export const fetchSearchStudents = (params) => async (dispatch) => {
    const { search } = params;
	const response = await csrfFetch(`/api/students?search=${search}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setStudents(data));
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

export const fetchStudent = (params) => async (dispatch) => {
    const { studentId } = params;
	const response = await csrfFetch(`/api/students/${studentId}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setStudent(data));
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

export const removeStudentsState = () => async (dispatch) => {
    dispatch(removeStudents());
};

export const removeStudentState = () => async (dispatch) => {
    dispatch(removeStudent());
};

const initialState = { 
    students: null,
    student: null
};

function studentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STUDENTS:
            return { ...state, students: action.students };
        case REMOVE_STUDENTS:
            return { ...state, students: null };
        case SET_STUDENT:
            return { ...state, student: action.student };
        case REMOVE_STUDENT:
            return { ...state, student: null };
        default:
            return state;
    }
}

export default studentReducer;