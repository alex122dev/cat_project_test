import { favouritesAPI, FavouritesType, SaveFavouritesType } from "../../api/favouritesAPI"
import { BaseThunkType, DispatchThunkType, InferActionsTypes } from "../store"
import { actions as logActions, UserActionsType } from './userActionsLog-reducer'

const initialState = {
    favourites: [] as FavouritesType[],
    isFetching: false,
    inToFromFavouritesProccess: [] as Array<number | string>
}

type InitialStateType = typeof initialState

export const favouritesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "FAVOURITES-RD/SET-FAVOURITES":
            return {
                ...state,
                favourites: action.arr
            }
        case "FAVOURITES-RD/SET-IS-FETCHING":
            return {
                ...state,
                isFetching: action.value
            }
        case 'FAVOURITES-RD/SET-IN-TO-FROM-FAVOURITES-PROCCESS':
            return {
                ...state,
                inToFromFavouritesProccess: action.isFetching
                    ? [...state.inToFromFavouritesProccess, action.id]
                    : state.inToFromFavouritesProccess.filter(id => id !== action.id)
            }
        case 'FAVOURITES-RD/DELETE-ONE-ITEM':
            return {
                ...state,
                favourites: state.favourites.filter(item => item.id !== action.id)
            }
        default:
            return state
    }
}

export const actions = {
    setFavourites: (arr: FavouritesType[]) => ({ type: 'FAVOURITES-RD/SET-FAVOURITES', arr } as const),
    setIsFetching: (value: boolean) => ({ type: 'FAVOURITES-RD/SET-IS-FETCHING', value } as const),
    setinToFromFavouritesProccess: (isFetching: boolean, id: number | string) => ({ type: 'FAVOURITES-RD/SET-IN-TO-FROM-FAVOURITES-PROCCESS', isFetching, id } as const),
    deleteOneItem: (id: number | string) => ({ type: 'FAVOURITES-RD/DELETE-ONE-ITEM', id } as const)
}

type ActionsType = InferActionsTypes<typeof actions>


export const getFavourites = (): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsFetching(true))
        const data = await favouritesAPI.getFavourites()
        console.log('favourites', data);
        dispatch(actions.setFavourites(data))
        dispatch(actions.setIsFetching(false))
    } catch (error) {

    }
}

export const saveToFavourites = (payload: SaveFavouritesType, url: string) => async (dispatch: DispatchThunkType) => {
    try {
        dispatch(actions.setinToFromFavouritesProccess(true, payload.image_id))
        const data = await favouritesAPI.saveToFavourites(payload)
        dispatch(actions.setinToFromFavouritesProccess(false, payload.image_id))
        console.log('save favourites', data);
        if (data.message === 'SUCCESS') {
            const act: UserActionsType = {
                action: "added",
                date: new Date(),
                image_id: payload.image_id,
                url: url,
                type: "Favourites",
                icon: '_icon-favourite'
            }

            dispatch(logActions.setAction(act))
            dispatch(getFavourites())
        }
    } catch (error) {

    }
}

export const deleteFromFavourites = (id: string | number, image_id: string, url: string) => async (dispatch: DispatchThunkType) => {
    try {
        dispatch(actions.setinToFromFavouritesProccess(true, id))
        const data = await favouritesAPI.deleteFromFavourites(id)
        console.log('delete favourites', data);
        if (data.message === 'SUCCESS') {
            const act: UserActionsType = {
                action: "removed",
                date: new Date(),
                image_id: image_id,
                url: url,
                type: "Favourites",
                icon: '_icon-favourite'
            }

            dispatch(logActions.setAction(act))
            dispatch(actions.deleteOneItem(id))
            //dispatch(getFavourites())
        }
        dispatch(actions.setinToFromFavouritesProccess(false, id))
    } catch (error) {

    }
}

type ThunkType = BaseThunkType<ActionsType>