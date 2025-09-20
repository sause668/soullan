import { csrfFetch } from "./csrf";

const SET_CLASS = 'class/setClass';
const REMOVE_CLASS = 'class/removeClass';
const SET_CLASSES = 'class/setClasses';
const REMOVE_CLASSES = 'class/removeClasses';
// const ADD_ASSIGNMENT = 'class/addAssignment';

const setClass = (class_) => ({
    type: SET_CLASS,
    class_
  });
  
  const removeClass = () => ({
    type: REMOVE_CLASS
  });
  
  const setClasses = (classes) => ({
    type: SET_CLASSES,
    classes
  });
  
  const removeClasses = () => ({
    type: REMOVE_CLASSES
  });

    
// Classes
export const fetchClasses = () => async (dispatch) => {
	const response = await csrfFetch(`/api/classes`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClasses(data));
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

export const fetchTeacherClasses = (params) => async (dispatch) => {
    const { teacherId } = params;
	const response = await csrfFetch(`/api/teachers/${teacherId}/classes`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClasses(data));
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

export const fetchStudentClasses = (params) => async (dispatch) => {
    const { studentId } = params;
	const response = await csrfFetch(`/api/students/${studentId}/classes`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClasses(data));
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

export const fetchClass = (params) => async (dispatch) => {
    const { classId } = params
	const response = await csrfFetch(`/api/classes/${classId}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data));
    } else {
        const errorObj = {}
        if (response.status < 500) {
            const errorMessages = await response.json();
            console.log(errorMessages)
            errorObj.errors = errorMessages
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" }
        }
        return errorObj
    }
};

export const fetchGradebookClass = (params) => async (dispatch) => {
    const { teacherId, classId } = params
	const response = await csrfFetch(`/api/teachers/${teacherId}/gradebook/${classId}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data));
    } else {
        const errorObj = {}
        if (response.status < 500) {
            const errorMessages = await response.json();
            console.log(errorMessages)
            errorObj.errors = errorMessages
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" }
        }
        return errorObj
    }
};

export const fetchGradesClass = (params) => async (dispatch) => {
    const { studentId, classId } = params
	const response = await csrfFetch(`/api/students/${studentId}/grades/${classId}`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data));
    } else {
        const errorObj = {}
        if (response.status < 500) {
            const errorMessages = await response.json();
            console.log(errorMessages)
            errorObj.errors = errorMessages
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" }
        }
        return errorObj
    }
};

export const createClass = (params) => async (dispatch) => {
	const response = await csrfFetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClasses(data));
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

export const editClass = (params) => async (dispatch) => {
    const { classId, name, subject, grade, period, room } = params;
	const response = await csrfFetch(`/api/classes/${classId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            subject,
            grade,
            period,
            room
        })
      });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClasses(data));
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

export const deleteClass = (params) => async (dispatch) => {
    const { classId } = params;
	const response = await csrfFetch(`/api/classes/${classId}`, {
        method: "DELETE"
      });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClasses(data));
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

export const removeClassesState = () => async (dispatch) => {
    dispatch(removeClasses());
};

export const removeClassState = () => async (dispatch) => {
    dispatch(removeClass());
};


//Students
export const addStudent = (params) => async (dispatch) => {
    const { classId, studentId } = params;
	const response = await csrfFetch(`/api/classes/${classId}/students/${studentId}`, {method: "POST"});
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data));
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

export const removeStudent = (params) => async (dispatch) => {
    const { classId, studentId } = params;
	const response = await csrfFetch(`/api/classes/${classId}/students/${studentId}`, {method: "DELETE"});
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data))
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


// Assignments
export const createAssignment = (params) => async (dispatch) => {
    const { classId, name, type, quarter, dueDate } = params;
	const response = await csrfFetch(`/api/classes/${classId}/assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name, 
            type,
            quarter,
            due_date: dueDate
        })
      });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data))
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

export const editAssignment = (params) => async (dispatch) => {
    const { assignmentId, name, type, quarter, dueDate } = params;
	const response = await csrfFetch(`/api/assignments/${assignmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name, 
            type,
            quarter,
            due_date: dueDate
        })
      });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data))
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

export const deleteAssignment = (params) => async (dispatch) => {
    const { assignmentId } = params;
	const response = await csrfFetch(`/api/assignments/${assignmentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data))
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


// Grades
export const createGrade = (params) => async (dispatch) => {
    const { assignmentId, studentId, grade } = params;
	const response = await csrfFetch(`/api/assignments/${assignmentId}/grades/${studentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            grade
        })
      });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data))
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

export const editGrade = (params) => async (dispatch) => {
    const { assignmentId, studentId, grade } = params;
	const response = await csrfFetch(`/api/assignments/${assignmentId}/grades/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            grade
        })
      });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data))
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

export const deleteGrade = (params) => async (dispatch) => {
    const { assignmentId, studentId } = params;
	const response = await csrfFetch(`/api/assignments/${assignmentId}/grades/${studentId}`, {
        method: "DELETE"
      });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setClass(data))
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
    class: null,
    classes: null, 
};

function classReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CLASS:
            return { ...state, class: action.class_ };
        case REMOVE_CLASS:
            return { ...state, class: null };
        case SET_CLASSES:
            return { ...state, classes: action.classes };
        case REMOVE_CLASSES:
            return { ...state, classes: null };
        default:
            return state;
    }
}

export default classReducer;