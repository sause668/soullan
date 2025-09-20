import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await csrfFetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
    if (data.landing) return;
		dispatch(setUser(data));
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

export const thunkLogin = (credentials) => async dispatch => {
  const response = await csrfFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
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

export const thunkSignupTeacher = (params) => async (dispatch) => {
  const { firstName, lastName, email, username, password, type, primaryGrade, primarySubject} = params
  const response = await csrfFetch("/api/auth/signup/teacher", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
      type,
      primary_grade: primaryGrade,
      primary_subject: primarySubject
    })
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
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

export const thunkSignupStudent = (params) => async (dispatch) => {
  const { firstName, lastName, email, username, password, type, grade} = params
  const response = await csrfFetch("/api/auth/signup/student", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
      type,
      grade
    })
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
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

export const thunkLogout = () => async (dispatch) => {
  await csrfFetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
