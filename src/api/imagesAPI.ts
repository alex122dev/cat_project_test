import { instance } from "./api"




export const imagesAPI = {
    getRandomImage(limit = 1, breed_id = '', page = 0, order: OrderType = 'RANDOM', type = '') {
        return instance.get(`images/search?limit=${limit}&breed_id=${breed_id}&page=${page}&order=${order}&mime_types=${type}`).then(res => res.data)
    },
    getImage(image_id: string) {
        return instance.get(`images/${image_id}`).then(res => res.data)
    }
}

export type SizeType = 'full' | 'med' | 'small' | 'thumb'
export type mimeType = 'gif,jpg,png' | 'jpg,png' | 'gif,png' | 'gif,jpg' | 'gif' | 'jpg' | 'png'
export type OrderType = 'RANDOM' | 'ASC' | 'DESC'

type ImageRequestType = {
    size?: SizeType
    mime_types?: mimeType
    order?: OrderType
    limit?: number
    page?: number
    breed_id?: string
}