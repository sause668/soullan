import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import classReducer from "./class";
import studentReducer from "./student";
import teacherReducer from "./teacher";
import adminReducer from "./admin";
import behaviorGradesReducer from "./behaviorGrades";

const rootReducer = combineReducers({
  session: sessionReducer,
  class: classReducer,
  student: studentReducer,
  teacher: teacherReducer,
  admin: adminReducer,
  behaviorGrades: behaviorGradesReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
