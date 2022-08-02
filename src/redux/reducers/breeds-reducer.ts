import { breedsAPI, BreedType, SearchNameBreedType } from "../../api/breedsAPI"
import { imagesAPI } from "../../api/imagesAPI"
import { BaseThunkType, InferActionsTypes } from "../store"
import { ImageType } from "./image-reducer"


const initialState = {
    breeds: [] as BreedType[],
    breedsSliderImages: [] as ImageType[],
    searchBreedText: '',
    searchBreedArr: [] as SearchNameBreedType[],
    selectedBreed: null as null | BreedType,
    isFetching: false
}

type InitialStateType = typeof initialState

export const breedsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'BREEDS-RD/SET-ALL-BREEDS':
            return {
                ...state,
                breeds: action.breeds
            }
        case 'BREEDS-RD/SET-BREEDS-SLIDER':
            return {
                ...state,
                breedsSliderImages: action.breeds
            }
        case 'BREEDS-RD/SET-IS-FETCHING':
            return {
                ...state,
                isFetching: action.value
            }
        case 'BREEDS-RD/SET-SEARCH-BREED':
            return {
                ...state,
                searchBreedText: action.searchBreed
            }
        default:
            return state
    }
}

export const actions = {
    setAllbreeds: (breeds: BreedType[]) => ({ type: 'BREEDS-RD/SET-ALL-BREEDS', breeds } as const),
    setBreedsSlider: (breeds: ImageType[]) => ({ type: 'BREEDS-RD/SET-BREEDS-SLIDER', breeds } as const),
    setIsFetching: (value: boolean) => ({ type: 'BREEDS-RD/SET-IS-FETCHING', value } as const),
    setSearchBreedText: (searchBreed: string) => ({ type: 'BREEDS-RD/SET-SEARCH-BREED', searchBreed } as const),
    setSearchBreedArr: (breeds: SearchNameBreedType[]) => ({ type: 'BREEDS-RD/SET-SEARCH-BREED-ARR', breeds } as const),
}

type ActionsType = InferActionsTypes<typeof actions>

export const getAllBreeds = (): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsFetching(true))
        const breeds = await breedsAPI.getAllBreeds()
        console.log('getAllBreeds: ', breeds);

        dispatch(actions.setAllbreeds(breeds))
        dispatch(actions.setIsFetching(false))
    } catch (error) {

    }
}


export const getImageForBreedsSlider = (breed_id: string, limit = 5): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsFetching(true))
        const data = await imagesAPI.getRandomImage(limit, breed_id)
        console.log('getImageForBreedsSlider: ', data);
        dispatch(actions.setBreedsSlider(data))
        dispatch(actions.setIsFetching(false))
    } catch (error) {

    }
}

export const getBreedsByName = (breedName: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsFetching(true))
        const data = await breedsAPI.getBreedsByName(breedName)
        console.log('getBreedsByName: ', data);
        dispatch(actions.setSearchBreedArr(data))
        dispatch(actions.setIsFetching(false))
    } catch (error) {

    }
}

type ThunkType = BaseThunkType<ActionsType>