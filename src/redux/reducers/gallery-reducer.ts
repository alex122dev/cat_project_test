import { imagesAPI, ImageType, MimeType, OrderType } from "../../api/imagesAPI";
import { BaseThunkType, InferActionsTypes } from "../store";


export type FilterType = {
    type: MimeType
    order: OrderType
    limit: number
    breed: string
}

const initialState = {
    images: [] as ImageType[],
    isFetching: false,
    currentPage: 1,
    filter: {
        type: 'gif,jpg,png' as MimeType,
        order: 'RANDOM' as OrderType,
        limit: 5,
        breed: '',
    }
}

type InitialStateType = typeof initialState

export const galleryReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "GALLERY-RD/SET-IMAGES":
            return {
                ...state,
                images: action.images
            }
        case "GALLERY-RD/SET-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "GALLERY-RD/SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'GALLERY-RD/SET-FILTER':
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state
    }
}

export const actions = {
    setImages: (images: ImageType[]) => ({ type: 'GALLERY-RD/SET-IMAGES', images } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'GALLERY-RD/SET-IS-FETCHING', isFetching } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'GALLERY-RD/SET-CURRENT-PAGE', currentPage } as const),
    setFilter: (filter: FilterType) => ({ type: 'GALLERY-RD/SET-FILTER', filter } as const),
}

type ActionsType = InferActionsTypes<typeof actions>

export const getImagesForGallery = (currentPage: number, filter: FilterType): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsFetching(true))
        const images = await imagesAPI.getImages({
            mime_types: filter.type,
            order: filter.order,
            limit: filter.limit,
            breed_id: filter.breed,
            page: currentPage
        })
        console.log(images);
        dispatch(actions.setImages(images))
        dispatch(actions.setFilter(filter))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setIsFetching(false))
    } catch (error) {

    }
}

type ThunkType = BaseThunkType<ActionsType>