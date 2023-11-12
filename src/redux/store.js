import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

// Define your middleware(s)
const middleware = [thunk];

// Use the compose function to combine enhancers

// to use redux dev tools.
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(...middleware))
);
