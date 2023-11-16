import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: (inboundState, originalState) => {
        // Ensure isModalOpen is always set to false on rehydration
        if (inboundState) {
            return { ...originalState, modalToggleReducer: { isModalOpen: false } };
        }
        return originalState;
    },
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk];

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
