import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import playersReducer from './reducers/players.reducer';

const initialState = {}

const middleware = [thunk];

const reducers = combineReducers({
    players: playersReducer
})

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;