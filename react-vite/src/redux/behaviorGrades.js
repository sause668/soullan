import { csrfFetch } from "./csrf";

const SET_BEHAVIOR_GRADES = 'behaviorGrades/setBehaviorGrades';
const SET_BEHAVIOR_GRADE = 'behaviorGrades/setBehaviorGrade';
const REMOVE_BEHAVIOR_GRADES = 'behaviorGrades/removeBehaviorGrades';
const UPDATE_BEHAVIOR_GRADE = 'behaviorGrades/updateBehaviorGrade';

const setBehaviorGrades = (behaviorGrades) => ({
    type: SET_BEHAVIOR_GRADES,
    behaviorGrades
});

const setBehaviorGrade = (behaviorGrade) => ({
    type: SET_BEHAVIOR_GRADE,
    behaviorGrade
});

const removeBehaviorGrades = () => ({
    type: REMOVE_BEHAVIOR_GRADES
});

const updateBehaviorGrade = (behaviorGrade) => ({
    type: UPDATE_BEHAVIOR_GRADE,
    behaviorGrade
});

// Fetch all behavior grades for a class and quarter
export const fetchClassBehaviorGrades = (params) => async (dispatch) => {
    const { classId, quarter } = params;
    const response = await csrfFetch(`/api/behavior-grades/classes/${classId}/quarter/${quarter}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setBehaviorGrades(data.behavior_grades));
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

// Fetch behavior grades for a specific student
export const fetchStudentBehaviorGrades = (params) => async (dispatch) => {
    const { studentId, classId, quarter } = params;
    const response = await csrfFetch(`/api/behavior-grades/students/${studentId}/classes/${classId}/quarter/${quarter}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setBehaviorGrade(data));
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

// Create behavior grades for a student
export const createBehaviorGrades = (params) => async (dispatch) => {
    const { studentId, classId, quarter, attention, learning_speed, cooperation } = params;
    const response = await csrfFetch(`/api/behavior-grades/students/${studentId}/classes/${classId}/quarter/${quarter}`, {
        method: 'POST',
        body: JSON.stringify({
            attention,
            learning_speed,
            cooperation,
            quarter
        })
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setBehaviorGrade(data));
        return data;
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

// Update behavior grades for a student
export const updateBehaviorGrades = (params) => async (dispatch) => {
    const { studentId, classId, quarter, attention, learning_speed, cooperation } = params;
    const response = await csrfFetch(`/api/behavior-grades/students/${studentId}/classes/${classId}/quarter/${quarter}`, {
        method: 'PUT',
        body: JSON.stringify({
            attention,
            learning_speed,
            cooperation
        })
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(updateBehaviorGrade(data));
        return data;
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

// Delete behavior grades
export const deleteBehaviorGrades = (behaviorGradeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/behavior-grades/${behaviorGradeId}`, {
        method: 'DELETE'
    });
    
    if (response.ok) {
        dispatch(removeBehaviorGrades());
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

const initialState = {
    behaviorGrades: [],
    currentBehaviorGrade: null
};

const behaviorGradesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_BEHAVIOR_GRADES:
            newState = { ...state };
            newState.behaviorGrades = action.behaviorGrades;
            return newState;
        case SET_BEHAVIOR_GRADE:
            newState = { ...state };
            newState.currentBehaviorGrade = action.behaviorGrade;
            return newState;
        case UPDATE_BEHAVIOR_GRADE:
            newState = { ...state };
            if (newState.currentBehaviorGrade && newState.currentBehaviorGrade.id === action.behaviorGrade.id) {
                newState.currentBehaviorGrade = action.behaviorGrade;
            }
            // Also update in the behaviorGrades array if it exists
            newState.behaviorGrades = newState.behaviorGrades.map(grade => 
                grade.id === action.behaviorGrade.id ? action.behaviorGrade : grade
            );
            return newState;
        case REMOVE_BEHAVIOR_GRADES:
            newState = { ...state };
            newState.behaviorGrades = [];
            newState.currentBehaviorGrade = null;
            return newState;
        default:
            return state;
    }
};

export default behaviorGradesReducer;
