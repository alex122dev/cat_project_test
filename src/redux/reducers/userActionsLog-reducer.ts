import { InferActionsTypes } from "../store"

export type UserActionsType = {
    date: Date,
    image_id: string,
    url: string
    type: 'Favourites' | 'Likes' | 'Dislikes',
    action: 'added' | 'removed',
    icon: string
}

const initialState = {
    userActions: [] as UserActionsType[]
}

type InitialStateType = typeof initialState

export const userActionsLogReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'USER-ACTIONS-LOG-RD/SET-ACTION':
            return {
                ...state,
                userActions: [action.act, ...state.userActions] //.sort((a, b) => +new Date(b.date) - +new Date(a.date))
            }
        default:
            return state
    }
}

export const actions = {
    setAction: (act: UserActionsType) => ({ type: 'USER-ACTIONS-LOG-RD/SET-ACTION', act } as const)
}

type ActionsType = InferActionsTypes<typeof actions>