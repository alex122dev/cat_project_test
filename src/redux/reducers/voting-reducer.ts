import { imagesAPI, ImageType } from "../../api/imagesAPI"
import { CreateVoteType, votesAPI, VoteType } from "../../api/votesAPI"
import { BaseThunkType, DispatchThunkType, InferActionsTypes } from "../store"
//import { getRandomImage } from "./image-reducer"
import { actions as logActions, UserActionsType } from './userActionsLog-reducer'



const initialState = {
    isFetchingImage: false,
    image: null as null | ImageType,
    isFetchingVotes: false,
    votes: [] as VoteType[],
}

type InitialStateType = typeof initialState

export const votingReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "VOTING-RD/SET-IS-FETCHING-IMAGE":
            return {
                ...state,
                isFetchingImage: action.value
            }
        case 'VOTING-RD/SET-IMAGE':
            return {
                ...state,
                image: action.image
            }
        case 'VOTING-RD/SET-IS-FETCHING-VOTES':
            return {
                ...state,
                isFetchingVotes: action.value
            }
        case 'VOTING-RD/SET-VOTES':
            return {
                ...state,
                votes: action.votes.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
            }
        default:
            return state
    }
}

export const actions = {
    setIsFetchingImage: (value: boolean) => ({ type: 'VOTING-RD/SET-IS-FETCHING-IMAGE', value } as const),
    setImage: (image: ImageType | null) => ({ type: 'VOTING-RD/SET-IMAGE', image } as const),
    setIsFetchingVotes: (value: boolean) => ({ type: 'VOTING-RD/SET-IS-FETCHING-VOTES', value } as const),
    setVotes: (votes: VoteType[]) => ({ type: 'VOTING-RD/SET-VOTES', votes } as const),
}

type ActionsType = InferActionsTypes<typeof actions>


export const getRandomImage = (): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setImage(null))
        dispatch(actions.setIsFetchingImage(true))
        const image = await imagesAPI.getImages({})
        console.log('getRandomImage: ', image);
        dispatch(actions.setImage(image[0]))
        dispatch(actions.setIsFetchingImage(false))
    } catch (error) {

    }
}

export const createVote = (payload: CreateVoteType, url: string) => async (dispatch: DispatchThunkType) => {
    try {
        dispatch(actions.setIsFetchingImage(true))
        const data = await votesAPI.createVote(payload)
        console.log('create new vote', data);

        const act: UserActionsType = {
            action: "added",
            date: new Date(),
            image_id: payload.image_id,
            url: url,
            type: payload.value ? 'Likes' : 'Dislikes',
            icon: payload.value ? '_icon-like' : '_icon-dislike'
        }

        dispatch(logActions.setAction(act))

        dispatch(actions.setIsFetchingImage(false))
        dispatch(getRandomImage())
    } catch (error) {

    }
}

export const getAllVotes = (): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsFetchingVotes(true))
        const votes = await votesAPI.getAllVotes()
        console.log('getAllVotes: ', votes);
        dispatch(actions.setVotes(votes))
        dispatch(actions.setIsFetchingVotes(false))
    } catch (error) {
        dispatch(actions.setIsFetchingVotes(false))
    }
}


type ThunkType = BaseThunkType<ActionsType>