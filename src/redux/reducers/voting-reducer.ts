import { CreateContextOptions } from "vm"
import { favouritesAPI, SaveFavouritesType } from "../../api/favouritesAPI"
import { imagesAPI } from "../../api/imagesAPI"
import { CreateVoteType, votesAPI, VoteType } from "../../api/votesAPI"
import { BaseThunkType, DispatchThunkType, InferActionsTypes } from "../store"
import { getRandomImage } from "./image-reducer"
import { actions as logActions, UserActionsType } from './userActionsLog-reducer'



const initialState = {
    votes: [] as VoteType[],
    isFetching: false
}

type InitialStateType = typeof initialState

export const votingReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'VOTING-RD/SET-VOTES':
            return {
                ...state,
                votes: action.votes.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
            }
        case "VOTING-RD/SET-IS-FETCHING":
            return {
                ...state,
                isFetching: action.value
            }
        default:
            return state
    }
}

export const actions = {
    setVotes: (votes: VoteType[]) => ({ type: 'VOTING-RD/SET-VOTES', votes } as const),
    setIsFetching: (value: boolean) => ({ type: 'VOTING-RD/SET-IS-FETCHING', value } as const),
}

type ActionsType = InferActionsTypes<typeof actions>


export const getAllVotes = (): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsFetching(true))
        const data = await votesAPI.getAllVotes()
        console.log('get all votes', data);
        dispatch(actions.setIsFetching(false))
        dispatch(actions.setVotes(data))
    } catch (error) {

    }
}

export const getSpecificVote = (id: number): ThunkType => async (dispatch) => {
    try {
        const data = await votesAPI.getSpecificVote(id)
        console.log('get specific vote', data);
    } catch (error) {

    }
}

export const createVote = (payload: CreateVoteType, url: string) => async (dispatch: DispatchThunkType) => {
    try {
        dispatch(actions.setIsFetching(true))
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

        dispatch(actions.setIsFetching(false))
        dispatch(getRandomImage())
    } catch (error) {

    }
}

export const deleteVote = (voteId: number): ThunkType => async (dispatch) => {
    try {
        const data = await votesAPI.deleteVote(voteId)
        console.log(data);

    } catch (error) {

    }
}



type ThunkType = BaseThunkType<ActionsType>