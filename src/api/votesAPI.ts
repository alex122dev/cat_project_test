import { instance } from "./api"

export type CreateVoteType = {
    image_id: string
    sub_id?: string
    value: 0 | 1
}

export type VoteType = {
    id: number
    value: number
    image_id: string
    sub_id: null | string
    created_at: Date
    country_code: string
}

export const votesAPI = {
    getAllVotes() {
        return instance.get<VoteType[]>('votes').then(res => res.data)
    },
    getSpecificVote(id: number) {
        return instance.get<VoteType>(`votes/${id}`).then(res => res.data)
    },
    createVote(data: CreateVoteType) {
        return instance.post('votes', data).then(res => res.data)
    },
    deleteVote(vote_id: number) {
        return instance.delete(`/votes/${vote_id}`).then(res => res.data)
    }
}