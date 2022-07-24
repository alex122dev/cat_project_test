import { imagesAPI } from "../../api/imagesAPI"
import { BaseThunkType, DispatchThunkType, InferActionsTypes } from "../store"
import { getAllVotes } from './voting-reducer'

export type ImageType = {
    breeds: any[]
    height: number
    width: number
    id: string
    url: string
}

const initialState = {
    image: null as null | ImageType,
    isFetching: false,
    //likes: 
}

type InitialStateType = typeof initialState

export const imageReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'IMAGE-RD/SET-IMAGES':
            return {
                ...state,
                image: action.image
            }
        case "IMAGE-RD/SET-IS-FETCHING":
            return {
                ...state,
                isFetching: action.value
            }
        default:
            return state
    }
}

export const actions = {
    setImages: (image: ImageType) => ({ type: 'IMAGE-RD/SET-IMAGES', image } as const),
    setIsFetching: (value: boolean) => ({ type: 'IMAGE-RD/SET-IS-FETCHING', value } as const),
}

type ActionsType = InferActionsTypes<typeof actions>

export const getRandomImage = (): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsFetching(true))
        const data = await imagesAPI.getRandomImage()
        console.log('get new image', data[0]);
        dispatch(actions.setImages(data[0]))
        dispatch(actions.setIsFetching(false))
    } catch (error) {

    }
}

export const getSpecificImage = (imageId: string): ThunkType => async (dispatch) => {
    try {
        const data = await imagesAPI.getImage(imageId)
        console.log('get Specific Image: ', data);

    } catch (error) {

    }
}


type ThunkType = BaseThunkType<ActionsType>