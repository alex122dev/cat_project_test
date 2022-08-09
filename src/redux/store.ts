import { Action, applyMiddleware, combineReducers, compose, createStore, Store } from "redux"
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk"
import { breedsReducer } from "./reducers/breeds-reducer";
import { favouritesReducer } from "./reducers/favourites-reducer";
import { galleryReducer } from "./reducers/gallery-reducer";
import { userActionsLogReducer } from "./reducers/userActionsLog-reducer";
import { votingReducer } from "./reducers/voting-reducer";

const rootReducer = combineReducers({
    voting: votingReducer,
    favouritesRD: favouritesReducer,
    userActionsRD: userActionsLogReducer,
    breedsRD: breedsReducer,
    galleryRD: galleryReducer
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));



//* for actions types searching
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type AppStateType = ReturnType<typeof store['getState']>
export type AppActionsType = ReturnType<typeof store['dispatch']>

//* generic for thunk type
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//* generic for dispatch type to dispatching thunk
export type DispatchThunkType = ThunkDispatch<AppStateType, unknown, AppActionsType>



export default store